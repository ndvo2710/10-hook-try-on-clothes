import React from 'react'
import Banner from '../Banner/Banner'
import Drawer from '../Drawer/Drawer'
import MainDresser from '../MainDresser/MainDresser'
import Room from '../Room/Room'

function DressingRoom() {

    return (
        <div className="container-fluid">
            <Banner />
            <hr />
            <MainDresser>
                <Drawer />
                <Room />
            </MainDresser>
        </div >
    )
}

export default DressingRoom
