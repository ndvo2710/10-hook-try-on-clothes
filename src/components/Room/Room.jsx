import React from 'react'

function Room() {
    return (
        <div className="col-md-4">
            <div className="contain">
                <div className="body"></div>
                <div className="model"></div>
                <div className="hairstyle"></div>
                <div className="necklace"></div>
                <div className="bikinitop"></div>
                <div className="bikinibottom"></div>
                <div className="topwear" style={{ width: "500px", height: "500px", position: "absolute", top: "-9%", left: "-5%", zIndex: 3, transform: "scale(0.5)" }}></div>
                <div className="bottomwear" style={{ width: "500px", height: "500px", position: "absolute", top: "-9%", left: "-5%", zIndex: 3, transform: "scale(0.5)" }}></div>
                <div className="handbag" style={{ backgroundImage: "url(./img/handbag2.png)" }}></div>
                <div className="feet"></div>
                <div className="background"></div>
            </div>
        </div>
    )
}

export default Room
