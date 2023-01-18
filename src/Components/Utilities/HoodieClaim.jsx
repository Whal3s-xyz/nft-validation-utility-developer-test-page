import React, {useEffect, useState} from 'react';
import Whal3s, {NftValidationUtility} from "@whal3s/whal3s.js";
import Whal3sProductLogo from "../../assets/images/whal3s-logo-black-with-border.png";
import Button from "../../Components/Button";
import SuccessfullyClaimedAlert from "../../Components/Alerts/SuccessfullyClaimedAlert";
import notify from "../../utils/notify";
import NftValidationUtilityProgressBar from "../ProgressBars/NftValidationUtilityProgressBar";
import {format} from 'timeago.js';


const HoodieClaim = () => {
    const id = 'ca550f21-f70a-48fe-820b-e3b993bfd151';

    const [utility, setUtility] = useState(undefined);
    const [walletNfts, setWalletNfts] = useState({});
    const [step, setStep] = useState(0);
    const [email, setEmail] = useState(undefined);
    const [tokenId, setTokenId] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);


    const connectWallet = async () => {
        setIsLoading(true)
        try {
            await utility.connectWallet()
        } catch (e) {
            if (e.type === 'INTERACTION')
                notify('Error', e.stack)
            else
                notify('Error', e.message)

        }
        setIsLoading(false)
    };

    const selectNft = (tokenId) => {
        setTokenId(tokenId)
        utility.tokenId = tokenId
    }

    const reserve = async () => {
        setIsLoading(true)
        try {
            await utility.reserveEngagement()
        } catch (e) {
            notify('Error', e.message)
        }
        setIsLoading(false)
    }

    const claim = async () => {
        setIsLoading(true)
        try {
            await utility.storeEngagement({email})
        } catch (e) {

            notify('Error', e.message)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        async function init() {
            const whal3s = new Whal3s();
            const tmpUtility = await whal3s.createValidationUtility(id)
            tmpUtility.addEventListener('stepChanged', (step) => {
                console.log('step changed', step.detail.step)
                setStep(step.detail.step)
            })
            tmpUtility.addEventListener('nftsFetched', () => {
                setWalletNfts(tmpUtility.nfts)
            })
            setUtility(tmpUtility)
        }

        init()
    }, []);


    return (<div
        className="border border-zinc-300 p-5 md:p-10  grid gap-5 md:gap-10 grid grid-cols-1 md:grid-cols-[1fr_2fr]">
        <div className="flex flex-col align-center">
            <h4 className="font-bold text-2xl">Whal3s Sticker - NFT holder exclusive.</h4>
            <img alt="Hoodie" src={Whal3sProductLogo}/>
        </div>
        <div className="border border-zinc-300 p-5 flex flex-col">
            <div className="flex justify-between text-sm font-medium text-gray-900 mb-2.5">
                <span>Claiming utility...</span>
                <span>Claims: {utility?.details?.engagements_count ?? 0}/{utility?.details?.max_engagements ?? '--'}</span>
            </div>
            <NftValidationUtilityProgressBar currentStep={step ?? 1}></NftValidationUtilityProgressBar>

            <hr className="my-2.5"/>

            <div className="flex-grow">
                {step === 0 &&
                    <div className="h-full flex flex-col">
                        <p>This is an example workflow on how to claim your exclusive sticker.<br/> Simply follow the steps mentioned above - we will guide you through it. <br/><br/>
                            Proceed by connecting your wallet.
                        </p>

                        <div className="mt-5 flex flex-grow items-end justify-end">
                            <Button
                                isLoading={isLoading}
                                className=""
                                onClick={() => {
                                    connectWallet()
                                }}>Connect Wallet</Button>
                        </div>

                    </div>
                }

                {(step === NftValidationUtility.STEP_WALLET_CONNECTED || step === NftValidationUtility.STEP_TOKEN_SELECTED) &&
                    <div className="h-full flex flex-col">
                        {(walletNfts?.nfts === null || walletNfts?.nfts === undefined) &&
                            <div
                                className={`relative flex items-center space-x-3 border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-whal3s-500 focus-within:ring-offset-2 hover:border-gray-400`}>

                                <div className="flex-shrink-0">
                                    <div className="h-20 w-20 rounded-lg object-cover bg-cover bg-whal3s-400"/>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div
                                        className={`cursor-default focus:outline-none`}>
                                        <span className="absolute inset-0" aria-hidden="true"/>
                                        <p className="text-sm font-medium text-gray-900">Your NFT</p>
                                        <p className="truncate text-sm text-gray-500">---</p>
                                    </div>
                                </div>
                            </div>
                        }
                        {walletNfts?.nfts?.length === 0 &&
                            <div
                                className={`relative flex items-start space-x-3 border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-gray-400 `}>
                                <p>You dont own an NFT. Claim one with the button above.</p>
                            </div>
                        }
                        {walletNfts?.nfts?.length > 0 &&
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
                                {walletNfts?.nfts?.map((nft) => (
                                    <div
                                        key={nft.attributes.id.tokenId}
                                        className={` border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-whal3s-500 focus-within:ring-offset-2 hover:border-gray-400 ${tokenId === nft.attributes.id.tokenId ? 'ring-2 ring-whal3s-500 ring-offset-2' : ''}`}>
                                        <div className="relative flex items-start space-x-3">
                                            <div className="flex-shrink-0">
                                                <img
                                                    className="h-20 w-20 rounded-lg object-cover bg-cover bg-whal3s-400"
                                                    src={nft.attributes.media[0].thumbnail} alt=""/>
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <div
                                                    className={`${nft.valid ? 'cursor-pointer' : 'cursor-not-allowed'}  focus:outline-none`}>
                                            <span onClick={() => {
                                                if (!nft.valid)
                                                    return
                                                selectNft(nft.attributes.id.tokenId)
                                            }} className="absolute inset-0" aria-hidden="true"/>
                                                    <div className="h-full flex flex-col justify-between">
                                                        <div className="flex justify-between">
                                                        <span
                                                            className="text-sm font-medium text-gray-900">{nft.attributes.title}</span>
                                                            {nft.valid ?
                                                                <span
                                                                    className="h-min inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">Valid</span> :
                                                                <span
                                                                    className="h-min inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">Invalid</span>
                                                            }
                                                        </div>
                                                        <div className="text-gray-500 hidden sm:block">
                                                            {nft.engagements.length > 0 && nft.engagements.map((engagement) => (
                                                                <p key={engagement.id}>Claimed {format(new Date(engagement.updated_at))} by {engagement.wallet_address.substring(0, 4)}...{engagement.wallet_address.substring(engagement.wallet_address.length - 4)}</p>))}
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-2.5 text-gray-500 w-full sm:hidden ">
                                            {nft.engagements.length > 0 && nft.engagements.map((engagement) => (
                                                <p key={engagement.id}>Claimed {format(new Date(engagement.updated_at))} by {engagement.wallet_address.substring(0, 4)}...{engagement.wallet_address.substring(engagement.wallet_address.length - 4)}</p>))}
                                        </div>


                                    </div>
                                ))}
                            </div>
                        }

                        <div className="mt-5 flex flex-grow items-end justify-end">

                            <Button
                                disabled={step !== NftValidationUtility.STEP_TOKEN_SELECTED}
                                isLoading={isLoading}
                                onClick={() => {
                                    if (step !== NftValidationUtility.STEP_TOKEN_SELECTED)
                                        return
                                    reserve()
                                }}
                            >Next</Button>
                        </div>

                    </div>
                }

                {step === NftValidationUtility.STEP_RESERVED &&
                    <div className="h-full flex flex-col">
                        <div>
                            <p>Yes, Whal3s can store metadata (user input) for you! Say goodbye to the headaches of data storage and hello to peace of mind with Whal3s. <br/><br/>In this example we will ask you to provide your email when claiming.</p>
                        </div>
                        <div className="mt-5">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <div className="mt-1">
                                <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email"
                                       className="block w-full rounded-md border-gray-300 shadow-sm focus:border-whal3s-500 focus:ring-whal3s-500 sm:text-sm"
                                       placeholder="you@example.com"></input>
                            </div>
                        </div>
                        <div className="mt-5 flex flex-grow items-end justify-end">
                            <Button
                                isLoading={isLoading}
                                disabled={!email}
                                onClick={() => {
                                    claim()
                                }}>Claim</Button>
                        </div>
                    </div>
                }
                {step === NftValidationUtility.STEP_CLAIMED && <SuccessfullyClaimedAlert></SuccessfullyClaimedAlert>}
            </div>


        </div>
    </div>);
};

export default HoodieClaim;
