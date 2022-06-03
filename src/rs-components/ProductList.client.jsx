import { useState, useEffect, Suspense } from 'react'
import useAxios from '../hooks/axios';

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