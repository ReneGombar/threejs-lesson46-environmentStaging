import { useFrame } from '@react-three/fiber'
import {Lightformer, Environment, Sky, ContactShadows, RandomizedLight, AccumulativeShadows, SoftShadows, BakeShadows, useHelper, OrbitControls } from '@react-three/drei'
import { useRef } from 'react'
import { Perf } from 'r3f-perf'
import * as THREE from 'three'
import { useControls } from 'leva'

export default function Experience()
{   

    const {color, opacity, blur} = useControls("contact shadow",{
        color: "#000000",
        opacity: {value: 0.5, min: 0, max:1},
        blur: {value: 1, min: 0, max: 10}
    })

    const {sunPosition} = useControls("sky",{
        sunPosition: {value: [1,2,3],
        }
    })

    const { envMapIntensity, envMapHeight, envMapRadius, envMapScale} = useControls("env map",{
        envMapIntensity: {value : 1 , min: 0, max: 10},
        envMapHeight: {value: 7, min:0,max:100},
        envMapRadius: {value: 20, min:10,max:1000},
        envMapScale: {value: 20, min:10,max:1000}
    })


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
        <Environment
            preset="sunset"
            ground={{
                height:envMapHeight,
                radius:envMapRadius,
                scale:envMapScale,

            }}

            // files={[
            //     "./environmentMaps/2/px.jpg",
            //     "./environmentMaps/2/nx.jpg",
            //     "./environmentMaps/2/py.jpg",
            //     "./environmentMaps/2/ny.jpg",
            //     "./environmentMaps/2/pz.jpg",
            //     "./environmentMaps/2/nz.jpg",
                
            // ]}

            //files={"./environmentMaps/the_sky_is_on_fire_2k.hdr"}
            >

        //custom plane enviroment map
        {/* <mesh position-z={-5} scale={10}>
            <planeGeometry/>
            <meshBasicMaterial color={[10,0,0]}/>
        </mesh> */}

        <Lightformer 
            position-z={-5} 
            scale={10}
            color="red"
            intensity={10}
            form="ring"
            />

        <color args={["#000000"]} attach="background"/>
        </Environment>



        {/* this will bake the shadows to ignore recalculating the shadows on each frame */}
        {/* <BakeShadows/> */}
        
        {/* <SoftShadows frustum={3.75} size={50} near ={9.5} samples={17} rings={11}/> */}
        
        {/* <AccumulativeShadows
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
        
        </AccumulativeShadows> */}

        
        <ContactShadows 
            position={[0, 0.001, 0 ]}
            scale={10}
            resolution={128}
            far={5}
            color={color}
            opacity={opacity}
            blur= {blur}
        />

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        {/* <directionalLight 
            ref={directionalLight} 
            position={ sunPosition } 
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
        
        
        <ambientLight intensity={ 0.5 } /> */}

        {/* <Sky
        sunPosition={sunPosition}
        ></Sky> */}

        <mesh position-x={ - 2 } position-y={1}castShadow>
            <sphereGeometry />
            <meshStandardMaterial color="orange" envMapIntensity={envMapIntensity}/>
        </mesh>
        
        <mesh position-x={ - 4 } position-y={1} castShadow>
            <sphereGeometry />
            <meshStandardMaterial color="orange" envMapIntensity={envMapIntensity}/>
        </mesh>

        <mesh ref={ cube } position-x={ 2 } position-y={1} scale={ 1.5 } castShadow>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" envMapIntensity={envMapIntensity}/>
        </mesh>

        {/* <mesh position-y={ 0 } rotation-x={ - Math.PI * 0.5 } scale={ 10 } >
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" envMapIntensity={envMapIntensity}/>
        </mesh> */}

    </>
}