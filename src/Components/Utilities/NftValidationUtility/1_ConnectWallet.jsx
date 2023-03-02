import React, {useState} from 'react';
import Button from "../../Button";
import notify from "../../../utils/notify";

const ConnectWallet = ({utility}) => {
    const [loading, setLoading] = useState(false);
    const connectWallet = () => {
        setLoading(true)
        utility.connectWallet()
            .catch((e) => {
                notify('Error', e.message)
            })
            .finally(() => {
            setLoading(false)
        })
    }
    return (
        <div className="h-full flex flex-col">
            <p>This is an example workflow on how to claim your exclusive sticker.<br/> Simply follow the steps mentioned above - we will guide you through it. <br/><br/>
                Proceed by connecting your wallet.
            </p>

            <div className="mt-5 flex flex-grow items-end justify-end">
                <Button
                    isLoading={loading}
                    className=""
                    onClick={() => {
                        connectWallet()
                    }}>Connect Wallet</Button>
            </div>

        </div>
    );
};

export default ConnectWallet;
