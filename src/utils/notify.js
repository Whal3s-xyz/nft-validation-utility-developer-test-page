import {HiLightningBolt} from "react-icons/hi";
import toast from "react-hot-toast";
import classNames from "classnames";
import {MdOutlineClose} from "react-icons/md";
import React from "react";

const notify = (title, message, Icon = HiLightningBolt) =>
    toast.custom(
        (t) => (
            <div
                className={classNames([
                    'flex flex-row items-center w-96 bg-gray-900 px-4 py-6 text-white shadow-2xl hover:shadow-none transform-gpu translate-y-0 hover:translate-y-1 rounded-xl relative transition-all duration-500 ease-in-out',
                    t.visible ? "top-0" : "-top-96",
                ])}
            >
                <div className={'text-xl'}>
                    <Icon/>
                </div>
                <div className={'flex flex-col items-start justify-center ml-4 cursor-default'}>
                    <h1 className={'text-base text-gray-200 font-semibold leading-none tracking-wider'}>{title}</h1>
                    <p className={'text-sm text-gray-400 mt-2 leading-relaxed tracking-wider'}>
                        {message}
                    </p>
                </div>
                <div className={'absolute top-2 right-2 cursor-pointer text-lg'} onClick={() => toast.dismiss(t.id)}>
                    <MdOutlineClose/>
                </div>
            </div>
        ),
        {id: "claim-button-notification", position: "top-right", duration: 3000,}
    );


export default notify;
