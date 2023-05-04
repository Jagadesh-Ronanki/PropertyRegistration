import React from 'react';
import { useState, useEffect } from 'react';

const Page1 = ({ provider, contract }) => {
  const [ownerName, setOwnerName] = useState("");
  const [ownerWalletAddress, setOwnerWalletAddress] = useState("");
  const [landLocation, setLandLocation] = useState("");
  const [propertyValue, setPropertyValue] = useState('');
  const [surveyNumber, setSurveyNumber] = useState('');
  const [image, setImage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const signer = provider.getSigner();
      
      const tx = await contract.connect(signer).registerProperty(
        ownerName,
        ownerWalletAddress,
        landLocation,
        propertyValue,
        surveyNumber,
        image
      );
      await tx.wait();
      alert("Property registered successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to register");
    }
  };

  return (
    <div className='flex flex-col justify-center items-center'>
      <h2 className="text-3xl font-bold mb-10 mt-10 text-[#E5E5E5]">PROJECT REGISTRATION</h2>
      <form className='flex flex-col justify-center items-center' onSubmit={handleSubmit}>
        <div className='grid grid-cols-2 mb-4 gap-10 items-start'>
          <label htmlFor="owner-name" className='text-[#E5E5E5] text-lg font-medium mb-2'>Owner Name</label>
          <input type="text" id="owner-name" value={ownerName} onChange={(event) => setOwnerName(event.target.value)} required className='border border-gray-400 py-2 px-4 rounded-lg bg-[#282f4a]'/>
        </div>
  
        <div className='grid grid-cols-2 mb-4 gap-10 items-start'>
          <label htmlFor="owner-wallet-address" className='text-[#E5E5E5] text-lg font-medium mb-2'>Owner Wallet Address</label>
          <input type="text" id="owner-wallet-address" value={ownerWalletAddress} onChange={(event) => setOwnerWalletAddress(event.target.value)} required className='border border-gray-400 py-2 px-4 rounded-lg bg-[#282f4a]'/>
        </div>
  
        <div className='grid grid-cols-2 mb-4 gap-10 items-start'>
          <label htmlFor="land-location" className='text-[#E5E5E5] text-lg font-medium mb-2'>Land Location</label>
          <input type="text" id="land-location" value={landLocation} onChange={(event) => setLandLocation(event.target.value)} required className='border border-gray-400 py-2 px-4 rounded-lg bg-[#282f4a]'/>
        </div>
  
        <div className='grid grid-cols-2 mb-4 gap-10 items-start'>
          <label htmlFor="property-value" className='text-[#E5E5E5] text-lg font-medium mb-2'>Property Value</label>
          <input type="number" id="property-value" value={propertyValue} onChange={(event) => setPropertyValue(event.target.value)} required className='border border-gray-400 py-2 px-4 rounded-lg bg-[#282f4a]'/>
        </div>
  
        <div className='grid grid-cols-2 mb-4 gap-10 items-start'>
          <label htmlFor="survey-number" className='text-[#E5E5E5] text-lg font-medium mb-2'>Survey Number</label>
          <input type="text" id="survey-number" value={surveyNumber} onChange={(event) => setSurveyNumber(event.target.value)} required className='border border-gray-400 py-2 px-4 rounded-lg bg-[#282f4a]'/>
        </div>
  
        <div className='flex flex-col mb-4'>
          <label htmlFor="image" className='text-[#E5E5E5] text-lg font-medium mb-2'>Image</label>
          <input type="text" id="image" onChange={(event) => setImage(event.target.value)} required className='border border-gray-400 py-2 px-4 w-[30rem] rounded-lg bg-[#282f4a]'/>
        </div>
  
        <button type="submit" className='bg-blue-500 text-white py-2 px-4 m-5 rounded-lg'>Register Property</button>
      </form>
    </div>
  );  
}

export default Page1;
