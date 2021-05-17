import React, { useRef } from 'react'
import { useSelector } from 'react-redux'

let getRef;


function Room() {

    const currentDressingRoomSet = useSelector(state => state.DressingRoomReducer.currentDressingRoomSet);
    const currentActiveTab = useSelector(state => state.DressingRoomReducer.currentActiveTab);

    const changeRef = useRef(null);

    getRef = changeRef;

    return (
        <div className="col-md-4">
            <div className="contain">
                <div className="body"></div>
                <div className="model"></div>
                {
                    Object.keys(currentDressingRoomSet).map((k, index) => {
                        const v = currentDressingRoomSet[k];
                        if (k === currentActiveTab.type) {
                            return <div ref={changeRef} className={k} style={{ backgroundImage: `url(${v})` }} key={index}></div>
                        }
                        return <div className={k} style={{ backgroundImage: `url(${v})` }} key={index}></div>
                    })
                }
            </div>
        </div>
    )
}


export default Room
export const getCurrentRef = () => {
    return getRef.current
}

