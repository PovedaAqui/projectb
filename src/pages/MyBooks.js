import React from 'react';
import { useAccount } from 'wagmi';

const MyBooks = () => {

    const { address } = useAccount();

    return (
        <div>
            {console.log(address)}
        </div>
    )
}

export default MyBooks;