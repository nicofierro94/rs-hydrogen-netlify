import { useShop, useShopQuery, Seo, useRouteParams } from '@shopify/hydrogen';
import gql from 'graphql-tag';
import ProductDetails from '../../rs-components/ProductDetails.client';
import NotFound from '../../components/NotFound.server';
import Layout from '../../rs-components/Layout.client';
import { getMetafield } from '../../hooks/helper';

export default function Product({ country = { isoCode: 'US' } }) {
  const { handle } = useRouteParams();
  const { languageCode } = useShop();

  const {
    data: { product },
  } = useShopQuery({
    query: QUERY,
    variables: {
      country: country.isoCode,
      language: languageCode,
      handle,
    },
    preload: true,
  });

  const response = useShopQuery({
    query: QUERY_CATEGORIES,
    preload: true,
  });

  const categories = response.data.collections.edges.filter(c => getMetafield(c.node.metafields, 'attributes', 'collectionType') == 'category');

  if (!product) {
    return <NotFound />;
  }
  else {
    const breadcrumb = product.metafields.edges.filter(m => m.node.namespace == "breadcrumb");
    const brandId = breadcrumb.filter(b => b.node.key == "brandId");
    const productRangeId = breadcrumb.filter(b => b.node.key == "productRangeId");
  }

  return (
    <>
      <Layout categories={categories}>
        <Seo type="product" data={product} />
        <ProductDetails product={product} />
      </Layout>
    </>
  );
}

const QUERY = gql`
  query product(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
  ) @inContext(country: $country, language: $language) {
    product: product(handle: $handle) {
      compareAtPriceRange {
        maxVariantPrice {
          currencyCode
          amount
        }
        minVariantPrice {
          currencyCode
          amount
        }
      }
      description
      descriptionHtml
      featuredImage {
        url
        width
        height
        altText
      }
      handle
      id
      media(first: 6) {
        edges {
          node {
            ... on MediaImage {
              mediaContentType
              image {
                id
                url
                altText
                width
                height
              }
            }
            ... on Video {
              mediaContentType
              id
              previewImage {
                url
              }
              sources {
                mimeType
                url
              }
            }
            ... on ExternalVideo {
              mediaContentType
              id
              embedUrl
              host
            }
            ... on Model3d {
              mediaContentType
              id
              alt
              mediaContentType
              previewImage {
                url
              }
              sources {
                url
              }
            }
          }
        }
      }
      metafields(first: 20) {
        edges {
          node {
            id
            type
            namespace
            key
            value
            createdAt
            updatedAt
            description
            reference {
              __typename
              ... on MediaImage {
                id
                mediaContentType
                image {
                  id
                  url
                  altText
                  width
                  height
                }
              }
            }
          }
        }
      }
      priceRange {
        maxVariantPrice {
          currencyCode
          amount
        }
        minVariantPrice {
          currencyCode
          amount
        }
      }
      seo {
        description
        title
      }
      title
      variants(first: 250) {
        edges {
          node {
            availableForSale
            compareAtPriceV2 {
              amount
              currencyCode
            }
            id
            image {
              id
              url
              altText
              width
              height
            }
            metafields(first: 10) {
              edges {
                node {
                  id
                  type
                  namespace
                  key
                  value
                  createdAt
                  updatedAt
                  description
                  reference {
                    __typename
                    ... on MediaImage {
                      id
                      mediaContentType
                      image {
                        id
                        url
                        altText
                        width
                        height
                      }
                    }
                  }
                }
              }
            }
            priceV2 {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
            sku
            title
            unitPrice {
              amount
              currencyCode
            }
            unitPriceMeasurement {
              measuredType
              quantityUnit
              quantityValue
              referenceUnit
              referenceValue
            }
          }
        }
      }
      vendor
      productType
    }
  }
`;

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
