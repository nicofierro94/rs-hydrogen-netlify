import { useState } from 'react'
import { getMetafield } from "../hooks/helper";

export default function Header({ categories }) {

    const [showCategories, setShowCategories] = useState(false);

    var parentCategories = categories.filter(c =>
        getMetafield(c.node.metafields, 'attributes', 'categoryLevel') == 1 &&
        getMetafield(c.node.metafields, 'attributes', 'showInHome') == 'True' &&
        getMetafield(c.node.metafields, 'attributes', 'enabled') == 'True')

    parentCategories = parentCategories.sort((a, b) => {
        if (+getMetafield(a.node.metafields, 'Order', 'collectionPosition') < +getMetafield(b.node.metafields, 'Order', 'collectionPosition')) return -1
        if (+getMetafield(a.node.metafields, 'Order', 'collectionPosition') > +getMetafield(b.node.metafields, 'Order', 'collectionPosition')) return 1
        return 0
    })

    return (
        <div onMouseLeave={() => setShowCategories(false)}>
            <div className="header flex flex-row items-center px-4">
                <div className="logo basis-3/12"><a href="/"><img src="https://cdn.shopify.com/s/files/1/0638/9193/1378/files/FurnitureKioskLogo_CMYK_360x_6965cea3-6657-4d0d-bb00-633c2a4c94b6_300x300.jpg" alt="" /></a></div>
                <div className="basis-6/12 text-center">
                    <span className="menu" onMouseEnter={() => setShowCategories(false)}>Brands</span>
                    <span className="menu" onMouseEnter={() => setShowCategories(false)}>Product Ranges</span>
                    <span className="menu" onMouseEnter={() => setShowCategories(true)}>Categories <span className="square"></span></span>
                    <span className="menu" onMouseEnter={() => setShowCategories(false)}>All Products</span>
                </div>
                <div className="basis-3/12 text-right">SEARCH - CART</div>
            </div>
            {showCategories &&
                <div className='categories'>
                    {parentCategories.map(pc => {
                        let subCategories = getMetafield(pc.node.metafields, 'attributes', 'subCategories') ?? false;
                        subCategories = JSON.parse(subCategories);
                        return (
                            <div>
                                <span>{pc.node.title}</span>
                                {subCategories && subCategories.map(sc => {
                                    const sub = categories.find(c => c.node.handle == sc)
                                    const showInHome = getMetafield(sub.node.metafields, 'attributes', 'showInHome')
                                    const enabled = getMetafield(sub.node.metafields, 'attributes', 'enabled')
                                    if (showInHome && enabled)
                                        return (
                                            <div className='__item'>
                                                {sub.node.title}
                                            </div>
                                        )
                                })}
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    )
}