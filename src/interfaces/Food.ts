export interface Food {
  id?: string;
  image: string;
  title: string;
  description: string;
  category: FoodCategory;
  price?: number;
  originalPrice?: number;
  createdAt?: Date;
  updatedAt?: Date;
}


export enum FoodCategory {
  Compost = 1,
  Donation = 2,
  Sale = 3,
}