export interface Product {
  id: number;
  name: string;
  reference: string;
  description: string;
  price: number;
  variations: Variation[];
}

export interface ProductItem {
  id: number;
  name: string;
  reference: string;
  description: string;
  price: number;
  variations: number;
}

export interface Variation {
  id: number;
  product_id: number;
  reference: string;
  description: string;
  price: number;
}

export interface VariationForm {
  product_id: number;
  reference: string;
  description: string;
  price: number;
}

export interface ProductForm {
  name: string;
  reference: string;
  description: string;
  price: number;
  variations: Variation[];
}

export interface ProductPostRequest {
  data: Product;
}

export interface ProductVariantPostRequest {
  data: Variation;
}
