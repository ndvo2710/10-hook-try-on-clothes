import React from 'react'
import { useSelector } from 'react-redux'

function Room() {

    const currentDressingRoomSet = useSelector(state => state.DressingRoomReducer.currentDressingRoomSet);
    return (
        <div className="col-md-4">
            <div className="contain">
                <div className="body"></div>
                <div className="model"></div>
                <div className="hairstyle" style={{ backgroundImage: `url(${currentDressingRoomSet.hairstyle})` }}></div>
                <div className="necklace" style={{ backgroundImage: `url(${currentDressingRoomSet.necklaces})` }}></div>
                <div className="topwear" style={{ backgroundImage: `url(${currentDressingRoomSet.topclothes})` }}></div>
                <div className="bottomwear" style={{ backgroundImage: `url(${currentDressingRoomSet.botclothes})` }}></div>
                <div className="handbag" style={{ backgroundImage: `url(${currentDressingRoomSet.handbags})` }}></div>
                <div className="feet" style={{ backgroundImage: `url(${currentDressingRoomSet.shoes})` }}></div>
                <div className="background" style={{ backgroundImage: `url(${currentDressingRoomSet.background})` }}></div>
            </div>
        </div>
    )
}

export default Room
