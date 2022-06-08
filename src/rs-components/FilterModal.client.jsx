import ArrowRightIcon from "../assets/icons/ArrowRightIcon"
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
            </div>
        </div>
    )
}