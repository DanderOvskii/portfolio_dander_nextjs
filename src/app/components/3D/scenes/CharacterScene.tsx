"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import CharacterModel from "../models/CharacterModel";

const CharacterScene = () => {
    return (
        <Canvas style={{ width: "100%", height: "100vh" }} camera={{ position: [20, 15, 20]}}>

            <ambientLight intensity={0.1} />
            <directionalLight 
            position={[1, 3, -1]}
            intensity={1}
            color={"#ffffff"}
            />
            <CharacterModel />


            <OrbitControls
                enableZoom={false}
                enablePan={false}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 2}
                target={[0, -5.5, 0]}
                autoRotate={false}
                autoRotateSpeed={2}
            />
        </Canvas>
    );
}

export default CharacterScene;