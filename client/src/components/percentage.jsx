import React from "react";

export default function ProgressBar({percentage}){

    return (
        <div className="progress-outer">
            <div className="progress-bar" style={{width: percentage + "%"}}></div>
        </div>


    )

}