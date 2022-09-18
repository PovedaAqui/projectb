import React from 'react';
import DropdownMenu from './DropdownMenu';

const Card = ({image, ...props}) => {

    let url = "";
    url = image?.replace("ipfs//", "https://ipfs.io/ipfs/");

    let external_url = "";
    external_url = props?.external_url?.replace("ipfs//", "https://ipfs.io/ipfs/");

    return (
        <div className="flex justify-start relative m-2">
            <div className="rounded-lg shadow-lg bg-white max-w-sm">
                <a href={external_url} rel="external">
                    <img className="rounded-t-lg" src={url} alt=""/>
                </a>
                <div className="relative p-6">
                    <h5 className="text-gray-900 text-xl font-medium mb-2">{props.name}</h5>
                    <p className="text-gray-700 text-base mb-4">
                        {props.description}
                    </p>
                    <DropdownMenu /> 
                </div>
            </div>
        </div>
    )
}

export default Card;