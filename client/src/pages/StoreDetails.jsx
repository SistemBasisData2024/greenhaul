import React from 'react';
import { useParams } from 'react-router-dom';

const StoreDetails = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Store Details Page</h1>
      <p>Product ID: {id}</p>
      {/* Add your product details content here */}
    </div>
  );
};

export default StoreDetails;
