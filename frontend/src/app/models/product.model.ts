import { User } from './user.model';
import { Category } from './category.model';

export class Product {
  constructor(
    public _id: string,
    public category: Category,
    public user: User,
    public title: string,
    public description: string,
    public price: number,
    public image: string,
  ) {}
}

export interface ProductData {
  [key: string]: any;
  category: string;
  title: string;
  description: string;
  price: number;
  image: File;
}

