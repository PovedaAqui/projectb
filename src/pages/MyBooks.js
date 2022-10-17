import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useQueries, useQuery } from '@tanstack/react-query';
import Card from '../components/Card';
import { data } from 'autoprefixer';

const MyBooks = () => {

    const { address, isConnected } = useAccount();
    const [tokens, setTokens] = useState(null);
    const [totalBalance, setTotalBalance] = useState(null);
    const [ipfs, setIpfs] = useState(null);
    const chain = process.env.REACT_APP_CHAIN;
    const nftContract = process.env.REACT_APP_NFTCONTRACT;

    const fetchBalance = async () => {
        const res = await fetch(`https://justcors.com/tl_21b1f06/https://api-eu1.tatum.io/v3/multitoken/address/balance/${chain}/${address}`, {
            "method": "GET",
            "headers": {
                "Content-Type": "application/json",
                "x-api-key": process.env.REACT_APP_TATUM
                }
            }
        )
        .then(res => res.json())
        .then(res2 => res2.find(element => element?.contractAddress === "0xf66f067a0a9a525e5a8b8e7a732857653e6994f5"))
        .then(res3 => res3.balances.map(element => element?.tokenId))
        .then(res4 => setTotalBalance(res4))
    };

    //First call
    const { data: balance } = useQuery(['nfts'], fetchBalance);

    useEffect(() => {
        const fetchMetadata = async (ids) => {
            let params = [];
            let res = [];
            res = await fetch(`https://justcors.com/tl_21b1f06/https://api-eu1.tatum.io/v3/multitoken/metadata/${chain}/${nftContract}/${ids}`, {
            "method": "GET",
            "headers": {
                "Content-Type": "application/json",
                "x-api-key": process.env.REACT_APP_TATUM
                }
            }
        )
        .then(res => res.json())
        .then(data => params.push(data))
        .then(data2 => data2 === params.length && setTokens(params))
    };
        totalBalance!==null && totalBalance.map(ids => fetchMetadata(ids));
    }, [!!totalBalance]);
    
    useEffect(() => {
        const fetchIPFS = async (ids) => {
            let url = "";
            if (ids.data.includes("ipfs://")) {
                url = ids.data.replace("ipfs://", "https://nftstorage.link/ipfs/");
            }
            else if (ids.data.includes("ipfs//")) {
                url = ids.data.replace("ipfs//", "https://nftstorage.link/ipfs/");
            } else {
                url = ids;
            }
            let res = [];
            res = await fetch(`https://justcors.com/tl_21b1f06/${url}`, {
            "method": "GET",
            "headers": {
                "Content-Type": "application/json",
                }
            }
        )
        .then(res => res.json())
        .then(data => console.log(data))
        // .then(data2 => setIpfs(data2))
    };
        tokens!==null && tokens.map(data => fetchIPFS(data));
    }, [!!tokens]);





    
    //Second call
    // const { data: metadata } = useQueries({
    //     queries: (tokenIds || []).map(ids => {
    //         return {
    //             queryKey: ['ipfs', ids],
    //             queryFn: () => fetchMetadata(ids),
    //             enabled: !!tokenIds,
    //         }
    //     }),
    // })

    // const { data: metadata } = useQuery(['metadata', balance], fetchMetadata(balance), {enabled: balance!==null});

    // const url = metadata && (metadata || []).replace("ipfs//", "https://nftstorage.link/ipfs/");

    // const fetchIPFS = async (urls) => {
    //     const res = await fetch(urls, {
    //         "method": "GET",
    //         "headers": {
    //             "Content-Type": "application/json"
    //             }
    //         }
    //     )
    //     return res.json();
    // };

    // //Third call
    // const { data: urls } = useQueries({
    //     queries: (url || []).map(urls => {
    //         return {
    //             queryKey: ['urls', urls],
    //             queryFn: () => fetchIPFS(urls),
    //             enabled: !!url,
    //         }
    //     }),
    // })

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