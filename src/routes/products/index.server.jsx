import Layout from "../../rs-components/Layout.server";
import { useShopQuery, fetchSync } from '@shopify/hydrogen';
import gql from 'graphql-tag';
import { getMetafield } from "../../hooks/helper";
import ProductList from "../../rs-components/ProductList.client";

export default function Products() {

    const response = useShopQuery({
        query: QUERY_CATEGORIES,
        preload: true,
    });

    var options = fetchSync(`https://nazzq9i1k7.execute-api.us-east-1.amazonaws.com/rs-filter-api/option`, {
        headers: {
            store: 'websystem-m6beds-staging.myshopify.com'
        }
    }).json();

    const categories = response.data.collections.edges.filter(c => getMetafield(c.node.metafields, 'attributes', 'collectionType') == 'category');
    return (
        <Layout categories={categories}>
            <ProductList options={options} name={'All Products'}/>
        </Layout>
    )
}

const QUERY_CATEGORIES = gql`
query collections {
    collections(first: 250) {
      edges {
        node {
          title
          id
          handle
          image {
            id
            url
            altText
            width
            height
          }
          metafields(first: 100){
              edges {
                  node{ 
                      value
                      key
                      namespace
                  }
              }
          }
        }
      }
    }
  }
`;