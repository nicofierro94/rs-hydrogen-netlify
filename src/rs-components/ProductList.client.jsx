import { useState, useEffect, Suspense } from 'react'
import useAxios from '../hooks/axios';
import CustomizeProduct from "../assets/icons/CustomizeProduct"
import ArrowDownIconDark from "../assets/icons/ArrowDownIconDark"
import SettingsIcon from "../assets/icons/SettingsIcon"
import FilterModal from "./FilterModal.client"


export default function ProductList({ productRange, brand, category, search, options, name }) {

    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [showFilter, setShowFilter] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [dropValue, setDropValue] = useState('option 1');
    const [optionFilters, setOptionFilters] = useState();
    const [breadcrumb, setBreadcrumb] = useState();
    const [filter, setFilter] = useState({
        pagination: {
            page: 1,
            limit: 24
        },
        options: [],
        search: search,
        category: category,
        brand_handler: brand,
        product_range_handler: productRange,
        price_range: {
            low: options.low,
            high: options.high
        },
        sort: []
    });

    useEffect(() => {
        try {
            setBreadcrumb(JSON.parse(localStorage.bdcb));
        }
        catch {
            setBreadcrumb(undefined);
        }
    }, [])

    useEffect(() => {
        console.log(breadcrumb);
    }, [breadcrumb])

    const dropDownValues = () => ['option 1', 'option 2', 'option 3', 'option 4']

    const updateFilter = (updatedFilter) => {
        setFilter(updatedFilter);
        execute(updatedFilter);
    }

    const clickFilter = () => {
        if (showFilter == true) hideModal();
        else {
            // document.body.style.overflow = 'hidden';
            setShowFilter(true);
        }
    }

    const hideModal = () => {
        // document.body.style.overflow = 'unset';
        setShowFilter(false);
    }

    const { response, loading, error, execute } = useAxios({
        url: 'https://nazzq9i1k7.execute-api.us-east-1.amazonaws.com/rs-filter-api/product',
        method: 'post',
        headers: { store: 'websystem-m6beds-staging.myshopify.com' },
        data: filter
    });

    const handleScroll = (e) => {
        if (window.innerHeight + e.target.documentElement.scrollTop + 1 >= e.target.documentElement.scrollHeight) {
            const newFilter = filter;
            newFilter.pagination.page = newFilter.pagination.page + 1;
            setFilter(newFilter);
            execute(newFilter);
        }
    }

    useEffect(() => {
        execute(filter);
        window.addEventListener("scroll", handleScroll);
    }, [])

    useEffect(() => {
        if (response) {
            if (filter.pagination.page == 1) {
                setProducts(response?.result.result);
            }
            else {
                const pp = products;
                response?.result.result.forEach(p => pp.push(p))
                setProducts(pp);
            }
            setTotal(response?.total);
            setOptionFilters(response?.options_filters);
        }
    }, [response])

    const onSelect = (value) => {
        setDropValue(value);
        setShowDropdown(false);
    }

    if (loading) return <h2>LOADING...</h2>
    else return (
        <>
            <div className="SectionProductTop">
                <div className="SectionProductTop__container">
                    <div className="SectionProductTop__breadcrumb">
                        <a href="/" title="Home">Home</a>
                        {breadcrumb?.map(bc =>
                            <><span aria-hidden="true">›</span><a href={`/collections/${bc.handle}`} title="Home">{bc.label}</a></>
                        )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="SectionProductTop__category-name">
                            <h1>{name}</h1>
                        </div>
                        <div className="SectionProductTop__result">
                            <p><span>All Sofas  1-28 (TODO)</span>  of  {total}  Results</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="ProductList">
                <div className="ProductList__container">
                    <div className="ProductList__filters grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="ProductList__left-section">
                            <div className='ProductList__filter--button'>
                                <button type="button" onClick={clickFilter}>Filters <span><CustomizeProduct /></span></button>
                            </div>
                            <div className='ProductList__featured--dropdown'>
                                <button id="dropdownDefault" data-dropdown-toggle="dropdown" className="text-left inline-flex items-center" type="button" onClick={() => setShowDropdown(!showDropdown)}>{dropValue} <span><ArrowDownIconDark /></span></button>
                                <div id="dropdown" className={`z-10 ${!showDropdown && 'hidden'} bg-white divide-y divide-gray-100 rounded dark:bg-gray-700`}>
                                    <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault">
                                        {dropDownValues().map((v, i) =>
                                            <li key={i}>
                                                <a key={i} href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => onSelect(v)}>{v}</a>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {showFilter == false &&
                            <div className="ProductList__right-section">
                                <div className="ProductList__customizable-button">
                                    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                                        <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white appearance-none cursor-pointer" />
                                        <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                                    </div>
                                    <label htmlFor="toggle">Customizable</label>
                                </div>
                                <div className="ProductList__clear-button">
                                    <button type="button">Clear All </button>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="ProductList__products-area">
                        <div className={`ProductList__grid ${showFilter && 'openModal'} flex mb-2`}>
                            {products?.map((p, i) =>
                                <a key={i} href={`/products/${p._source.handle}`}>
                                    <ProductItem key={i} product={p._source} />
                                </a>
                            )}
                        </div>

                        <FilterModal show={showFilter} close={hideModal} options={optionFilters?.options} filter={filter} updateFilter={updateFilter} />
                    </div>
                </div>
            </div>
        </>
    )
}


const ProductItem = ({ product }) => {
    return (
        <div className="ProductList__product-item">
            <div className="ProductList__product-container">
                <div className="ProductList__product-topSection">
                    <div class="ProductList__card-section-top">
                        <div class="card-stock">
                            <p class="label-top red-label sale-label">Sale</p>
                            <p class="label-top red-label clearance-label">Clearance</p>
                            <p class="label-top red-label specialoffer-label">Special Offer</p>
                            <p class="label-top red-label holiday-label">Holiday Savings</p>
                        </div>
                    </div>
                    <div className="ProductList__product-image">
                        <img src={product.images[0]} alt="" />
                    </div>
                </div>
                <div className="ProductList__product-bottomSection">
                    <div className="ProductList__product-description">
                        <div class="down-section-card">
                            <p class="label-bottom grey-label newarrival-label">New Arrival</p>
                            <p class="label-bottom grey-label stock-label">In Stock</p>
                        </div>
                        <div className="ProductList__product-brand">
                            <p><span>› </span>{product?.brand.title}</p>
                        </div>
                        <div className="ProductList__product-range">
                            <p><span>› </span>{product?.product_range.title}</p>
                        </div>
                        <div className="ProductList__product-title">
                            <p>{product?.title}</p>
                        </div>
                    </div>
                    <div className="ProductList__price-section">
                        <div className="ProductList__price">
                            {product?.fromPrice == product?.toPrice ?
                                <p>£ {product?.fromPrice}</p>
                                :
                                <p>£ {product?.fromPrice} <span>- £ {product?.toPrice}</span></p>
                            }
                        </div>
                        <div className="ProductList__customise" data-tooltip="Customise">
                            {product?.hasoptions && <span><SettingsIcon /></span>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}