import React, { useRef } from 'react'
import { useSelector } from 'react-redux'

let roomChangingItemRef;


function Room() {
    console.count('Room');
    const currentDressingRoomSet = useSelector(state => state.DressingRoomReducer.currentDressingRoomSet);
    const currentActiveTab = useSelector(state => state.DressingRoomReducer.currentActiveTab);

    const changeRef = useRef(null);

    roomChangingItemRef = changeRef;

    return (
        <div className="col-md-4">
            <div className="contain">
                <div className="body" style={{ backgroundImage: "url(./img/allbody/bodynew.png)" }}></div>
                <div className="model" style={{ backgroundImage: "url(./img/model/1000new.png)" }}></div>
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
export const getRoomChangingItemRef = () => {
    return roomChangingItemRef.current
}

