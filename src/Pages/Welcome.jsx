
import {Toaster} from "react-hot-toast";
import React from 'react';
import NftValidationUtilitySection from "../Components/Utilities/NftValidationUtilitySection";
import Footer from "../Components/Layout/Footer";




export default function Welcome(props) {


    return (
        <>

            {/*<NftValidationHero></NftValidationHero>*/}
            <div
                className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-18 lg:py-24 font-sans">
                <NftValidationUtilitySection></NftValidationUtilitySection>
            </div>
            <Footer></Footer>
            <Toaster/>


        </>
    );
}
