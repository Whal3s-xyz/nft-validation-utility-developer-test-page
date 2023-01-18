import React from 'react'
import {Popover} from '@headlessui/react'
import whal3sLogo from '../../assets/images/whal3s-logo-black.png'
import whal3sNft from '../../assets/images/whal3s-nft-video.mp4'
import {ChainId, ThirdwebProvider} from "@thirdweb-dev/react";
import ClaimButton from "../ClaimButton";
import notify from "../../utils/notify";
import {IoAlertOutline} from "react-icons/io5";

const navigation = [
    // { name: 'Product', href: '#' },
    // { name: 'Features', href: '#' },
    // { name: 'Marketplace', href: '#' },
    // { name: 'Company', href: '#' },
]

export default function NftValidationHero() {
    return (
        <div className="relative overflow-hidden bg-white">
            <div className="hidden lg:absolute lg:inset-0 lg:block" aria-hidden="true">
                <svg
                    className="absolute top-0 left-1/2 translate-x-64 -translate-y-8 transform"
                    width={640}
                    height={784}
                    fill="none"
                    viewBox="0 0 640 784"
                >
                    <defs>
                        <pattern
                            id="9ebea6f4-a1f5-4d96-8c4e-4c2abf658047"
                            x={118}
                            y={0}
                            width={20}
                            height={20}
                            patternUnits="userSpaceOnUse"
                        >
                            <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor"/>
                        </pattern>
                    </defs>
                    <rect y={72} width={640} height={640} className="text-gray-50" fill="currentColor"/>
                    <rect x={118} width={404} height={784} fill="url(#9ebea6f4-a1f5-4d96-8c4e-4c2abf658047)"/>
                </svg>
            </div>

            <div className="relative pt-6 pb-16 sm:pb-24 lg:pb-32">
                <Popover>
                    <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-6"
                         aria-label="Global">
                        <div className="flex flex-1 items-center">
                            <div className="flex w-full items-center justify-between md:w-auto">
                                <a href="/">
                                    <span className="sr-only">Whal3s</span>
                                    <img
                                        className="h-8 w-auto sm:h-10"
                                        src={whal3sLogo}
                                        alt=""
                                    />
                                </a>
                                <div className="-mr-2 flex items-center md:hidden">
                                </div>
                            </div>
                            <div className="hidden md:ml-10 md:block md:space-x-10">
                                {navigation.map((item) => (
                                    <a key={item.name} href={item.href}
                                       className="font-medium text-gray-500 hover:text-gray-900">
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                        <div className="hidden text-right md:block">
              <span className="inline-flex rounded-md shadow-md ring-1 ring-black ring-opacity-5">
                {/*<a*/}
                  {/*    href="#"*/}
                  {/*    className="inline-flex items-center rounded-md border border-transparent bg-white px-4 py-2 text-base font-medium text-whal3s-600 hover:bg-gray-50"*/}
                  {/*>*/}
                  {/*  Log in*/}
                  {/*</a>*/}
              </span>
                        </div>
                    </nav>

                </Popover>

                <main className="mx-auto mt-16 max-w-7xl px-4 px-6 sm:mt-24 lg:mt-32">
                    <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                        <div className="text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:text-left">
                            <h1>
                <span className="block text-base font-semibold text-gray-500 sm:text-lg lg:text-base xl:text-lg">
                  Magical experience
                </span>
                                <span className="mt-1 block text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl">
                  <span className="block text-gray-900">A better way to</span>
                  <span className="block text-whal3s-600">ship utility</span>
                </span>
                            </h1>
                            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                                Claim the Whal3s NFT and test the most intuitive token gating & rewards claim user flow.
                            </p>
                            <div className="mt-8 sm:mx-auto sm:max-w-lg sm:text-center lg:mx-0 lg:text-left">
                                <p className="text-base font-medium text-gray-900">
                                    Get some <a
                                    rel="noreferrer"
                                    target="_blank"
                                    className="text-whal3s-700 hover:text-whal3s-800 underline"
                                    href="https://faucet.polygon.technology/">testnet tokens</a> first to
                                    cover
                                    the gas fees</p>
                                <div className="mt-8 flex justify-center lg:justify-start">
                                    <div className="inline-flex rounded-md shadow">
                                        <ThirdwebProvider desiredChainId={ChainId.Mumbai}>
                                            <ClaimButton
                                                onError={(err) => notify('An error occured', err.reason, IoAlertOutline)}
                                                onSuccess={() => notify('Success', 'Whal3s NFT successfully claimed')}></ClaimButton>

                                        </ThirdwebProvider>
                                    </div>
                                    <div className="ml-3 inline-flex">
                                        <a
                                            rel="noreferrer"
                                            target="_blank"
                                            href="https://faucet.polygon.technology/"
                                            className="inline-flex items-center justify-center rounded-md border border-transparent bg-whal3s-400 px-5 py-3 text-base font-medium text-whal3s-700 hover:bg-whal3s-500"
                                        >
                                            Testnet tokens
                                        </a>
                                    </div>
                                </div>


                            </div>
                        </div>
                        <div
                            className="relative mt-12 sm:mx-auto sm:max-w-lg lg:col-span-6 lg:mx-0 lg:mt-0 lg:flex lg:max-w-none lg:items-center">
                            <svg
                                className="absolute top-0 left-1/2 origin-top -translate-x-1/2 -translate-y-8 scale-75 transform sm:scale-100 lg:hidden"
                                width={640}
                                height={784}
                                fill="none"
                                viewBox="0 0 640 784"
                                aria-hidden="true"
                            >
                                <defs>
                                    <pattern
                                        id="4f4f415c-a0e9-44c2-9601-6ded5a34a13e"
                                        x={118}
                                        y={0}
                                        width={20}
                                        height={20}
                                        patternUnits="userSpaceOnUse"
                                    >
                                        <rect x={0} y={0} width={4} height={4} className="text-gray-200"
                                              fill="currentColor"/>
                                    </pattern>
                                </defs>
                                <rect y={72} width={640} height={640} className="text-gray-50" fill="currentColor"/>
                                <rect x={118} width={404} height={784}
                                      fill="url(#4f4f415c-a0e9-44c2-9601-6ded5a34a13e)"/>
                            </svg>
                            <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                                <video
                                    className="relative block w-full overflow-hidden rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-whal3s-500 focus:ring-offset-2"
                                    src={whal3sNft} autoPlay loop muted playsInline/>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
