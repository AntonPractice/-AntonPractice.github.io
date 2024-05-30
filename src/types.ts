interface Product {
  price?: number;
  id?: string;
  name?: string;
  image?: string;
  description?: string;
}
interface IProfile {
  id?: string;
  name?: string;
  password?: string;
}
export type Products = Product[];
export type Profiles = IProfile[];
