import ArrowRightIcon from "../assets/icons/ArrowRightIcon"
import ArrowDownIcon from "../assets/icons/ArrowDownIcon"
import SettingsIcon from "../assets/icons/SettingsIcon"
import CloseIcon from "../assets/icons/CloseIcon"
import BoxIcon from "../assets/icons/BoxIcon"
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
                            <div className="filterSection__category-container">
                                <div className={`container-option grey open`}>
                                    <div className="filterSection__accordion-title">
                                        <span>
                                            <span className="arrow"><ArrowDownIcon /></span>
                                            <p className="option-name">Brand</p>
                                        </span>
                                    </div>

                                    <div className="filtersSelect">
                                        <div class="filtersSelect__item-select">
                                            <p>Dressing Bench</p>
                                            <button type="button" id="buttonFilterOption" onclick="optionsclick('category-brand0')" aria-label="Quitar el filtro BEAUTIFUL HOME COLLECTIONS">
                                                <CloseIcon />
                                            </button>
                                        </div>
                                        <div class="filtersSelect__item-select">
                                            <p>Counter</p>
                                            <button type="button" id="buttonFilterOption" onclick="optionsclick('category-brand0')" aria-label="Quitar el filtro BEAUTIFUL HOME COLLECTIONS">
                                                <CloseIcon />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="filterSection__optionName">
                                        <ul>
                                            <li><input class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-neutral-100 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="checkSelection"/>Width 60” And Under <span>(90)</span></li>
                                            <li className="nameSelected"><input class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-neutral-100 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="checkSelection"/>Width 60” To 80”<span>(490)</span></li>
                                            <li><input class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-neutral-100 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="checkSelection"/>Width 60” And Under<span>(120)</span></li>
                                        </ul>                                        
                                    </div>                             

                                   
                                    

                                    
                                   




                                </div>
                            </div>




                        </div>




                        <div className="filterSection__bottom-area">
                            <div className="filterSection__custimizable">
                                <div className="optionTitle">
                                    <div className="filterSection__customizable-button">
                                        <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                                            <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white appearance-none cursor-pointer" />
                                            <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                                        </div>
                                        <label htmlFor="toggle">Customizable <span>(230)</span></label>
                                    </div>
                                </div>
                                <div className="icon-customized">
                                    <span><SettingsIcon /></span>
                                </div>
                            </div>
                            <div className="filterSection__quickShip">
                                <div className="optionTitle">
                                    <div className="filterSection__customizable-button">
                                        <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                                            <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white appearance-none cursor-pointer" />
                                            <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                                        </div>
                                        <label htmlFor="toggle">Quick Ship <span>(230)</span></label>
                                    </div>
                                </div>
                                <div className="icon-customized box-icon">
                                    <a className="addZip" href="/">Add Zip</a>
                                    <BoxIcon />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}