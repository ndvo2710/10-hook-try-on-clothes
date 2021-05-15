import React from 'react'
import Drawer from '../Drawer/Drawer'
import Room from '../Room/Room'

import { default as data } from '../../data/Data.json'

const { navPills, tabPanes } = data;

function MainDresser() {
    return (
        <div className="row">
            <Drawer navPills={navPills} tabPanes={tabPanes} />
            <Room tabPanes={tabPanes} />
        </div>
    )
}

export default MainDresser
