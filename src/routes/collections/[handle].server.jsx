import { useShop, useShopQuery, flattenConnection, Seo, fetchSync, Link, Image } from '@shopify/hydrogen';
import gql from 'graphql-tag';
import ProductList from '../../rs-components/ProductList.client';
import LoadMoreProducts from '../../components/LoadMoreProducts.client';
import Layout from '../../rs-components/Layout.server';
import ProductCard from '../../components/ProductCard';
import NotFound from '../../components/NotFound.server';
import { getMetafield } from '../../hooks/helper';

export default function Collection({
  country = { isoCode: 'US' },
  collectionProductCount = 24,
  params,
}) {
  const { handle } = params;

  // product_type => Product Range
  // vendor => Brand

  const { data } = useShopQuery({
    query: QUERY,
    variables: {
      handle
    },
    preload: true,
  });

  const response = useShopQuery({
    query: QUERY_CATEGORIES,
    preload: true,
  });

  const categories = response.data.collections.edges.filter(c => getMetafield(c.node.metafields, 'attributes', 'collectionType') == 'category');


  // if (data?.collection == null) {
  //   return <NotFound />;
  // }

  const collection = data.collection;
  const colType = collection.metafield.value;
  // const products = flattenConnection(collection.products);
  // const hasNextPage = data.collection.products.pageInfo.hasNextPage;

  if (collection.metafield.value == 'product-range') {
    var options = fetchSync(`https://nazzq9i1k7.execute-api.us-east-1.amazonaws.com/rs-filter-api/option?search=&product_range_handler=${handle}`, {
      headers: {
        store: 'websystem-m6beds-staging.myshopify.com'
      }
    }).json();
  }

  if (collection.metafield.value == 'brand') {
    var options = fetchSync(`https://nazzq9i1k7.execute-api.us-east-1.amazonaws.com/rs-filter-api/option?search=&brand_handler=${handle}`, {
      headers: {
        store: 'websystem-m6beds-staging.myshopify.com'
      }
    }).json();

    // nasty-nasty
    var product_ranges = options.options.filter(o => o.field == 'product_range.title')[0].options.map(pr => pr.key.replaceAll(' ', '-').toLowerCase());
    var prCollections = []

    product_ranges.forEach((pr, i) => {
      const res = useShopQuery({
        query: QUERY,
        variables: {
          handle: pr
        },
        preload: true,
      })
      prCollections.push(res.data.collection)
    })
  }

  return (
    <Layout categories={categories}>

      {colType == 'product-range' ?
        <ProductList options={options} productRange={colType == 'product-range' ? handle : ""} brand={colType == 'brand' ? handle : ""} />
        :
        <>
          {/* the seo object will be expose in API version 2022-04 or later */}
          {/* <Seo type="collection" data={collection} /> */}
          <h1 className="font-bold text-4xl md:text-5xl text-gray-900 mb-6 mt-6">
            {collection.title}
          </h1>
          <h3>{colType}</h3>
          <h3>{JSON.stringify(product_ranges)}</h3>
          <div
            // dangerouslySetInnerHTML={{__html: collection.descriptionHtml}}
            className="text-lg"
          />
          <p className="text-sm text-gray-500 mt-5 mb-5">
            {/* {products.length} {products.length > 1 ? 'products' : 'product'} */}
          </p>
          {colType == 'brand' &&
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              <div className="containerCollection__grid flex flex-row flex-wrap justify-start gap-4 mt-10 p-8">
                {prCollections.map(c => <CollectionCard collection={c} />)}
              </div>
            </ul>
          }
        </>
      }
    </Layout>
  );
}

const imageLoader = ({ src }) => {
  return `${src}&width=${480}`
};

const CollectionCard = ({ collection }) => {
  return (
    <div className="containerCollection__item border-2 border-sky-900">
      <Link to={`/collections/${collection.handle}`}>
        <div className="containerCollection__imagen-container flex justify-center items-center">
          {collection.image
            ? <Image data={collection.image} loader={imageLoader} />
            : /*change no image*/ <img src="https://upload.wikimedia.org/wikipedia/commons/6/6c/No_image_3x4.svg" />
          }
        </div>
        <h3 className="containerCollection__name text-center text-2xl text-white bg-sky-900">{collection.title}</h3>
      </Link>
    </div>
  )
}

const QUERY = gql`
  query collection($handle: String!) {
    collection(handle: $handle) {
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
      metafield(namespace: "attributes", key: "collectionType") {
        value
      }
    }
  }`;

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