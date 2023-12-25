import './header.css'

export default function MyHeader(){
    return (
        <header>
            <img loading="eager" alt="Wonders of the World" src="/acat_0.webp"/>
            <p> Achievements</p>
            <p className="right"> Achievements completed: <span style={{color:"darkgrey"}}> 0</span></p>


        </header>
    )
}