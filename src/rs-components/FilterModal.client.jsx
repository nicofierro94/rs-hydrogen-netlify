import ArrowRightIcon from "../assets/icons/ArrowRightIcon"
import SettingsIcon from "../assets/icons/SettingsIcon"
import { useState } from "react";

export default function CustomizeModal({ show, close }) {
    
    const clickClose = () => {
        close();
    }

    return (
        <div className={`modal-filter ${show && 'show'}`}>
            <div onClick={close}></div>
            <div className={`customize-modal ${show && 'show'}`}>
                <div className="content">
                    <span className="back" onClick={clickClose}><ArrowRightIcon /></span>
                </div>
                <div className="filterSection">
                    <div className="filterSection__container">
                        <div className="filterSection__top-area">
                            <div className="SectionProductTop__category-name">
                                <h1>Filters</h1>
                            </div>
                            <div className="ProductList__clear-button">
                                <button type="button">Clear All </button>
                            </div>
                        </div>  
                        <div className="filterSection__filter-group">

                            filtros              

                            

                        </div> 
                        <div className="filterSection__bottom-area">
                            <div className="filterSection__custimizable">                                
                                <div className="optionTitle">
                                    <p>Customizable<span>(230)</span></p>
                                </div>
                                <div className="icon-customized">
                                    <span><SettingsIcon /></span>
                                </div>
                            </div>
                            <div className="filterSection__quickShip">

                            </div>

                        </div>                      
                    </div>
                </div>
            </div>
        </div>
    )
    
}