import { useShopQuery } from "@shopify/hydrogen";
import gql from 'graphql-tag';
import { getMetafield } from "../../hooks/helper";
import NotFound from "../../components/NotFound.server";
import CollectionCard from "../../rs-components/CollectionCard.server";
import Layout from "../../rs-components/Layout.server";

export default function Collections(request) {

    const { data } = useShopQuery({
        query: QUERY,
        preload: true,
    });

    const type = request.search.replace('?', '')

    if (type != 'brand' && type != 'product-range') return <NotFound />

    const collections = data.collections.edges.filter(c => getMetafield(c.node.metafields, 'attributes', 'collectionType') == type);
    const categories = data.collections.edges.filter(c => getMetafield(c.node.metafields, 'attributes', 'collectionType') == 'category');

    return (
        <Layout categories={categories}>
            {/* the seo object will be expose in API version 2022-04 or later */}
            {/* <Seo type="collection" data={collection} /> */}
            <div class="container-line mt-28 mb-12">
                <h1 className="containerCollection__title text-center text-2xl">
                    {type == 'brand' ? 'Brands' : 'Product Ranges'}
                </h1>
            </div>
            <div
                className="text-lg"
            />
            <p className="text-sm text-gray-500 mt-5 mb-5">
            </p>
            <ul className="">
                <div className="ccontainerCollection__grid grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 gap-4 px-4 mb-28">
                    {collections.map(c => <CollectionCard collection={c.node} />)}
                </div>
            </ul>
        </Layout>
    )
}

const QUERY = gql`
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