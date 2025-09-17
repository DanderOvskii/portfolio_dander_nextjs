"use client"

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getProject } from "@/utils/api";
import { Project } from "@prisma/client";
import styles from "@/styles/button48.module.css";


const project = () => {
    const params = useParams<{ id: string }>();
    const id = params.id as string;
    const [project, setProject] = useState<Project>()
    const [error, setError] = useState<string | null>(null)
    useEffect(() => {
        if (!id) return;
        getProject(id).then(setProject).catch((e) => setError(e?.message || "faild to load project"))

    }, [id]);

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center text-red-500">
                {error}
            </div>
        )
    }


    return (
        <>
            <div className="w-[85%] h-screen left-0 float-left">
                <img className="h-full w-full object-cover" src={project?.image} alt={project?.name} />
            </div>

            <div className="right-0 w-1/5 pt-8 pl-8 h-screen fixed float-right rounded-tl-[50px] rounded-bl-[50px] bg-background text-just-white">
                <div className="flex flex-col">
                    <a className="w-[50px]" href="/#projects">
                        <img className="w-full relative invert transition-all duration-[400ms] ease-[cubic-bezier(0.190,1.000,0.220,1.000)] hover:scale-120" src="\icons\icons8-back-100 (1).png" alt={project?.name} />
                    </a>
                    <p className="mr-1/10 text-subtitle text-header-color font-jose">{project?.name}</p>
                    <p className="font-play text-text">{project?.projectDate
                        ? new Date(project.projectDate).toLocaleDateString("en-GB")
                        : ""}</p>
                    <p className="font-play text-text">{project?.languages}</p>
                    <div className="w-3/4 h-2 bg-header-color mt-2 mb-2 rounded-[20px] "></div>
                    <p className="font-play text-text">{project?.description}</p>
                    <a className="w-1/8 bottom-[50px] absolute" href={project?.website || ""} target="_blank">
                        <button className={styles.button48} role="button"><span className={styles.text}>Go to page</span></button>
                    </a>

                </div>
            </div>
        </>
    );
}
export default project;