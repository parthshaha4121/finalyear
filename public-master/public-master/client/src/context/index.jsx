import React, { useContext, createContext } from 'react';

import { useAddress, useContract, useMetamask, useContractWrite, useContractRead } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { EditionMetadataWithOwnerOutputSchema } from '@thirdweb-dev/sdk';

import { daysLeft } from '../utils';  



const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract('0x37F0113670f129BbbEc56741022d2BC59dBB65bB'); 
  const { mutateAsync: createCampaign} = useContractWrite(contract, 'createCampaign');
  const { mutateAsync: AdharVerification } = useContractWrite(contract, 'AdharVerification');
  //const { mutateAsync: getAdhar } = useContractWrite(contract, 'getAdhar');
 // const {  data: getValidation } = useContractRead(contract, ' getValidation');


  const address = useAddress();
  const connect = useMetamask();
  



  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign([
        address, // owner
        form.title, // title
        form.description,
        form.adharNum, // description
        form.target,
        new Date(form.deadline).getTime(), // deadline,
        form.image
      ])

      console.log("contract call success", data)
    } catch (error) {
      if (error.message.includes("do kyc verification first")) {
        // Handle the specific error
        alert("do kyc verification first");
      }else if(error.message.includes("The deadline should be a date in the future."))
      {
        alert("The deadline should be a date in the future.");

      }
      else{
      alert("plz try after some time :(")
      console.log("contract call failure", error)
      }
    }
  }



   const adharVerification = async (num) => {
    try {
   
      
      const data =await contract.call("AdharVerification", num);
      alert("KYC Verification done");
      console.log("contract call success", data)
    } catch (error) {
      if (error.message.includes("You have already completed the KYC verification")) {
        // Handle the specific error
        alert("You have already completed the KYC verification");
      }else{
      alert("plz try after some time :(")
      console.log("contract call failure", error)
      }
    }
  }


  const getCampaigns = async () => {
    const campaigns = await contract.call('getCampaigns');

    const parsedCampaings = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
      image: campaign.image,
      pId: i
    }));

    return parsedCampaings;
  }

  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();

    const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);

    return filteredCampaigns;
  }


  const getTerminatedCampaigns = async () => {    
    const allCampaigns = await getCampaigns();

   const filteredCampaigns = allCampaigns.filter((campaign) => 
     daysLeft(campaign.deadline) === "Terminated" 
    );

  

    return filteredCampaigns;
  }

 

  const getActiveCampaigns = async () => {    
    const allCampaigns = await getCampaigns();

    const filteredCampaigns = allCampaigns.filter((campaign) => 
      daysLeft(campaign.deadline) != "Terminated"
    
    );

    return filteredCampaigns;
  }

  const donate = async (pId, amount,remainingDays) => {
   
    if(remainingDays == "Terminated")
    {
      alert("The campaign has been terminated");
    }
    else{
        try{
    const data = await contract.call('donateToCampaign', pId, { value: ethers.utils.parseEther(amount)});
    console.log("contract call success", data)
    return data;
    }catch(error)
    {
      if (error.message.includes("Taget achieved")) {
        // Handle the specific error
        alert("Taget achieved");
      }else if(error.message.includes("plz check the target value"))
      {
        alert("plz check the target value");

      }
      else{
      alert("plz try after some time :(")
      console.log("contract call failure", error)
      }

    }
  }
    

    
  }

  const getDonations = async (pId) => {
    const donations = await contract.call('getDonators', pId);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for(let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString())
      })
    }

    return parsedDonations;
  }


  return (
    <StateContext.Provider
      value={{ 
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
        getTerminatedCampaigns,  
        getActiveCampaigns,
        adharVerification
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);