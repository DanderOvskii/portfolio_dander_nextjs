import React from "react";
import CharacterScene from "./3D/scenes/CharacterScene";

const AboutMe = () => {
    return (
         <div id="about" className="h-screen w-full flex flex-col md:flex-row">
            <div className="w-1/2 screen relative float-left flex flex-col justify-center mr-align-left">
                <div className="bg-header-color w-[60%] aspect-[3/5] rounded-full overflow-hidden shadow-lg">
                    <CharacterScene/>
                </div>
            </div>
            <div className="w-1/2 screen relative float-right flex flex-col justify-center ">
                <div>
                    <p className="text-header-color text-title font-jose mb-[20px]">About Me</p>
                    <p className="text-just-white text-text font-play mb-[20px]">I&apos;am a multifaceted enthusiast deeply engrossed in software development, 3D modeling, and fitness. In the realm of software, they thrive on problem-solving and embrace the evolving landscape of code. </p>
                    <div className="flex flex-row items-center gap-4 ">
                        <a className="block w-[40px] hover:scale-[1.2] transition-transform duration-200" href="https://github.com/DanderOvskii?tab=repositories" target="_blank">
                            <img src="icons/square-git.svg" className="social-icon" alt=""/>
                        </a>
                        <a className="block w-[40px] hover:scale-[1.2] transition-transform duration-200" href="https://www.instagram.com/danderovskiii/" target="_blank">
                            <img src="icons/square-instagram.svg" className="social-icon" alt=""/>
                        </a>
                        <a className="block w-[40px] hover:scale-[1.2] transition-transform duration-200" href="https://www.linkedin.com/in/dander-siegers-8596a724b/" target="_blank">
                            <img src="icons/linkedin.svg" className="social-icon" alt=""/>
                        </a>
                    </div>
                </div>
            </div>
        </div>

            );
};

export default AboutMe;