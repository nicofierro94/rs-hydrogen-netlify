import { useState } from 'react'
import { getMetafield } from "../hooks/helper";
import SearchIcon from "../assets/icons/SearchIcon"
import { useNavigate } from "@shopify/hydrogen/client"

export default function Header({ categories }) {

    const [showCategories, setShowCategories] = useState(false);

    const nav = useNavigate();

    var parentCategories = categories.filter(c =>
        getMetafield(c.node.metafields, 'attributes', 'categoryLevel') == 1 &&
        getMetafield(c.node.metafields, 'attributes', 'showInHome') == 'True' &&
        getMetafield(c.node.metafields, 'attributes', 'enabled') == 'True')

    parentCategories = parentCategories.sort((a, b) => {
        if (+getMetafield(a.node.metafields, 'Order', 'collectionPosition') < +getMetafield(b.node.metafields, 'Order', 'collectionPosition')) return -1
        if (+getMetafield(a.node.metafields, 'Order', 'collectionPosition') > +getMetafield(b.node.metafields, 'Order', 'collectionPosition')) return 1
        return 0
    })

    const goTo = (path) => {
        nav(path)
    }

    return (
        <div onMouseLeave={() => setShowCategories(false)}>
            <div className="header flex flex-row items-center px-4">
                <div className="logo basis-3/12"><a href="/"><img src="https://cdn.shopify.com/s/files/1/0638/9193/1378/files/FurnitureKioskLogo_CMYK_360x_6965cea3-6657-4d0d-bb00-633c2a4c94b6_300x300.jpg" alt="" /></a></div>
                <div className="basis-6/12 text-center">
                    <span className="menu" onMouseEnter={() => setShowCategories(false)} onClick={() => goTo('/collections?brand')}>Brands</span>
                    <span className="menu" onMouseEnter={() => setShowCategories(false)} onClick={() => goTo('/collections?product-range')}>Product Ranges</span>
                    <span className="menu" onMouseEnter={() => setShowCategories(true)}>Categories <span className="square"></span></span>
                    <span className="menu" onMouseEnter={() => setShowCategories(false)} onClick={() => goTo('/products')}>All Products</span>
                </div>
                <div className="topUserArea loginCartbasis-3/12 text-right">
                    <div className="topUserArea__search">
                        <form action="">
                            <input type="search" placeholder="Search..." />
                            <i class="fa fa-search"><SearchIcon /></i>
                        </form>
                    </div>
                    <div className="topUserArea__login">
                        <a href='/'><SearchIcon /></a>
                    </div>
                    <div className="topUserArea__cart">
                        <a href='/'><SearchIcon /></a>
                    </div>
                </div>
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