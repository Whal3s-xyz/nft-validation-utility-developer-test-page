import React from 'react';
import {HiCheckCircle} from "react-icons/hi2";

const ClaimedNft = ({utility}) => {

    // Nothing to do here, this is just the successfully claimed screen
    return (
        <div className="rounded-md bg-green-50 p-4">
            <div className="flex">
                <div className="flex-shrink-0">
                    <HiCheckCircle className="h-5 w-5 text-green-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                    <p className="text-sm font-medium text-green-800">Successfully claimed! Display whatever you want as the success message. In our case its just that, nothing special :)</p>
                </div>

            </div>
        </div>
    );
};

export default ClaimedNft;
