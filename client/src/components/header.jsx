import './header.css'

import {Outlet, Link} from "react-router-dom";


 function MyHeader(){
    return (
        <header className="header">
            <Link className="headerp" to={'/'} style={{textDecoration: 'none'}}>
                <img loading="eager" alt="Wonders of the World" src="/acat_0.webp"/>
                <p className="headerp"> Achievements</p>
            </Link>
            <p className="right headerp"> Achievements completed: <span style={{color: "white"}}> 0</span></p>


        </header>
    )
}

export default MyHeader