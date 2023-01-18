import {Web3Button} from "@thirdweb-dev/react";

export default function ClaimButton({onError, onSuccess}) {

    return (
        <Web3Button
            accentColor="#8348FF"
            colorMode="light"
            contractAddress={"0x8f4d3Cf1998Fbf203F221c8986A0A11e14Fdb1a9"}
            action={(contract) => contract.erc721.claim(1)}
            onSuccess={onSuccess}
            onError={onError}
        >
            Claim NFT
        </Web3Button>
    );
}
