import { TProduct } from "@/componets/productList.componet";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import moment from "moment";

export interface Product {
  id: number;
  name: string;
  price: number;
  code: string;
  image: string;
  description: string;
  seller: string;
  type: string;
  stock: number;
  rent: {
    location?: string;
    id: number;
    type: string;
    typeRent: string;
  };
  date?: Date;
  hour?: string;
  quanty?: number;
}

export async function getProductList(productType: TProduct): Promise<Product[]> {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_URL_API, // Reemplaza con la URL de tu servidor GraphQL
    cache: new InMemoryCache(),
  });

  const query = gql`
    query {
      products {
        id
        name
        price
        seller
        image
        type
        stock
        rent {
          location
          id
          type
          typeRent
        }
      }
    }
  `;

  try {
    const response = await client.query({ query });
    const t = productType === "all" ? response.data.products : response.data.products.filter((data: Product) => data.type === productType);
    return t;
  } catch (error) {
    console.error("Error al obtener la lista de productos:", error);
    return [];
  }
}

export async function getProduct(id: number): Promise<Product | boolean> {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_URL_API, // Reemplaza con la URL de tu servidor GraphQL
    cache: new InMemoryCache(),
  });

  const query = gql`
    query {
      product(id:${id}) {
        id
        name
        price
        seller
        description
        code        
        image
        type
        stock
        rent{
           location
           id
           type
           typeRent          
        }
      }
    }
  `;

  try {
    const response = await client.query({ query });
    return response.data.product;
  } catch (error) {
    console.error("Error al obtener la lista de productos:", error);
    return false;
  }
}

export async function isAvailable(rentId: number, date: string): Promise<boolean> {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_URL_API, // Reemplaza con la URL de tu servidor GraphQL
    cache: new InMemoryCache(),
  });

  const query = gql`
    query {
      isAvailable(rentId:${rentId}, date:"${moment(date).format("YYYY-MM-DD")}") 
    }
  `;

  try {
    const response = await client.query({ query });
    return response.data.isAvailable;
  } catch (error) {
    console.error("Error al obtener la lista de productos:", error);
    return false;
  }
}
