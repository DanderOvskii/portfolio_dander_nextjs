"use client";

import { useGLTF } from "@react-three/drei";
import { use } from "react";
const zoom = 10
const CharacterModel = () => {
    useGLTF.preload("/mannetje.glb");
    const gltf = useGLTF("/mannetje.glb"); // Path relative to public/
    return <primitive object={gltf.scene} scale={0.5} rotation={[0,1.2,0]} />;
};

export default CharacterModel;