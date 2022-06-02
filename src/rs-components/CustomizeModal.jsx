import ArrowRightIcon from "../assets/icons/ArrowRightIcon"
import ArrowDownIcon from "../assets/icons/ArrowDownIcon"
import GreenTickIcon from "../assets/icons/GreenTickIcon"
import { useState } from "react";

export default function CustomizeModal({ product, show, close }) {
    const clickClose = () => {
        close();
    }
    return (
        <div className={`modal ${show && 'show'}`}>
            <div onClick={close}></div>
            <div className={`customize-modal ${show && 'show'}`}>
                <div className="content">
                    <span className="back" onClick={clickClose}><ArrowRightIcon /></span>
                    <h2>{product.title}</h2>
                    <div className="price">
                        <span><span>Customize: </span>£449.00 - £560.00</span>
                        <p>Availability: TODO</p>
                    </div>
                    <p className="select-title">Select:</p>
                    <Option option={{ type: 'text', title: "Size" }} hasValue={true} />
                    <Option option={{ type: 'image', title: 'Base Color' }} hasValue={false} />

                </div>
            </div>
        </div>
    )
}

const Option = ({ option, hasValue }) => {
    const [isOpen, setIsOpen] = useState(false);

    const clickOpen = () => {
        setIsOpen(true);
    }

    const clickClose = () => {
        setIsOpen(false);
    }

    if (isOpen == false)
        return (
            <div className={`container-option ${hasValue == false && 'grey'}`} onClick={clickOpen}>
                <span>
                    <span className="arrow"><ArrowDownIcon /></span>
                    <p className="option-name">{option.title}</p></span>
                <span>
                    {hasValue == true && <>
                        <p className="option-value">2648 - 26" x 48" Desk Top</p>
                        {option.type == 'image' && <span className="option-image"></span>}
                        <GreenTickIcon />
                    </>}
                </span>
            </div>
        )

    else return (
        <div className={`container-option open`}>
            <span onClick={clickClose}>
                <span className="arrow"><ArrowDownIcon /></span>
                <p className="option-name">{option.title}</p>
            </span>
            {option.type == 'text' && <TextOptions />}
            {option.type == 'image' && <ImageOptions />}
        </div>
    )
}

const TextOptions = () => {
    return (
        <div className="options text">
            <div className={`option-item selected`}>
                <div>
                    <span>2648 - 26" x 48" Desk Top</span>
                    <span> <b>£449.00</b> - <del>£549.00</del></span>
                </div>
            </div>
            <div className={`option-item`}>
                <div>
                    <span>2648 - 26" x 48" Desk Top</span>
                    <span> <b>£449.00</b> - <del>£549.00</del></span>
                </div>
            </div>
        </div>
    )
}

const ImageOptions = () => {
    return (
        <div className="options image">
            <div className="option-row">
                <div className="head">
                    <span>Fabric 2 aquaclean</span>
                    <span><b>£540.00</b>   <del>£661.00</del></span>
                </div>
                <div className="box-container">
                    <div className="grid-options-colors">
                        <span className="box-image"></span>
                        <span className="box-image"></span>
                        <span className="box-image"></span>
                        <span className="box-image"></span>
                        <span className="box-image"></span>
                        <span className="box-image"></span>
                        <span className="box-image"></span>
                        <span className="box-image"></span>
                        <span className="box-image"></span>
                        <span className="box-image"></span>
                        <span className="box-image"></span>
                        <span className="box-image"></span>
                        <span className="box-image"></span>
                        <span className="box-image"></span>
                        <span className="box-image"></span>
                        <span className="box-image"></span>
                        <span className="box-image"></span>
                        <span className="box-image"></span>
                        <span className="box-image"></span>
                        <span className="box-image"></span>
                        <span className="box-image"></span>
                        <span className="box-image"></span>
                        <span className="box-image"></span>
                        <span className="box-image"></span>
                    </div>
                </div>

                <div className="head">
                    <span>Fabric 2 aquaclean</span>
                    <span><b>£540.00</b>   <del>£661.00</del></span>
                </div>
                <div className="box-container">
                    <div className="grid-options-colors">
                        <span className="box-image"></span>
                        <span className="box-image"></span>
                        <span className="box-image"></span>
                        <span className="box-image"></span>
                        <span className="box-image"></span>
                        <span className="box-image"></span>
                        <span className="box-image"></span>
                        <span className="box-image"></span>
                        <span className="box-image"></span>
                        <span className="box-image"></span>
                        <span className="box-image"></span>
                        <span className="box-image"></span>
                        <span className="box-image"></span>
                        <span className="box-image"></span>
                        <span className="box-image"></span>
                        <span className="box-image"></span>
                        <span className="box-image"></span>
                        <span className="box-image"></span>
                        <span className="box-image"></span>
                        <span className="box-image"></span>
                        <span className="box-image"></span>
                        <span className="box-image"></span>
                        <span className="box-image"></span>
                        <span className="box-image"></span>
                    </div>
                </div>
            </div>
        </div>
    )
}