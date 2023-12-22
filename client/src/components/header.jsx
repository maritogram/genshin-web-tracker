import './header.css'
import main_image from '../assets/acat_0.webp'
export default function MyHeader(){
    return (
        <header>
            <p className="left">  <img loading="eager" className="main_image" alt="Wonders of the World" src={main_image} width="75" height="75" /> Achievements </p>
            <p className="right"> Achievements completed: <span style={{color:"darkgrey"}}> 0</span></p>
        </header>
    )
}