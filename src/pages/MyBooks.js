import React from 'react';
import { useAccount } from 'wagmi';
import { useQueries, useQuery } from '@tanstack/react-query';
import Card from '../components/Card';
import { type } from '@testing-library/user-event/dist/type';

const MyBooks = () => {

    const { address, isConnected } = useAccount();
    const chain = process.env.REACT_APP_CHAIN;
    const nftContract = process.env.REACT_APP_NFTCONTRACT;

    const fetchBalance = async () => {
        const res = await fetch(`https://api-eu1.tatum.io/v3/multitoken/address/balance/${chain}/${address}`, {
            "method": "GET",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": process.env.REACT_APP_TATUM
                }
            }
        )
        return res.json();
    };

    //First call
    const { data: balance } = useQuery(['nfts'], fetchBalance);

    const balances = balance?.find(element => element?.contractAddress === "0xf66f067a0a9a525e5a8b8e7a732857653e6994f5")?.balances
    const tokenIds = balances?.map(element => element?.tokenId)
   
    const fetchMetadata = async (ids) => {
        const res = await fetch(`https://api-eu1.tatum.io/v3/multitoken/metadata/${chain}/${nftContract}/${ids}`, {
            "method": "GET",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": process.env.REACT_APP_TATUM
                }
            }
        )
        return res.json();
    };
    
    //Second call
    const { data: metadata } = useQueries({
        queries: balances?.map(ids => {
            return {
                queryKey: ['ipfs', ids],
                queryFn: () => fetchMetadata(ids),
                enabled: !!tokenIds,
            }
        }),
    })

    // console.log(metadata)

    // return (
    //     <div className='grid grid-cols-1 gap-y-3 gap-x-0 mt-1 lg:grid-cols-4'>
    //         {isConnected && isLoading? <h1>Loading your books...</h1> : data?.nfts.map((nft, id)=>{
    //             return (
    //                 <div key={id}>
    //                     <Card name={nft?.metadata?.name} description={nft?.metadata?.description} image={nft?.metadata?.image} external_url={nft?.metadata?.external_url} tokenId={nft?.token_id} />
    //                 </div>
    //             )
    //         })}
    //         {!isConnected && <div className='flex m-auto justify-center item-center leading-none text-lg font-extrabold text-gray-900 md:text-3xl md:ml-2 md:absolute md:mt-2 lg:text-4xl'>It's very quiet round here...</div>}
    //     </div>
    // )
};

export default MyBooks;