import React, { useState, useEffect } from 'react'

import { DisplayCampaigns } from '../components';
import { useStateContext } from '../context'
//import {Status } from '../components/Status';

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getUserCampaigns } = useStateContext();
  
 
  

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getUserCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  }

  

  useEffect(() => {
    if(contract) fetchCampaigns();
    
  }, [address, contract]);

  return (
    <>
    
    <div className="bg-[white] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4 shadow-lg">
    <p className="font-epilogue justify-left font-semibold text-[14px] leading-[30px] text-[#818183]">
           "Welcome :    {address}"
          </p>
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#8f0183] rounded-[10px] shadow-md shadow-md drop-shadow-2xl">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Profile</h1>
      </div>
      </div>

        
    <DisplayCampaigns 
      title="My Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />

</>
 
   


  )
}

export default Profile

// <button onClick={() => btn()}>Click me</button>