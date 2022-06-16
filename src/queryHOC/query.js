import React from 'react';
import Product from '../pages/products/product';
import App from '../App.js';
import { useQuery, gql } from "@apollo/client";
import ProductDetails from '../pages/product_details/product_details';
import './query.scss';
export const QueryProduct = (props) => {
  // getting param ID from query string
  let pathname = window.location.pathname.split('/')[1];

  // Graphql query to get products based on categories
  const ProductQuery = gql`
    {
        category(input: {title:"${pathname}"} ){
          name,
          products{
                  id,
                  name,
                  inStock,
                  category,
                  gallery,
                  brand,
                  attributes{
                                id,
                                name,
                                type,
                                items{
                                  id,
                                  value,
                                  displayValue
                                }
                              },
                  prices{ 
                  amount,
                  currency{
                      label,
                      symbol
                  }
                  }
              }
        }
      }
        `;
  const { loading, data } = useQuery(ProductQuery);
  return (
    loading ? <h2>loading ... </h2> : <Product data={data} />
  )
}


export const QueryProductDetails = (props) => {
  // getting product ID from query string
  let id = window.location.search.split('=')[1];

  // Graphql query to get product based on specified ID
  const ProductDetailsQuery = gql`
    {
        product(id: "${id}"){
            id,
            name,
            inStock,
            gallery,
            description,
            attributes{
              id,
              name,
              type,
              items{
                id,
                value,
                displayValue
              }
            },
            prices{
              currency{
                label,
                symbol
              },
              amount
            },
            brand
            
          }
      }
        `;
  const { loading, data } = useQuery(ProductDetailsQuery);
  return (
    loading ? <h2>loading ... </h2> : <ProductDetails data={data} />
  )
}

export const QueryCategories = (props) => {
  // Graphql query to get currencies
  const Categories = gql`
    {
     categories{
        name
        },
        currencies{
            label,
            symbol
          }
     }
        `;

  const { loading, data } = useQuery(Categories);
  return (
    loading ? <h2>loading ... </h2> : <App data={data} />
  )
}
