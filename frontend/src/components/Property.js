import { useEffect, useState } from 'react';
import close from './close.png';

function Property({ provider, contract, account, property, togglePop }) {

  return (
    <div className="home">
      <div className='home__details'>
        <div className="home__image">
          <img src={property.image} alt="Home" />
        </div>
        <div className="home__overview">
          <h1>{property.ownerName}</h1>
          <p>
            <strong>{property.landLocation}</strong> 📍
            <strong>{property.propertyValue}</strong> 💰
            <strong>{property.surveyNumber}</strong> 🔢
          </p>
        </div>
        <button onClick={togglePop} className="home__close">
          <img src={close} alt="Close" />
        </button>
      </div>
    </div>
      
  )
}

export default Property;