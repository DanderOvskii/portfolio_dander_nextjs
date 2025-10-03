import { useEffect, useState } from 'react';
import { getProjects } from '@/utils/api';
import { Project } from '@prisma/client';
import Link from 'next/link';
import Image from 'next/image';
const Projects = () => {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        getProjects().then(setProjects);
    }, []);

    return (
        <div id="projects" className="h-screen w-screen flex flex-col items-center justify-center bg-background rounded-tl-[200px] rounded-tr-[200px] ">
            <p className="text-header-color text-title font-jose whitespace-nowrap " >projects</p>
            <div className="w-4/5 h-[60vh] flex gap-5 overflow-x-scroll overflow-y-hidden whitespace-nowrap items-center select-cont">
                {projects && projects.map((project) => (
                    <div
                        key={project.id}
                        className="group h-4/5 aspect-square flex justify-center items-center flex-col transition-all ease-in-out duration-300 hover:scale-110 hover:mb-[60px]"
                    >
                        <Link href={`projects/${project.id}` || ''} className="h-4/5 aspect-square">
                            <div className="h-full aspect-square bottom-0 rounded-[20px] shadow-[0px_30px_8px_-13px_rgba(0,0,0,0.27)] transition-all ease-in-out duration-300 group-hover:shadow-[0px_45px_12px_-13px_rgba(0,0,0,0.27)]">
                                <Image
                                    src={project.image || ''}
                                    alt={project.name}
                                    className="w-full h-full object-cover rounded-[20px] contrast-50 grayscale transition-all ease-in-out duration-300 group-hover:contrast-100 group-hover:grayscale-0"
                                    width={300}
                                    height={300}
                                    priority
                                />
                            </div>
                        </Link>
                        <p className="text-just-white font-play text-[30px] transition-all duration-500 group-hover:text-header-color">{project.name}</p>
                    </div>
                ))}
            </div>

        </div>
    );
};
export default Projects;