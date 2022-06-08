import { useState, useEffect, Suspense } from 'react'
import useAxios from '../hooks/axios';
import CustomizeProduct from "../assets/icons/CustomizeProduct"
import ArrowDownIconDark from "../assets/icons/ArrowDownIconDark"
import SettingsIcon from "../assets/icons/SettingsIcon"



export default function ProductList({ productRange, brand, search, options }) {

    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [filter, setFilter] = useState({
        pagination: {
            page: 1,
            limit: 24
        },
        options: [],
        search: "",
        category: "",
        brand_handler: brand,
        product_range_handler: productRange,
        price_range: {
            low: options.low,
            high: options.high
        },
        sort: []
    });

    const { response, loading, error, execute } = useAxios({
        url: 'https://nazzq9i1k7.execute-api.us-east-1.amazonaws.com/rs-filter-api/product',
        method: 'post',
        headers: { store: 'websystem-m6beds-staging.myshopify.com' },
        data: filter
    });

    useEffect(() => {
        execute();
    }, [])

    useEffect(() => {
        setProducts(response?.result.result);
        setTotal(response?.result.result);
    }, [response])

    if (loading) return <h2>LOADING...</h2>
    else return (
        <>


        <div className="SectionProductTop">
            <div className="SectionProductTop__container">
                <div className="SectionProductTop__breadcrumb">
                    <a href="/" title="Home">Home</a><span aria-hidden="true">›</span><span>Dining Tables</span>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="SectionProductTop__category-name">
                         <h1>Category name</h1>
                    </div>
                    <div className="SectionProductTop__result">
                        <p><span>All Sofas  1-28</span>  of  236  Results</p>
                    </div>
                </div>                
            </div>
        </div>

            
        <div className="ProductList">
            <div className="ProductList__container">
                <div className="ProductList__filters grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="ProductList__left-section">
                            <div className='ProductList__filter--button'>
                            <button type="button">Filters <span><CustomizeProduct /></span></button>
                            </div>
                            <div className='ProductList__featured--dropdown'>
                                <button id="dropdownDefault" data-dropdown-toggle="dropdown" class="text-left inline-flex items-center" type="button">Featured <span><ArrowDownIconDark /></span></button>                    
                                <div id="dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700">
                                    <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault">
                                    <li>
                                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                                    </li>
                                    <li>
                                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                                    </li>
                                    <li>
                                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                                    </li>
                                    <li>
                                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
                                    </li>
                                    </ul>
                                </div>                            
                            </div>  
                    </div>

                    <div className="ProductList__right-section">
                        <div className="ProductList__customizable-button">
                            <div class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                                <input type="checkbox" name="toggle" id="toggle" class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white appearance-none cursor-pointer"/>
                                <label for="toggle" class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                            </div>
                            <label for="toggle">Customizable</label>
                        </div>
                        <div className="ProductList__clear-button">
                            <button type="button">Clear All </button>
                        </div>
                    </div>
                </div>

            
                <div className="ProductList__grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-2">
                   
                    <div className="ProductList__product-item">
                        <div className="ProductList__product-container">
                            <div className="ProductList__product-topSection">
                                <div className="ProductList__product-image">
                                    <img src="https://cdn.shopify.com/s/files/1/0600/3595/6902/files/img3.png" alt="" />
                                </div>
                            </div>
                            <div className="ProductList__product-bottomSection">
                                <div className="ProductList__product-description">
                                    <div className="ProductList__product-brand">
                                        <p><span>› </span>KARTELL®</p>
                                    </div>
                                    <div className="ProductList__product-range">
                                        <p><span>› </span>Canyon - Bedroom</p>
                                    </div>
                                    <div className="ProductList__product-title">
                                        <p>150 Standard Power Recliner Chair (Single Motor)</p>
                                    </div>
                                </div>
                                <div className="ProductList__price-section">
                                    <div className="ProductList__price">
                                        <p>£ 104 <span>- £ 572</span></p>
                                    </div>
                                    <div className="ProductList__customise" data-tooltip="Customise">
                                        <span><SettingsIcon /></span>
                                    </div>
                                </div>
                            </div>                            
                        </div>
                    </div>

                    <div className="ProductList__product-item">
                        <div className="ProductList__product-container">
                            <div className="ProductList__product-topSection">
                                <div className="ProductList__product-image">
                                    <img src="https://cdn.shopify.com/s/files/1/0600/3595/6902/files/img3.png" alt="" />
                                </div>
                            </div>
                            <div className="ProductList__product-bottomSection">
                                <div className="ProductList__product-description">
                                    <div className="ProductList__product-brand">
                                        <p><span>› </span>KARTELL®</p>
                                    </div>
                                    <div className="ProductList__product-range">
                                        <p><span>› </span>Canyon - Bedroom</p>
                                    </div>
                                    <div className="ProductList__product-title">
                                        <p>150 Standard Power Recliner Chair (Single Motor)</p>
                                    </div>
                                </div>
                                <div className="ProductList__price-section">
                                    <div className="ProductList__price">
                                        <p>£ 104 <span>- £ 572</span></p>
                                    </div>
                                    <div className="ProductList__customise" data-tooltip="Customise">
                                        <span><SettingsIcon /></span>
                                    </div>
                                </div>
                            </div>                            
                        </div>
                    </div>

                    <div className="ProductList__product-item">
                        <div className="ProductList__product-container">
                            <div className="ProductList__product-topSection">
                                <div className="ProductList__product-image">
                                    <img src="https://cdn.shopify.com/s/files/1/0600/3595/6902/files/img3.png" alt="" />
                                </div>
                            </div>
                            <div className="ProductList__product-bottomSection">
                                <div className="ProductList__product-description">
                                    <div className="ProductList__product-brand">
                                        <p><span>› </span>KARTELL®</p>
                                    </div>
                                    <div className="ProductList__product-range">
                                        <p><span>› </span>Canyon - Bedroom</p>
                                    </div>
                                    <div className="ProductList__product-title">
                                        <p>150 Standard Power Recliner Chair (Single Motor)</p>
                                    </div>
                                </div>
                                <div className="ProductList__price-section">
                                    <div className="ProductList__price">
                                        <p>£ 104 <span>- £ 572</span></p>
                                    </div>
                                    <div className="ProductList__customise" data-tooltip="Customise">
                                        <span><SettingsIcon /></span>
                                    </div>
                                </div>
                            </div>                            
                        </div>
                    </div>

                    <div className="ProductList__product-item">
                        <div className="ProductList__product-container">
                            <div className="ProductList__product-topSection">
                                <div className="ProductList__product-image">
                                    <img src="https://cdn.shopify.com/s/files/1/0600/3595/6902/files/img3.png" alt="" />
                                </div>
                            </div>
                            <div className="ProductList__product-bottomSection">
                                <div className="ProductList__product-description">
                                    <div className="ProductList__product-brand">
                                        <p><span>› </span>KARTELL®</p>
                                    </div>
                                    <div className="ProductList__product-range">
                                        <p><span>› </span>Canyon - Bedroom</p>
                                    </div>
                                    <div className="ProductList__product-title">
                                        <p>150 Standard Power Recliner Chair (Single Motor)</p>
                                    </div>
                                </div>
                                <div className="ProductList__price-section">
                                    <div className="ProductList__price">
                                        <p>£ 104 <span>- £ 572</span></p>
                                    </div>
                                    <div className="ProductList__customise" data-tooltip="Customise">
                                        <span><SettingsIcon /></span>
                                    </div>
                                </div>
                            </div>                            
                        </div>
                    </div>

                    <div className="ProductList__product-item">
                        <div className="ProductList__product-container">
                            <div className="ProductList__product-topSection">
                                <div className="ProductList__product-image">
                                    <img src="https://cdn.shopify.com/s/files/1/0600/3595/6902/files/img3.png" alt="" />
                                </div>
                            </div>
                            <div className="ProductList__product-bottomSection">
                                <div className="ProductList__product-description">
                                    <div className="ProductList__product-brand">
                                        <p><span>› </span>KARTELL®</p>
                                    </div>
                                    <div className="ProductList__product-range">
                                        <p><span>› </span>Canyon - Bedroom</p>
                                    </div>
                                    <div className="ProductList__product-title">
                                        <p>150 Standard Power Recliner Chair (Single Motor)</p>
                                    </div>
                                </div>
                                <div className="ProductList__price-section">
                                    <div className="ProductList__price">
                                        <p>£ 104 <span>- £ 572</span></p>
                                    </div>
                                    <div className="ProductList__customise" data-tooltip="Customise">
                                        <span><SettingsIcon /></span>
                                    </div>
                                </div>
                            </div>                            
                        </div>
                    </div>


                </div>
            </div>
        </div>


            <div>API DE FILTROS</div>
            <h2>Product Range:{productRange}</h2>
            <h2>Brand: {brand}</h2>
            <h2>Search: {search}</h2>

            <b>Products</b>
            <ul>
                {products?.map(p =>
                    <li>{p._source.title}</li>)}
            </ul>
        </>
    )
}