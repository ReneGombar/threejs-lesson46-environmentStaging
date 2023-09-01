import { useFrame } from '@react-three/fiber'
import { RandomizedLight, AccumulativeShadows, SoftShadows, BakeShadows, useHelper, OrbitControls } from '@react-three/drei'
import { useRef } from 'react'
import { Perf } from 'r3f-perf'
import * as THREE from 'three'

export default function Experience()
{
    const cube = useRef()
    
    useFrame((state, delta) =>
    {   
        const time = state.clock.elapsedTime
        cube.current.rotation.y += delta * 0.2
        cube.current.position.x = 2 + Math.sin(time)
    })

    //create reference o the directional light to make the lighs helpers
    const directionalLight = useRef()
    //useHelper(directionalLight, THREE.DirectionalLightHelper, 1)

    return <>
        {/* this will bake the shadows to ignore recalculating the shadows on each frame */}
        {/* <BakeShadows/> */}
        
        {/* <SoftShadows frustum={3.75} size={50} near ={9.5} samples={17} rings={11}/> */}
        
        <AccumulativeShadows
            position={[0, -0.99, 0]}
            scale={10}
            color='#316d39'
            opacity={0.8}
            frames={Infinity}
            temporal
            blend={ 10 }
            >
            <RandomizedLight
                position={ [1, 2 ,3] }
                amount={8}
                radius={1}
                ambient={0.5}
                intensity={1}
                bias={0.001}
            />
        
        </AccumulativeShadows>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <directionalLight 
            ref={directionalLight} 
            position={ [ 1, 2, 3 ] } 
            intensity={ 1.5 } 
            castShadow
            shadow-mapSize={[1024 ,1024]}
            shadow-camera-near={1}
            shadow-camera-far={10}
            shadow-camera-top={5}
            shadow-camera-right={5}
            shadow-camera-bottom={-5}
            shadow-camera-left={-5}
        />
        
        
        <ambientLight intensity={ 0.5 } />

        <mesh position-x={ - 2 } castShadow>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>
        
        <mesh position-x={ - 4 } castShadow>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>

        <mesh ref={ cube } position-x={ 2 } scale={ 1.5 } castShadow>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>

        <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 } >
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

    </>
}