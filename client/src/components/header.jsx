import './header.css'

 function MyHeader(){
    return (
        <header>
            <img loading="eager" alt="Wonders of the World" src="/acat_0.webp"/>
            <p> Achievements</p>
            <p className="right"> Achievements completed: <span style={{color:"white"}}> 0</span></p>


        </header>
    )
}

export default MyHeader