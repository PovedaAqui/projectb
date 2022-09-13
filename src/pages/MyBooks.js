import React from 'react';
import { useAccount } from 'wagmi';
import { useQuery } from '@tanstack/react-query';
import Card from '../components/Card';
import { Link } from 'react-router-dom';

const MyBooks = () => {

    const { address, isConnected } = useAccount();
    const chain = process.env.REACT_APP_CHAIN;
    const nftContract = process.env.REACT_APP_NFTCONTRACT;

    const fetchNFT = async () => {
        const res = await fetch(`https://api.nftport.xyz/v0/accounts/${address}?chain=${chain}&include=metadata&contract_address=${nftContract}`, {
            "method": "GET",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": process.env.REACT_APP_NFT_PORT
                }
            }
        )
        return res.json();
    };
    
    const { isLoading, data } = useQuery(['nfts'], fetchNFT, { enabled: isConnected });

    return (
        <div className='grid grid-cols-1 gap-3 mt-1 lg:grid-cols-3'>
            {isConnected && isLoading? <h1>Loading your books...</h1> : data?.nfts.map((nft, id)=>{
                return (
                    <div key={id}>
                        <Card name={nft.metadata.name} description={nft.metadata.description} image={nft.metadata.image} external_url={nft.metadata.external_url} />
                    </div>
                )
            })}
            {!isConnected && <div className='m-auto justify-center item-center leading-none text-lg font-extrabold text-gray-900 md:text-3xl md:ml-2 md:absolute md:mt-2 lg:text-4xl'>Some of the most impressive artworks are waiting for you in the <Link to='/store' className='underline text-blue-600 hover:text-blue-800 visited:text-purple-600'>Store</Link></div>}
        </div>
    )
};

export default MyBooks;