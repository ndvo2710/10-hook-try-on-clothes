import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_ACTIVE_TAB, TRY_IT_ON } from '../../redux/DressingRoomActionTypeConstants';
import { getCurrentRef } from '../Room/Room';



// const currentActiveTab = data.navPills[1]


function Drawer(props) {

    const { navPills, tabPanes } = props;

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

    const renderTabPanes = () => {
        return tabPanes.map((tabPaneItem, index) => {
            if (tabPaneItem.type === currentActiveTab.type) {
                return (
                    <div className="col-md-3" key={index}>
                        <div className="card text-center">
                            <img src={tabPaneItem.imgSrc_jpg} alt={tabPaneItem.name} />
                            <span className="card-title font-weight-bold">{tabPaneItem.name}</span>
                            <button className="card-text" onClick={() => {
                                console.log(getCurrentRef());
                                dispatch({
                                    type: TRY_IT_ON,
                                    tryItem: {
                                        [tabPaneItem.type]: tabPaneItem.imgSrc_png
                                    }
                                }) // dynamic object key: https://www.samanthaming.com/tidbits/37-dynamic-property-name-with-es6/#how-to-access-object-value-with-emoji-keys
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
