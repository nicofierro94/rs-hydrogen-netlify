import FullSizeIcon from "../assets/icons/FullSizeIcon"
import ArrowLeftIcon from "../assets/icons/ArrowLeftIcon"
import ArrowRightIcon from "../assets/icons/ArrowRightIcon"
import ShareIcon from "../assets/icons/ShareIcon"
import ExclamationIcon from "../assets/icons/ExclamationIcon"
import SettingsIcon from "../assets/icons/SettingsIcon"
import TickIcon from "../assets/icons/TickIcon"

export default function ProductDetails({ product }) {
    return (
        <>
            <div className="breadcrumb">Home  ›  Alstons Upholstery  ›  Lowry & Adelphi  ›  Adelphi Grand Sofa</div>
            <div className="product-container">
                <div className="product-info">
                    <div className="carrousel">
                        <span className="full-size"><FullSizeIcon /></span>
                        <span className="arrow-left"><ArrowLeftIcon /></span>
                        <span className="arrow-right"><ArrowRightIcon /></span>
                    </div>
                    <div className="images-list">
                        <div className="images-item"></div>
                        <div className="images-item"></div>
                        <div className="images-item"></div>
                        <div className="images-item"></div>
                        <div className="images-item"></div>
                    </div>
                    <span className="share-button">Share <span><ShareIcon /></span></span>
                    <div className="overview">
                        <h2>Overview</h2>
                        <p>With compact scroll arms, deep cushioning and elegantly piped tailoring, the design is as classic as it is contemporary. Luxurious chenille’s and velvet fabrics work perfectly with a choice of fashionable legs that add a personal touch of indulgence and style.</p>
                    </div>
                </div>
                <div className="product-options">
                    <h2>Adelphi Grand Sofa Large Square - W92 x D92cm</h2>
                    <div className="breadcrumb">› Beautiful Home Collections</div>
                    <div className="breadcrumb">› Fabric Bedframes</div>
                    <div className="price">
                        <span>£449.00 - £560.00</span>
                        <p>Availability: 10 - 12 week</p>
                    </div>
                    <div className="variants">
                        <div className="variant-item selected">
                            <div>
                                <span>In Stock Option 1</span>
                                <p>£449.00</p>
                            </div>
                            <span className="exclamation-circle">
                                <ExclamationIcon />
                            </span>
                        </div>
                        <div className="variant-item">
                            <div>
                                <span>In Stock Option 1</span>
                                <p>£449.00</p>
                            </div>
                            <span className="exclamation-circle">
                                <ExclamationIcon />
                            </span>
                        </div>
                        <div className="variant-item">
                            <div>
                                <span>In Stock Option 1</span>
                                <p>£449.00</p>
                            </div>
                            <span className="exclamation-circle">
                                <ExclamationIcon />
                            </span>
                        </div>
                        <div className="variant-item">
                            <div>
                                <span>In Stock Option 1</span>
                                <p>£449.00</p>
                            </div>
                            <span className="exclamation-circle">
                                <ExclamationIcon />
                            </span>
                        </div>
                    </div>
                    <div className="extra-options">
                        <p>Extra Options</p>
                        <label class="container">
                            Add:  3' protector - 12 year guarantee  £31.99
                            <input type="checkbox" checked onChange={() => { }} />
                            <span className="checkmark"></span>
                        </label>
                        <label class="container">
                            Recycle my old Sofa
                            <input type="checkbox" onChange={() => { }} />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                    <span className="customize-button">
                        <span><SettingsIcon /></span>
                        Customize Your Product
                    </span>
                    <span className="black-button">Add to Basket  - £449.00</span>
                    <span className="shop-secure">
                        <span><TickIcon /></span>
                        Shop secure. Free Returns
                    </span>
                </div>
            </div>
        </>
    )
}