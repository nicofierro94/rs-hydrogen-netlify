import Layout from "../rs-components/Layout.server";
import gql from 'graphql-tag';
import { Link, useShopQuery, Image, CacheDays, Seo } from "@shopify/hydrogen";

export default function Index() {
    const { data } = useShopQuery({
        query: QUERY,
        preload: true,
    });
    const brands = data.collections.edges.filter(c => c.node.metafield.value == 'brand');
    const productRanges = data.collections.edges.filter(c => c.node.metafield.value == 'product-range');
    return (
        <Layout>
            <SeoForHomepage />
            <div className="containerHero flex justify-center items-center">
                <div className="containerHero__textArea">
                    <h1 className="containerHero__title text-center text-white px-3">Tots to Teens Furniture</h1>
                    <p className="containerHero__description text-2xl text-center text-white px-3">Raleigh's largest selection of baby & kids furniture!</p>
                </div>
            </div>

            <div className="containerCollection Brands">
                <div className="container-line mt-28 mb-12">
                     <h2 className="containerCollection__title text-center text-2xl">BRANDS</h2>
                </div>
                <div className="containerCollection__grid grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 gap-4 px-4 mb-28">                    
                    {brands.map(c => <Collection collection={c} />)}
                </div>
            </div>

            <div className="containerCollection productRange">
                <div className="container-line mt-28 mb-12">
                    <h2 className="containerCollection__title text-center text-2xl">PRODUCT RANGES</h2>
                </div>
                <div className="containerCollection__grid grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 gap-4 px-4 mb-28">
                    {productRanges.map(c => <Collection collection={c} />)}
                </div>
            </div>           
        </Layout>
    )
}

const imageLoader = ({ src }) => {
    return `${src}&width=${480}`
};

const Collection = ({ collection }) => {
    return (
        <div className="containerCollection__item border-2">
            <Link to={`/collections/${collection.node.handle}`}>
                <div className="containerCollection__imagen-container flex justify-center items-center">
                    {collection.node.image
                        ? <Image data={collection.node.image} loader={imageLoader} />
                        : /*change no image*/ <img src="https://upload.wikimedia.org/wikipedia/commons/6/6c/No_image_3x4.svg" />
                    }
                </div>
                <h3 className="containerCollection__name text-center text-white">{collection.node.title}</h3>
            </Link>
        </div>
    )
}

function SeoForHomepage() {
    const {
        data: {
            shop: { title, description },
        },
    } = useShopQuery({
        query: SEO_QUERY,
        cache: CacheDays(),
        preload: true,
    });

    return (
        <Seo
            type="homepage"
            data={{
                title,
                description,
            }}
        />
    );
}

const SEO_QUERY = gql`
  query homeShopInfo {
    shop {
      description
    }
  }
`;

const QUERY = gql`
query brand {
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
          metafield(namespace: "attributes", key: "collectionType") {
            value
          }
        }
      }
    }
  }
`;