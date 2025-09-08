"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import PianoModel from "../models/pianoModel";

const PianoScene = () => {
    return (
        <Canvas style={{ width: "100%", height: "100vh" }} camera={{ position: [0, 2.5, 4]}}>

            <ambientLight intensity={0.1} />
            <directionalLight 
            position={[1, 3, -1]}
            intensity={1}
            color={"#ffffff"}
            />
            <PianoModel />


            <OrbitControls
                enableZoom={false}
                enablePan={false}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 2}
                target={[0, 0, 0]}
                autoRotate={false}
                autoRotateSpeed={2}
            />
        </Canvas>
    );
}

export default PianoScene;