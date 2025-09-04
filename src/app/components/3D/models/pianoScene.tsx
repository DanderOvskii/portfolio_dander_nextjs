"use client"; 

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const PianoScene = () => {
    return (
        <Canvas style={{ width: "100%", height: "100vh" }}>
            
            <ambientLight intensity={0.5} />
            <directionalLight position={[3, 3, 3]} />

            <mesh rotation={[0.4, 0.2, 0]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="hotpink" />
            </mesh>

           
            <OrbitControls />
        </Canvas>
    );
}

export default PianoScene;