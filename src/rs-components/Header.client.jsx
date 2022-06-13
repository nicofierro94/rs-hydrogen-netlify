import { useState } from 'react'
import { getMetafield } from "../hooks/helper";
import SearchIcon from "../assets/icons/SearchIcon"
import CartIcon from "../assets/icons/CartIcon"
import UserIcon from "../assets/icons/UserIcon"
import ArrowDownIconDark from "../assets/icons/ArrowDownIconDark"
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
            <div className="header flex flex-row items-center px-8">
                <div className="logo basis-3/12"><a href="/"><img src="https://cdn.shopify.com/s/files/1/0638/9193/1378/files/FurnitureKioskLogo_CMYK_360x_6965cea3-6657-4d0d-bb00-633c2a4c94b6_300x300.jpg" alt="" /></a></div>
                <div className="basis-6/12 text-center">
                    <span className="menu" onMouseEnter={() => setShowCategories(false)} onClick={() => goTo('/collections?brand')}>Brands</span>
                    <span className="menu" onMouseEnter={() => setShowCategories(false)} onClick={() => goTo('/collections?product-range')}>Product Ranges</span>
                    <span className="menu" onMouseEnter={() => setShowCategories(false)} onClick={() => goTo('/products')}>All Products</span>
                </div>
                <div className="topUserArea loginCart basis-3/12 text-right">
                    <div className="topUserArea__search-container">
                        <div className="topUserArea__search">
                            <form action="">
                                <input type="search" placeholder="Search..." />
                                <i class="fa fa-search"><SearchIcon /></i>
                            </form>
                        </div>
                    </div>
                    <div className="topUserArea__login">
                        <a href='/'><UserIcon /></a>
                    </div>
                    <div className="topUserArea__cart">
                        <a href='/'><CartIcon /></a>
                    </div>
                </div>
            </div>
            <div className="topNavBar">
                <div className="topNavBar__container">
                    <ul class="site-nav list--inline" id="SiteNav">
                                     
                        <li class="site-nav__item site-nav--active rs-type-category " aria-haspopup="true">
                            <a href="/" class="site-nav__link site-nav__link-toggle" id="#" onclick="#" aria-controls="#" aria-expanded="false" aria-current="page" onmouseover="#">
                                CATEGORY
                                <span className="menu-icon-arrow-down">
                                    <ArrowDownIconDark />
                                </span>
                            </a>

                            <div class="site-nav__dropdown meganav site-nav__dropdown--second-level" id="#" aria-labelledby="#" role="navigation">
                                <ul class="meganav__nav page-width">
                                    <div class="grid meganav__scroller--has-list">
                                        <div class="grid__item meganav__list">


                                            <li class="site-nav__dropdown-container rs-type-category">
                                                <a href="#" onclick="#" class="meganav__link meganav__link--second-level meganav__link-toggle site-nav__link-toggle meganav__link--has-list meganav__link--active" id="#" aria-controls="#" aria-expanded="false" aria-current="page">
                                                    SEGUNDO NIVEL
                                                </a>
                                                <ul class="meganav__list meganav__list--gutter">
                                                    <li class="site-nav__dropdown-container site-nav__dropdown-container--third-level rs-type-category">
                                                        <a href="#" class="meganav__link meganav__link--third-level">
                                                            TERCER NIVEL
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>

                                            <li class="site-nav__dropdown-container rs-type-category">
                                                <a href="/collections/sofas-by-size" onclick="#" class="meganav__link meganav__link--second-level meganav__link-toggle site-nav__link-toggle meganav__link--has-list meganav__link--active" id="#" aria-controls="#" aria-expanded="false" aria-current="page">
                                                    SEGUNDO NIVEL
                                                </a>

                                                <ul class="meganav__list meganav__list--gutter">


                                                    <li class="site-nav__dropdown-container site-nav__dropdown-container--third-level rs-type-category">
                                                        <a href="/collections/2-seater" class="meganav__link meganav__link--third-level">
                                                            TERCER NIVEL
                                                        </a>
                                                    </li>

                                                </ul>
                                            </li>


                                        </div>
                                    </div>
                                </ul>
                            </div>
                        </li>
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