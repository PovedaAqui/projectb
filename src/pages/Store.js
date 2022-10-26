import React from 'react';
import { useContract, useMarketplace, useActiveListings, useOwnedNFTs, useNFTBalance, useNFTs, useUnclaimedNFTSupply, useUnclaimedNFTs } from '@thirdweb-dev/react';
import { useAccount } from 'wagmi';
import Card2 from '../components/Card2';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useDataFeed from '../utils/DataFeed';
import { useState, useEffect } from 'react';
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

const queryClient = new QueryClient();

const Store = () => {

    const { address } = useAccount();
    const { contract } = useContract(process.env.REACT_APP_DROP_CONTRACT);
    const { data: nfts, isLoading, error } = useNFTs(contract, { start: 0, count: 100 });
    console.log(nfts)
  
    // const { data, isError, isFetching } = useDataFeed();
    // const tokenPrice = !isFetching? && (parseInt(data?.answer)*10**-8).toFixed(2);

  return (
    <div className='grid grid-cols-1 gap-3 mt-1 lg:grid-cols-3'>
        {isLoading? <h1>Loading...</h1> : nfts?.map((nfts, id) => {
            return (
                <div key={id}>
                {/* price={nfts.buyoutCurrencyValuePerToken.displayValue} listingId={nfts.id} tokenPrice={tokenPrice} */}
                    <Card2 name={nfts.metadata.name} description={nfts.metadata.description} image={nfts.metadata.image} listingId={nfts.id}/>
                </div>
            )
        })}
    </div>
  )

}

const hof = (WrappedComponent) => {
    // Its job is to return a react component warpping the baby component
    return (props) => (
        <QueryClientProvider client={queryClient}>
            <WrappedComponent {...props} />
        </QueryClientProvider>
    );
};

export default hof(Store);