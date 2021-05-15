import React from 'react'

function Banner() {
    return (
        <div className="row mt-3 justify-content-center">
            <div className="col-2 text-right">
                <img src="./img/main-logo.png" alt="main-logo.png" style={{ width: 180 }} />
            </div>
            <div className="col-5 pt-5">
                <h3 className="display-4"> Virtual Dressing Room</h3>
            </div>
        </div>
    )
}

export default Banner
