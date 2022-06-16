import { useState } from 'react'
import { getMetafield } from "../hooks/helper";
import SearchIcon from "../assets/icons/SearchIcon"
import CartIcon from "../assets/icons/CartIcon"
import UserIcon from "../assets/icons/UserIcon"
import ArrowDownIconDark from "../assets/icons/ArrowDownIconDark"
import { useNavigate } from "@shopify/hydrogen/client"
import CartToggle from '../components/CartToggle.client';

export default function Header({ categories }) {

    const [showCategory, setShowCategory] = useState('');

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

    const goToCategory = (handle, breadcrumb) => {
        localStorage.bdcb = JSON.stringify(breadcrumb);
        nav(`/collections/${handle}`)
    }

    const onHover = (handle) => {
        setShowCategory(handle)
    }

    return (
        <div onMouseLeave={() => setShowCategory(false)}>
            <div className="header flex flex-row items-center px-8">
                <div className="logo basis-3/12"><a href="/"><img src="https://cdn.shopify.com/s/files/1/0638/9193/1378/files/FurnitureKioskLogo_CMYK_360x_6965cea3-6657-4d0d-bb00-633c2a4c94b6_300x300.jpg" alt="" /></a></div>
                <div className="basis-6/12 text-center">
                    <span className="menu" onMouseEnter={() => setShowCategory(false)} onClick={() => goTo('/collections?brand')}>Brands</span>
                    <span className="menu" onMouseEnter={() => setShowCategory(false)} onClick={() => goTo('/collections?product-range')}>Product Ranges</span>
                    <span className="menu" onMouseEnter={() => setShowCategory(false)} onClick={() => goTo('/products')}>All Products</span>
                </div>
                <div className="topUserArea loginCart basis-3/12 text-right">
                    <div className="topUserArea__search-container">
                        <div className="topUserArea__search">
                            <form action={`/products`} method="GET">
                                <input name="search" type="search" placeholder="Search..." />
                                <i class="fa fa-search"><SearchIcon /></i>
                            </form>
                        </div>
                    </div>
                    <div className="topUserArea__login">
                        <a href='/'><UserIcon /></a>
                    </div>
                    <div className="topUserArea__cart">
                        {/* <a href='/'><CartIcon /></a> */}
                        <CartToggle
                            handleClick={() => {
                                if (isMobileNavOpen) setIsMobileNavOpen(false);
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="topNavBar">
                <div className="topNavBar__container">
                    <ul class="site-nav list--inline" id="SiteNav">

                        {parentCategories.map(pc => {
                            let subCategories = getMetafield(pc.node.metafields, 'attributes', 'subCategories') ?? false
                            subCategories = JSON.parse(subCategories);
                            return (
                                <li class="site-nav__item site-nav--active rs-type-category inline-block" aria-haspopup="true">
                                    <a onMouseEnter={() => onHover(pc.node.handle)} href="" onClick={() => goToCategory(pc.node.handle, [{ label: pc.node.title, handle: pc.node.handle }])} class="site-nav__link site-nav__link-toggle" id="#" onclick="#" aria-controls="#" aria-expanded="false" aria-current="page" onmouseover="#">
                                        {pc.node.title}
                                        {subCategories &&
                                            <span className="menu-icon-arrow-down">
                                                <ArrowDownIconDark />
                                            </span>
                                        }
                                    </a>
                                    {subCategories &&
                                        <div class={`site-nav__dropdown meganav site-nav__dropdown--second-level ${pc.node.handle != showCategory && 'hidden'}`} id="#" aria-labelledby="#" role="navigation">
                                            <ul class="meganav__nav page-width">
                                                <div class="grid meganav__scroller--has-list">
                                                    <div class="grid__item meganav__list">
                                                        {subCategories.map(sc => {
                                                            const subCategory = categories.find(c => c.node.handle == sc)
                                                            let subSubCategories = getMetafield(subCategory.node.metafields, 'attributes', 'subCategories') ?? false
                                                            return (
                                                                <li class="site-nav__dropdown-container rs-type-category">
                                                                    <a href="" onClick={() => goToCategory(sc, [{ label: pc.node.title, handle: pc.node.handle }, { label: subCategory.node.title, handle: sc }])} class="meganav__link meganav__link--second-level meganav__link-toggle site-nav__link-toggle meganav__link--has-list meganav__link--active" id="#" aria-controls="#" aria-expanded="false" aria-current="page">
                                                                        {subCategory.node.title}
                                                                    </a>
                                                                    {subSubCategories &&
                                                                        <ul class="meganav__list meganav__list--gutter">
                                                                            {subSubCategories.map(ssc => {
                                                                                const subSubCategory = categories.find(c => c.node.handle == ssc);
                                                                                return (
                                                                                    <li class="site-nav__dropdown-container site-nav__dropdown-container--third-level rs-type-category">
                                                                                        <a href="" onClick={() => goToCategory(ssc, [{ label: pc.node.title, handle: pc.node.handle }, { label: subCategory.node.title, handle: sc }, { label: subSubCategory.node.title, handle: ssc }])} class="meganav__link meganav__link--third-level">
                                                                                            {subSubCategory.node.title}
                                                                                        </a>
                                                                                    </li>
                                                                                )
                                                                            })}
                                                                        </ul>
                                                                    }
                                                                </li>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                            </ul>
                                        </div>
                                    }
                                </li>
                            )
                        }
                        )}
                    </ul>
                </div>
            </div >


            {/*showCategories &&
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
                */}
        </div >
    )
}