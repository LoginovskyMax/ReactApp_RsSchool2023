export interface IProduct {
    brand: string;
    category: string;
    description: string;
    discountPercentage: number;
    id: number;
    images: string[];
    price: number;
    rating: number;
    stock: number;
    thumbnail: string;
    title: string;
  }

  export interface IResponse {
    limit:number;
    skip:number;
    total:number;
    products:IProduct[]
  }