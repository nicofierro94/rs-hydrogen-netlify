import Layout from "../components/Layout.server";
import gql from 'graphql-tag';
import { Link, useShopQuery } from "@shopify/hydrogen";

export default function HomeTest() {
    const { data } = useShopQuery({
        query: QUERY,
        preload: true,
    });
    const brands = data.collections.edges.filter(c => c.node.metafield.value == 'brand');
    const productRanges = data.collections.edges.filter(c => c.node.metafield.value == 'product-range');
    return (
        <Layout>
            <div className="containerHero flex justify-center items-center">
                <div className="containerHero__textArea">
                    <h1 className="containerHero__title text-center text-white">Tots to Teens Furniture</h1>
                    <p className="containerHero__description text-2xl text-center text-white">Raleigh's largest selection of baby & kids furniture!</p>
                </div>
            </div>

            <div className="containerCollection">
                <h2 className="containerCollection__title text-center text-3xl mt-20">BRANDS</h2>
                <div className="containerCollection__grid flex flex-row flex-wrap justify-start gap-4 mt-10 p-8">
                    {brands.map(c => <Collection collection={c} />)}
                </div>
            </div>

            <div className="containerCollection">
                <h2 className="containerCollection__title text-center text-3xl mt-20">PRODUCT RANGES</h2>
                <div className="containerCollection__grid flex flex-row flex-wrap justify-start gap-4 mt-10 p-8">
                    {productRanges.map(c => <Collection collection={c} />)}
                </div>
            </div>

            <div className="container">
                <div className="grid grid-cols-1 sm:grid-cols-2">
                    <div>
                        lg:w-1/2 sm:1/4
                    </div>
                    <div>
                        lg:w-1/2 sm:1/4
                    </div>

                </div>
            </div>
        </Layout>
    )
}

const Collection = ({ collection }) => {
    return (
        <div className="containerCollection__item border-2 border-sky-900">
            <Link to={`/collections/${collection.node.handle}`}>
                <div className="containerCollection__imagen-container flex justify-center items-center">
                    <img className="containerCollection__image" src={collection.node.image ? collection.node.image.url : 'https://upload.wikimedia.org/wikipedia/commons/6/6c/No_image_3x4.svg'} alt="" />
                </div>
                <h3 className="containerCollection__name text-center text-2xl text-white bg-sky-900">{collection.node.title}</h3>
            </Link>
        </div>
    )
}

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
          }
          metafield(namespace: "attributes", key: "collectionType") {
            value
          }
        }
      }
    }
  }
`;