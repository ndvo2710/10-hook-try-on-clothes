import React from 'react'
import { default as data } from '../../data/Data.json'


const currentActiveTab = data.navPills[1]


function Drawer() {
    const { navPills, tabPanes } = data;
    // console.log('navPills', navPills);
    // console.log('tabPanes', tabPanes);

    const renderNavBar = () => {
        return navPills.map((navItem, index) => {
            let aClassName = 'nav-link btn-default';
            if (navItem.tabName === currentActiveTab.tabName) {
                aClassName = 'nav-link btn-default active'
            }
            return (
                <li key={index} className="nav-item">
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
                            <button className="card-text">Try</button>
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
