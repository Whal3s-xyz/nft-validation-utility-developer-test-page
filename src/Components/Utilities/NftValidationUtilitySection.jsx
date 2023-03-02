import React, {useEffect, useState} from 'react';
import Whal3s, {NftValidationUtility} from "@whal3s/whal3s.js";
import Button from "../../Components/Button";
import NftValidationUtilityProgressBar from "../ProgressBars/NftValidationUtilityProgressBar";
import TextInput from "../TextInput";
import InputLabel from "../InputLabel";
import Uninitialized from "./NftValidationUtility/0_Uninitialized";
import ConnectWallet from "./NftValidationUtility/1_ConnectWallet";
import LoadingNfts from "./NftValidationUtility/2_LoadingNfts";
import ClaimNft from "./NftValidationUtility/4_ClaimNft";
import ClaimedNft from "./NftValidationUtility/5_ClaimedNft";
import SelectNft from "./NftValidationUtility/3_SelectNft";


const NftValidationUtilitySection = () => {

    const whal3s = new Whal3s();
    const [utilityId, setUtilityId] = React.useState(
        JSON.parse(localStorage.getItem('nft-validation-utility-id')) || undefined
    );
    const [newUtilityId, setNewUtilityId] = React.useState('');
    const [utility, setUtility] = useState(undefined);
    const [step, setStep] = useState(0);


    const updateUtilityId = () => {
        localStorage.setItem('nft-validation-utility-id', JSON.stringify(newUtilityId));
        setUtilityId(newUtilityId);
    };

    useEffect(() => {
        init()
    }, [utilityId]);




    async function init() {
        console.log('init')
        if(!utilityId) return
        setStep(0)
        if (utility) {
            console.log('destroying old utility')
            utility.destroy()
        }
        try {
            const tmpUtility = await whal3s.createValidationUtility(utilityId)
            tmpUtility.addEventListener('stepChanged', (step) => {
                console.log("setting step to ", step.detail.step)
                setUtility(tmpUtility)
                setStep(step.detail.step)
            })
            setUtility(tmpUtility)
            setStep(tmpUtility.step)
        }
        catch (e) {
            setUtility(undefined)
        }
    }



    return (<div
        className="border border-zinc-300 p-5 md:p-10 ">
        <div>
            <InputLabel>Utility ID</InputLabel>
            <div className="flex space-x-2.5">
                <TextInput className="flex-grow" onChange={(e) => setNewUtilityId(e.target.value)}></TextInput>
                <Button onClick={updateUtilityId}>Update Utility ID</Button>
            </div>

        </div>
        <hr className="my-5"/>
        {utility ?
            <div className="grid gap-5 md:gap-10 grid grid-cols-1 md:grid-cols-[1fr_2fr]">
                <div className="flex flex-col align-center">
                    <h4 className="font-bold text-2xl">{utility.details.name}</h4>
                    <p>{utility.details.description}</p>
                </div>
                <div className="border border-zinc-300 p-5 flex flex-col">
                    <div className="flex justify-between text-sm font-medium text-gray-900 mb-2.5">
                        <span>Claiming utility...</span>
                        <span>Claims: {utility?.details?.engagements_count ?? 0}/{utility?.details?.max_engagements ?? '--'}</span>
                    </div>
                    <NftValidationUtilityProgressBar currentStep={step ?? 1}></NftValidationUtilityProgressBar>

                    <hr className="my-2.5"/>

                    <div className="flex-grow">
                        {step === NftValidationUtility.STEP_UNINITIALIZED && <Uninitialized/>}
                        {step === NftValidationUtility.STEP_INITIALIZED && <ConnectWallet utility={utility}/>}
                        {step === NftValidationUtility.STEP_WALLET_CONNECTED && <LoadingNfts/>}
                        {(step === NftValidationUtility.STEP_NFTS_FETCHED || step === NftValidationUtility.STEP_TOKEN_SELECTED) &&
                            <SelectNft utility={utility}/>}
                        {step === NftValidationUtility.STEP_RESERVED && <ClaimNft utility={utility}/>}
                        {step === NftValidationUtility.STEP_CLAIMED && <ClaimedNft utility={utility}/>}

                    </div>
                </div>
            </div>: <div><h2>Load utility by pasting the Utility ID in the field above.</h2></div> }
    </div>)
};

export default NftValidationUtilitySection;
