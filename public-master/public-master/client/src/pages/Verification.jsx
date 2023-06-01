import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

import { useStateContext } from '../context';
import { money } from '../assets';
import { CustomButton, FormField, Loader } from '../components';
import { AdharNumberCheack} from '../utils';

const Verification = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { adharVerification,validate } = useStateContext();
  const [form, setForm] = useState({
    num: '',
    
  });
  
  

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form.num);
    let bool;
    bool =AdharNumberCheack(form.num);
    if(bool == true)
    {
   await adharVerification(form.num);
    }else{
      alert("Enter valid Adhar number");
    }
    
   
  }
 /* const btn = async () => {
   
    
    const data = await validate();
   
   
    if(data == true)
    {
      alert("valid candidate");
    }else if(data == false)
    {
      alert("invalid candidate");
      
    }
    
    
  }*/


  


  

  return (
    <div className="bg-[white] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4 shadow-lg">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#8f0183] rounded-[10px] shadow-md shadow-md drop-shadow-2xl">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Adhaar Verification</h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
        <div className="flex flex-wrap gap-[40px]">
          <FormField 
            labelName=" Enter your 12-digit Aadhaar number in the field below:"
            placeholder="Adhaar number should be 12 digits"
            inputType="number"
            value={form.num}
            handleChange={(e) => handleFormFieldChange('num', e)}
          />
          

          <div className="flex justify-center items-center mt-[40px] hover:-translate-y-2">
            <CustomButton 
              btnType="submit"
              title="Verify"
              styles="bg-[#8f0183]"
              
            />
          </div>
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
             "Your Aadhaar number is essential for accessing our services. Please ensure you remember or save it."
          </p>
          
          </div>
      </form>
    
    </div>
  )
}



export default Verification