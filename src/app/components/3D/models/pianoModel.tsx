"use client";

import { useGLTF } from "@react-three/drei";
const PianoModel = () => {
    useGLTF.preload("/piano5.glb");
    const gltf = useGLTF("/piano5.glb"); // Path relative to public/
    return <primitive object={gltf.scene} scale={3.5} rotation={[0,-2,0]} />;
};

export default PianoModel;