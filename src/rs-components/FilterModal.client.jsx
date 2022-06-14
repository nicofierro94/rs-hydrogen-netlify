import ArrowRightIcon from "../assets/icons/ArrowRightIcon"
import ArrowDownIcon from "../assets/icons/ArrowDownIcon"
import SettingsIcon from "../assets/icons/SettingsIcon"
import CloseIcon from "../assets/icons/CloseIcon"
import BoxIcon from "../assets/icons/BoxIcon"
import { useState, useEffect } from "react";

export default function FilterModal({ show, close, options, filter, updateFilter }) {

    const [optionsSelected, setOptionsSelected] = useState([])

    const clickClose = () => {
        close();
        console.log(options)
    }

    useEffect(() => {
        const updatedFilter = {
            ...filter,
            options: [],
            pagination: {
                page: 1,
                limit: 24
            }
        }

        options?.forEach(o => {
            const fieldValues = optionsSelected.filter(os => o.field == os.field).map(os => os.value);
            if (fieldValues.length > 0) {
                updatedFilter.options.push(
                    {
                        field: o.field,
                        values: fieldValues
                    }
                )
            }
        })
        if (JSON.stringify(updatedFilter) != JSON.stringify(filter)) {
            updateFilter(updatedFilter);
        }
    }, [optionsSelected])

    const addOption = (field, option) => {
        const selected = {
            field,
            value: option
        }

        const index = optionsSelected.findIndex(o => o.field == field && o.value == option);

        if (index == -1) setOptionsSelected(old => [...old, selected])
        else setOptionsSelected(old => old.filter(o => o.field != field || o.value != option));
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

                        <div className="filterSection__filter-container">
                            {options?.map((group, i) =>
                                <div className="filterSection__filter-group">
                                    <div className="filterSection__category-container">
                                        <div className={`container-option grey open ${i === 0 && 'first'}`}>
                                            <div className="filterSection__accordion-title">
                                                <span>
                                                    <span className="arrow"><ArrowDownIcon /></span>
                                                    <p className="option-name">{group.label}</p>
                                                </span>
                                            </div>

                                            <div className="filtersSelect">
                                                {optionsSelected.filter(os => os.field === group.field).map(os =>
                                                    <div class="filtersSelect__item-select">
                                                        <p>{os.value}</p>
                                                        <button onClick={() => addOption(group.field, os.value)} type="button" id="buttonFilterOption" aria-label="Quitar el filtro BEAUTIFUL HOME COLLECTIONS">
                                                            <CloseIcon />
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="filterSection__optionName">
                                                <ul>
                                                    {group.options.map(option =>
                                                        <li className={`${optionsSelected.findIndex(os => os.field == group.field && os.value == option.key) != -1 && 'nameSelected'}`} onClick={() => addOption(group.field, option.key)}>
                                                            <input class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-neutral-100 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="checkSelection" />
                                                            {option.key} <span>({option.doc_count})</span>
                                                        </li>
                                                    )}
                                                    {/* <li className="nameSelected"><input class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-neutral-100 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="checkSelection" />Width 60” To 80”<span>(490)</span></li> */}
                                                    {/* <li><input class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-neutral-100 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="checkSelection" />Width 60” And Under<span>(120)</span></li> */}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* <div className="filterSection__bottom-area">
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
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )

}