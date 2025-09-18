"use client";

import react from "react";
import styles from "@/styles/button48.module.css";


const Footer = () => {
    const socaialIcons = ""
    return (
        <>
            <footer className="h-[300px] w-full bg-black z-9 relative flex ">

                <div className="w-1/2 screen relative float-right flex flex-col  ml-align-left items-start">
                    <div className="w-4/5">
                        <p className="text-header-color font-jose text-[50px] mt-5 mb-[25px] relative ml-0">my socials</p>
                        <div className="flex flex-row gap-[10px] alighn-center mt-[10px]">
                            <img src="icons/square-git.svg" className="social-icon" alt="" />
                            <a className="text-decoration:none" href="https://github.com/DanderOvskii?tab=repositories" target="_blank"><p className="text-just-white font-play text-[30px] transition-all duration-500 hover:tracking-[10px] hover:text-header-color">GitHub</p></a>
                        </div>

                        <div className="flex flex-row gap-[10px] alighn-center mt-[10px]" >
                            <img src="icons/square-instagram.svg" className="social-icon" alt="" />
                            <a className="text-decoration:none" href="https://www.instagram.com/danderovskiii/" target="_blank"><p className="text-just-white font-play text-[30px] transition-all duration-500 hover:tracking-[10px] hover:text-header-color">Instagram</p></a>
                        </div>

                        <div className="flex flex-row gap-[10px] alighn-center mt-[10px]" >
                            <img src="icons/linkedin.svg" className="social-icon" alt="" />
                            <a className="text-decoration:none" href="https://www.linkedin.com/in/dander-siegers-8596a724b/" target="_blank"><p className="text-just-white font-play text-[30px] transition-all duration-500 hover:tracking-[10px] hover:text-header-color" >LinkedIn</p></a>
                        </div>
                    </div>
                </div>
                <div className="w-1/2 screen relative float-left flex flex-col mr-align-left items-end">
                    <div className="w-1/3 text-right">
                        <p className="text-header-color font-jose relative mt-[20px] mb-25px text-[50px] ">let's work <br/> together</p>
                        <a href="./contact.php" className=" no-underline text-just-white text-subtitle transition-all ease-in-out duration-200 hover:text-header-color " >
                            <button className={styles.button48} role="button"><span>contact me</span></button>
                        </a>
                    </div>
                </div>
            </footer>
        </>
    );
};
export default Footer;