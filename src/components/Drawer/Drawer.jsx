import { animated, useSpring } from '@react-spring/web';
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_ACTIVE_TAB, TRY_IT_ON } from '../../redux/DressingRoomActionTypeConstants';
import { getTRBLCoordinates } from '../../utils/coordinates';
import { getRoomChangingItemRef } from '../Room/Room';
import { initialLocalState } from './state';
import { adjustCoordinate } from './utils';

function Drawer(props) {
    console.count('Drawer')

    const { navPills, tabPanes } = props;

    const [countForceReRender, setCountForceReRender] = useState(0);
    console.log('You have forced update ', countForceReRender, ' times');

    const currentActiveTab = useSelector(state => state.DressingRoomReducer.currentActiveTab);
    // dummy Selector to pull currentDressingRoomSet from grs to this component as a non-used prop
    // so when Room is re-rendered, Drawer will be re-rendered also.
    useSelector(state => state.DressingRoomReducer.currentDressingRoomSet);  
    const dispatch = useDispatch();

    const tryingItemRef = useRef({});
    const changeItem = useRef(initialLocalState);

    const animProps = useSpring({
        config: { duration: 500 },
        from: { transform: `translate3d(0px,0px,0px) scale(1)` },
        to: { transform: `translate3d(${changeItem.current.enter_x}px,${changeItem.current.enter_y}px,0px) scale(${changeItem.current.enter_scale})` },
        onRest: () => {
            console.log('------- Right After Animation -------');
            const dpData = {...changeItem.current.dispatchData};
            if (changeItem.current.indexAnimation !== initialLocalState.indexAnimation) {
                changeItem.current = initialLocalState; // must reset changeItem before dispatch data to grs (global redux state)
                dispatch({
                    type: TRY_IT_ON,
                    tryItem: dpData
                });
            }            
        } ,
    })

    const renderNavBar = () => {
        return navPills.map((navItem, index) => {
            let aClassName = 'nav-link btn-default';
            if (navItem.tabName === currentActiveTab.tabName) {
                aClassName = 'nav-link btn-default active'
            }
            return (
                <li key={index} className="nav-item" onClick={() => {
                    dispatch({
                        type: CHANGE_ACTIVE_TAB,
                        currentActiveTab: { ...navItem }
                    })
                }}>
                    <a className={aClassName} data-toogle="pill" href={`#${navItem.tabName}`}>{navItem.showName}</a>
                </li>
            )
        })
    }

    const renderTabPanes = () => {
        return tabPanes.map((tabPaneItem, index) => {
            if (tabPaneItem.type === currentActiveTab.type) {
                return (
                    <div className="col-md-3" key={index}>
                        <div className="card text-center">
                            <animated.img
                                style={changeItem.current.indexAnimation === index ? animProps : {}}
                                ref={(element) => tryingItemRef.current[index] = element}
                                src={tabPaneItem.imgSrc_jpg}
                                alt={tabPaneItem.name}>
                            </animated.img>
                            <span className="card-title font-weight-bold">{tabPaneItem.name}</span>
                            <button className="card-text" onClick={() => {
                                console.count('Button is clicked');
                                const roomChangingItemRefElem = getRoomChangingItemRef();
                                const roomChanginItemCoordinates = getTRBLCoordinates(roomChangingItemRefElem);
                                // console.log('roomChangingItemRef', roomChangingItemRefElem);
                                // console.log('roomChangingItemRef coordinates', roomChanginItemCoordinates);

                                console.log(tryingItemRef);
                                const tryingItemRefElem = tryingItemRef.current[index];
                                const tryingItemRefCoordinates = getTRBLCoordinates(tryingItemRefElem);

                                // console.log('tryingItemRefElem', tryingItemRefElem);
                                // console.log('tryingItemRefElem coordinates', tryingItemRefCoordinates);

                                const coordinateAdjustment = adjustCoordinate(tabPaneItem.type);

                                const newData = {
                                    indexAnimation: index,
                                    imgSrc: tabPaneItem.imgSrc_jpg,
                                    imgAlt: tabPaneItem.name,
                                    enter_x: (roomChanginItemCoordinates.right - tryingItemRefCoordinates.right) + coordinateAdjustment[0],
                                    enter_y: (roomChanginItemCoordinates.top - tryingItemRefCoordinates.top) + coordinateAdjustment[1],
                                    enter_scale: 1 * coordinateAdjustment[2],
                                    dispatchData: {
                                        [tabPaneItem.type]: tabPaneItem.imgSrc_png   
                                        // dynamic object key: https://www.samanthaming.com/tidbits/37-dynamic-property-name-with-es6/#how-to-access-object-value-with-emoji-keys
                                    }
                                }
                                changeItem.current = newData // use useRef instead of useState to avoid unnecessary re-render
                                setCountForceReRender(c=>c+1); // forcing re-render to update animated img with new animProps
                            }}>Try</button>
                        </div>
                    </div>
                )
            }
            return (null)
        })
    }

    return (
        <div className="col-md-8">
            <ul className="nav nav-pills justify-content-center">
                {renderNavBar()}
            </ul>
            <div className="well">
                <div className="tab-content container">
                    <div className="row">
                        {renderTabPanes()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Drawer
