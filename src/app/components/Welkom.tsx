"use client"; 

import React from "react";
import dynamic from "next/dynamic";

const PianoScene = dynamic(() => import("./3D/models/pianoScene"), { ssr: false });
const Welkom = () => {
    return (
        <div className="h-screen w-full flex flex-col md:flex-row">
            <div className="w-1/2 screen relative float-left flex flex-col justify-center mr-align-left">
                <div>
                    <p className="text-header-color text-title font-jose whitespace-nowrap">Hi! I Am</p>
                    <p className="text-header-color text-title font-jose whitespace-nowrap">Dander Siegers</p>
                </div>
            </div>
            <div className="w-1/2 screen relative float-right flex flex-col justify-center ml-align-left">
                <div id="canvas"><PianoScene/></div>
            </div>
        </div>

    );
};
export default Welkom;