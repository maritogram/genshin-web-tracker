import './header.css'

export default function MyHeader(){
    return (
        <header>
            <p className="left">  <img loading="eager" className="main_image" alt="Wonders of the World" src="/acat_0.webp" width="75" height="75" /> Achievements </p>
            <p className="right"> Achievements completed: <span style={{color:"darkgrey"}}> 0</span></p>
        </header>
    )
}