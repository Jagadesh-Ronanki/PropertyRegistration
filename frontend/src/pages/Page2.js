import React, { useEffect, useState } from 'react';
import Property from '../components/Property.js';
import config from '../config.json';

function PropertyDetails({ provider, contract, account }) {
  const [properties, setProperties] = useState([]);
  const [property, setProperty] = useState(null);
  const [toggle, setToggle] = useState(false);

  const loadBlockChainData = async () => {
    const properties = []

    const totalSupply = await contract.totalSupply()
    for (var id=1; id<=totalSupply; id++) {
      const [ownerName, ownerWalletAddress, landLocation, propertyValue, surveyNumber, image] = await contract.getPropertyDetails(id)
      properties.push({ ownerName, ownerWalletAddress, landLocation, propertyValue: propertyValue.toString(), surveyNumber: surveyNumber.toString(), image })
    }

    setProperties(properties)
  }

  useEffect(() => {
    loadBlockChainData()
  }, [])


  const togglePop = (home) => {
    setProperty(home)
    toggle ? setToggle(false) : setToggle(true);
  }


  return (
    <div>
      <h2 className="text-3xl font-bold mb-10 mt-10 text-[#E5E5E5]">Property Details</h2>
      <div className="border rounded-lg shadow-md mb-4">
        <table className="w-full table-auto">
          <thead>
            <tr className="p-3 bg-[#132d51] text-white">
              <th className="font-semibold">Owner Name</th>
              <th className="font-semibold">Owner Wallet Address</th>
              <th className="font-semibold">Land Location</th>
              <th className="font-semibold">Property Value</th>
              <th className="font-semibold">Survey Number</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property, index) => (
              <tr key={index} onClick={() => togglePop(property)} className="cursor-pointer hover:bg-[#F44E69] hover:text-white transition-colors">
                <th className="font-semibold py-2 text-secondary">{property.ownerName}</th>
                <td>{`${property.ownerWalletAddress.slice(0, 6)}...${property.ownerWalletAddress.slice(38, 42)}`}</td>
                <td>{property.landLocation}</td>
                <td>{property.propertyValue}</td>
                <td>{property.surveyNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {toggle && (
        <Property provider={provider} contract={contract} account={account} property={property} togglePop={togglePop} />
      )}
    </div>
  )
}

export default PropertyDetails;