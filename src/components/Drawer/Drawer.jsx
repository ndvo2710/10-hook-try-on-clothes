import { animated, useSpring } from '@react-spring/web';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_ACTIVE_TAB, TRY_IT_ON } from '../../redux/DressingRoomActionTypeConstants';
import { getRoomChangingItemRef } from '../Room/Room';

const getTRBLCoordinates = (element) => {
    const rect = element.getBoundingClientRect();
    return {
        top: rect.top,
        bottom: rect.bottom,
        right: rect.right,
        left: rect.left,
    }
    // return [rect.top, rect.right, rect.bottom, rect.left]
}

// bottom  x-20  y+90
// shoes  x-10 y+270 s.9
// handbags y130 x-100 s.5
// hair x+30 y0 s.7
// background x210 y210 s3.4
const adjustCoordinate = (itemType) => {
    switch (itemType) {
        case 'botclothes': return [-20, 90, 1]
        case 'shoes': return [-10, 270, 0.9]
        case 'handbag': return [-100, 130, 0.5]
        case 'hairstyle': return [30, 0, 0.7]
        case 'background': return [210, 210, 3.4]
        default: return [0, 0, 1]
    }
}

function Drawer(props) {
    console.count('Drawer')

    const { navPills, tabPanes } = props;
    const tryingItemRef = useRef({});

    const [indexAnimation, setIndexAnimation] = useState(-1)
    const [isFinishedAnimation, setIsFinishedAnimation] = useState(false)
    const [dispatchTryItemValue, setDispatchTryItemValue] = useState({})

    const [changeItem, setChangeItem] = useState([
        {
            id: 1,
            cName: "moving_object",
            imgSrc: "./img/shoes/shoes4.png",
            imgAlt: "Shoes 4",
            from_x: 0,
            from_y: 0,
            from_scale: 1,
            enter_x: 0,
            enter_y: 0,
            enter_scale: 1,
        },
    ]);

    const animProps = useSpring({
        config: { duration: 500 },
        from: { transform: `translate3d(${changeItem[0].from_x}px,${changeItem[0].from_y}px,0px) scale(${changeItem[0].from_scale})` },
        to: { transform: `translate3d(${changeItem[0].enter_x}px,${changeItem[0].enter_y}px,0px) scale(${changeItem[0].enter_scale})` },
        onRest: () => setIsFinishedAnimation(true),
    })

    const renderItem = () => {
        if (changeItem.length === 1) {
            return <animated.img style={animProps} ref={(element) => tryingItemRef.current[indexAnimation] = element} className={changeItem[0].cName} src={changeItem[0].imgSrc} alt={changeItem[0].imgAlt}></animated.img>
        }
        return (null)
    }

    const currentActiveTab = useSelector(state => state.DressingRoomReducer.currentActiveTab);
    const dispatch = useDispatch();

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

    useEffect(() => {
        dispatch({
            type: TRY_IT_ON,
            tryItem: dispatchTryItemValue
        })
        return () => {
            console.log("Cleaning Up");
            setIsFinishedAnimation(false);
            setIndexAnimation(-1);
            console.log("-------------------");
            console.log("-------------------");
            setChangeItem([
                {
                    cName: "moving_object",
                    imgSrc: "",
                    imgAlt: "",
                    from_x: 0,
                    from_y: 0,
                    from_scale: 1,
                    enter_x: 0,
                    enter_y: 0,
                    enter_scale: 1,
                },
            ])
        }
    }, [isFinishedAnimation])

    const renderTabPanes = () => {
        return tabPanes.map((tabPaneItem, index) => {
            if (tabPaneItem.type === currentActiveTab.type) {
                return (
                    <div className="col-md-3" key={index}>
                        <div className="card text-center">

                            {indexAnimation === index ? renderItem() : (<img ref={(element) => tryingItemRef.current[index] = element} src={tabPaneItem.imgSrc_jpg} alt={tabPaneItem.name} />)}
                            <span className="card-title font-weight-bold">{tabPaneItem.name}</span>
                            <button className="card-text" onClick={() => {
                                const roomChangingItemRefElem = getRoomChangingItemRef();
                                const rCIRElemStyle = getComputedStyle(roomChangingItemRefElem);
                                const roomChanginItemCoordinates = getTRBLCoordinates(roomChangingItemRefElem);
                                console.log('roomChangingItemRef', roomChangingItemRefElem);
                                console.log('roomChangingItemRef coordinates', roomChanginItemCoordinates);
                                console.log(rCIRElemStyle.top, rCIRElemStyle.left);

                                console.log(tryingItemRef);
                                const tryingItemRefElem = tryingItemRef.current[index];
                                const tryingItemRefCoordinates = getTRBLCoordinates(tryingItemRefElem);

                                console.log('tryingItemRefElem', tryingItemRefElem);
                                console.log('tryingItemRefElem coordinates', tryingItemRefCoordinates);

                                const coordinateAdjustment = adjustCoordinate(tabPaneItem.type);

                                const newData = [{
                                    cName: "moving_object",
                                    imgSrc: tabPaneItem.imgSrc_jpg,
                                    imgAlt: tabPaneItem.name,
                                    from_x: 1,
                                    from_y: 1,
                                    from_scale: 1,
                                    enter_x: (roomChanginItemCoordinates.right - tryingItemRefCoordinates.right) + coordinateAdjustment[0],
                                    enter_y: (roomChanginItemCoordinates.top - tryingItemRefCoordinates.top) + coordinateAdjustment[1],
                                    enter_scale: 1 * coordinateAdjustment[2],

                                }]
                                setChangeItem(newData)
                                setIndexAnimation(index);
                                setDispatchTryItemValue({
                                    [tabPaneItem.type]: tabPaneItem.imgSrc_png   
                                    // dynamic object key: https://www.samanthaming.com/tidbits/37-dynamic-property-name-with-es6/#how-to-access-object-value-with-emoji-keys
                                })
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
