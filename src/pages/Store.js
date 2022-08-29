import React from 'react'
import { useMarketplace, useActiveListings } from '@thirdweb-dev/react';
import Card2 from '../components/Card2';

const Store = () => {
    
    const marketplace = useMarketplace(process.env.REACT_APP_MARKETPLACE_CONTRACT)
    const { data: listings, isLoading, error } = useActiveListings(marketplace, { start: 0, count: 100 });

  return (
    <div className='grid grid-cols-1 gap-3 mt-1 lg:grid-cols-3'>
        {isLoading? <h1>Loading...</h1> : listings?.map((nfts, id) => {
            return (
                <div key={id}>
                    <Card2 name={nfts.asset.name} description={nfts.asset.description} image={nfts.asset.image} price={nfts.buyoutCurrencyValuePerToken.displayValue} />
                </div>
            )
        })}
    </div>
  )
}

export default Store;