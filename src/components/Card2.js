import React from 'react';

const Card2 = ({image, ...props}) => {

    let url = "";
    url = image.replace("ipfs//", "https://ipfs.io/ipfs/");

    let external_url = "";
    external_url = props.external_url.replace("ipfs//", "https://ipfs.io/ipfs/");

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
                <div className="block items-center">
                    <h6 className="text-gray-900 text-base font-medium mb-0">Price</h6>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" height="50" width="50" fill="#794FDD" stroke='black'><path d="M5563 3252c-99,-61 -229,-61 -338,0l-775 469 -527 306 -775 469c-99,61 -229,61 -338,0l-616 -367c-99,-61 -169,-173 -169,-296l0 -724c0,-122 60,-235 169,-296l606 -357c99,-61 229,-61 338,0l606 357c99,61 169,173 169,296l0 469 527 -316 0 -469c0,-122 -60,-235 -169,-296l-1123 -673c-99,-61 -229,-61 -338,0l-1143 673c-109,61 -169,173 -169,296l0 1357c0,122 60,235 169,296l1143 673c99,61 229,61 338,0l775 -459 527 -316 775 -459c99,-61 229,-61 338,0l606 357c99,61 169,173 169,296l0 724c0,122 -60,235 -169,296l-606 367c-99,61 -229,61 -338,0l-606 -357c-99,-61 -169,-173 -169,-296l0 -469 -527 316 0 469c0,122 60,235 169,296l1143 673c99,61 229,61 338,0l1143 -673c99,-61 169,-173 169,-296l0 -1357c0,-122 -60,-235 -169,-296l-1153 -684z"></path></svg>
                    <span className="text-xl font-bold text-gray-900 mt-0">{props.price}</span>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Card2;