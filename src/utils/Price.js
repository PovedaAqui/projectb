import React from 'react';
import { useClaimConditions, useContract } from '@thirdweb-dev/react';

//Custom hook to get MATIC/USD price from Chainlink

const usePrice = (id) => {
  const { contract } = useContract(process.env.REACT_APP_DROP_CONTRACT);
  const { data } = useClaimConditions(contract, id);
  return data;
}

export default usePrice;