import React from 'react';
import { useAccount } from 'wagmi';
import { useQuery } from '@tanstack/react-query';
import Card from '../components/Card';

const MyBooks = () => {

    const { address } = useAccount();
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
    
    const { isLoading, isError, data, error } = useQuery(['nfts'], fetchNFT, { enabled: address!==undefined });
    console.log(data);
    

    return (
        <div className='grid grid-cols-3 gap-3 mt-1'>
            {data.nfts.map((nft)=>{
                return (
                    <div>
                        <Card name={nft.metadata.name} description={nft.metadata.description} image={nft.metadata.image} />
                    </div>
                )
            })}
        </div>
    )
};

export default MyBooks;