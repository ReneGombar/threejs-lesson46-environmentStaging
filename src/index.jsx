import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'

const root = ReactDOM.createRoot(document.querySelector('#root'))

//function gets called when everything is created. Destructure to get the gl renderer. Here we set the background color
const created = ({gl}) =>{
    
    gl.setClearColor ("black", 1)
}

root.render(
    <Canvas
    shadows
        camera={ {
            fov: 45,
            near: 0.1,
            far: 200,
            position: [ - 4, 3, 6 ]
        } }
        onCreated = {created}
    >   

        //or change the color by creating a color object and attaching to the parent "Scene elements background"
        <color args={[ 'black' ]} attach="background"/>
        <Experience />
    </Canvas>
)