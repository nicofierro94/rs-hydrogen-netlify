import FullSizeIcon from "../assets/icons/FullSizeIcon"
import ArrowLeftIcon from "../assets/icons/ArrowLeftIcon"
import ArrowRightIcon from "../assets/icons/ArrowRightIcon"
import CustomizeIcon from "../assets/icons/CustomizeIcon"
import AssembleIcon from "../assets/icons/AssembleIcon"
import ShareIcon from "../assets/icons/ShareIcon"
import ExclamationIcon from "../assets/icons/ExclamationIcon"
import SettingsIcon from "../assets/icons/SettingsIcon"
import TickIcon from "../assets/icons/TickIcon"
import { useState, useEffect } from "react"
import CustomizeModal from "./CustomizeModal.client"

export default function ProductDetails({ product }) {
    const medias = product.media.edges;
    const priceRange = product.priceRange;
    const variants = product.variants.edges;

    const [activeImage, setActiveImage] = useState(product.featuredImage.url);
    const [activePosition, setActivePosition] = useState(0);
    const [selectedVariant, setSelectedVariant] = useState(variants[1]?.node.id);
    const [showCustomize, setShowCustomize] = useState(false);

    useEffect(() => {
        if (showCustomize) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'auto';
    }, showCustomize)

    // TODO: improve
    const currencyCodes = []
    currencyCodes['GBP'] = '£'

    const changeActiveImage = (media, i) => {
        media?.node && setActiveImage(media.node.image.url);
        if (i >= 0 && i <= medias.length - 1) setActivePosition(i);
    }

    const nextActiveImage = () => {
        let newPosition = activePosition + 1;
        if (activePosition == medias.length - 1) newPosition = 0;
        setActivePosition(newPosition);
        changeActiveImage(medias[newPosition]);
    }

    const backActiveImage = () => {
        let newPosition = activePosition - 1;
        if (activePosition == 0) newPosition = medias.length + 1;
        setActivePosition(newPosition);
        changeActiveImage(medias[newPosition]);
    }

    const clickCustomize = () => {
        document.body.style.overflow = 'hidden';
        setShowCustomize(true);
    }

    const hideModal = () => {
        document.body.style.overflow = 'unset';
        setShowCustomize(false);
    }

    return (
        <>
            <CustomizeModal product={product} show={showCustomize} close={hideModal} />
            <div className="breadcrumb px-5">Home  ›  TODO  ›  TODO</div>
            <div className="product-container container px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2">
                    <div className="product-info">
                        <div className="carrousel">
                            <img src={activeImage} width="100%" height="100%" />
                            <span className="full-size cross circle"><FullSizeIcon /></span>
                            <span className="arrow-left circle" onClick={backActiveImage}><ArrowLeftIcon /></span>
                            <span className="arrow-right circle" onClick={nextActiveImage}><ArrowRightIcon /></span>
                        </div>
                        <div className="images-list">
                            {Array.from(Array(5)).map((_, i) =>
                                <div key={i} className="images-item" onClick={() => changeActiveImage(medias[i], i)}>
                                    {medias[i] && <img src={medias[i].node.image.url} width="100%" height="100%" />}
                                </div>
                            )}
                        </div>
                        <span className="share-button">Share <span><ShareIcon /></span></span>
                    </div>


                    <div className="product-options lg:pl-20 lg:pr-36 md:px-10 sm:px-10">
                        <h2>{product.title}</h2>
                        <div className="breadcrumb">› {product.vendor}</div>
                        <div className="breadcrumb">› {product.productType}</div>
                        <div className="price">
                            <span>
                                {priceRange.minVariantPrice.amount == priceRange.maxVariantPrice.amount ?
                                    `${currencyCodes[priceRange.minVariantPrice.currencyCode]}${priceRange.minVariantPrice.amount}`
                                    :
                                    `${currencyCodes[priceRange.minVariantPrice.currencyCode]}${priceRange.minVariantPrice.amount} - ${currencyCodes[priceRange.maxVariantPrice.currencyCode]}${priceRange.maxVariantPrice.amount}`
                                }
                            </span>
                            <p>Availability: TODO</p>
                        </div>
                        <div className="variants">
                            {variants.map((v, i) => {
                                if (v.node?.title != 'DefaultVariant') return (
                                    <div className={`variant-item ${selectedVariant == v.node?.id && 'selected'}`}>
                                        <div>
                                            <span>In Stock Option {i}</span>
                                            <p>{currencyCodes[v.node?.priceV2.currencyCode]}{v.node?.priceV2.amount}</p>
                                        </div>
                                        <span className="exclamation-circle">
                                            <ExclamationIcon />
                                        </span>
                                    </div>)
                            })}
                        </div>
                        <div className="extra-options">
                            <p>Extra Options</p>
                            <label className="container">
                                TODO
                                <input type="checkbox" checked onChange={() => { }} />
                                <span className="checkmark"></span>
                            </label>
                            <label className="container">
                                TODO
                                <input type="checkbox" onChange={() => { }} />
                                <span className="checkmark"></span>
                            </label>
                        </div>
                        <span className="customize-button" onClick={clickCustomize}>
                            <span><SettingsIcon /></span>
                            Customize Your Product
                        </span>
                        <span className="black-button">Add to Basket  - £449.00</span>
                        <span className="shop-secure">
                            <span><TickIcon /></span>
                            Shop secure. Free Returns
                        </span>
                    </div>
                    <div className="overview lg:px-9 sm:px-0 lg:my-5">
                        <div className="description-container">
                            <p dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}></p>
                        </div>
                        <div className="features-container mb-10">
                            <h3>Features</h3>
                            <div className="customizable">
                                <div className="icon">
                                    <CustomizeIcon />
                                </div>
                                <div className="description">
                                    <p><span>Customizable</span>Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. </p>
                                </div>
                            </div>
                            <div className="assemble">
                                <div className="icon">
                                    <AssembleIcon />
                                </div>
                                <div className="description">
                                    <p><span>Assemble</span>Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pre-footer mb-20">
                <div className="featured-product grid grid-cols-1 sm:grid-cols-2 my-10">
                    <div className="image-feature">
                        <img src="https://cdn.shopify.com/s/files/1/0600/3595/6902/files/image_7.jpg?v=1654192874" alt="" />
                    </div>
                    <div className="text-featured lg:pl-20 lg:pr-36 md:px-10 sm:px-10">
                        <p>Furniture Of Excellent Quality, That Make Your Home An Even Better Place</p>
                    </div>
                </div>
                <div className="recommended lg:mt-36">
                    <h3>You May Also Like</h3>
                    <div className="grid gap-14 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 my-16 px-4">
                        <div className="p-4 rounded-lg bg-indigo-300 dark:bg-indigo-800 dark:text-indigo-400">Product 01</div>
                        <div className="p-4 rounded-lg bg-indigo-300 dark:bg-indigo-800 dark:text-indigo-400">Product 02</div>
                        <div className="p-4 rounded-lg bg-indigo-300 dark:bg-indigo-800 dark:text-indigo-400">Product 03</div>
                        <div className="p-4 rounded-lg bg-indigo-300 dark:bg-indigo-800 dark:text-indigo-400">Product 04</div>
                    </div>
                </div>
            </div>
        </>
    )
}