

import React from "react";
import dynamic from "next/dynamic";

const PianoScene = dynamic(() => import("./3D/scenes/pianoScene"), { ssr: false });
const Welkom = () => {
    return (
        <div id="welkom" className="h-screen w-full flex justify-between flex-col md:flex-row">
            <div className="screen relative flex flex-col justify-center">
                <div>
                    <p className="text-header-color text-title font-jose whitespace-nowrap">Hi! I Am</p>
                    <p className="text-header-color text-subtitle  md:text-title font-jose whitespace-nowrap">Dander Siegers</p>
                </div>
            </div>
            <div className="screen w-full relative flex flex-col justify-center float-right">
                <PianoScene/>
            </div>
        </div>

    );
};
export default Welkom;