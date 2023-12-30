export interface Category {
  name: string;
  type: string;
}

export interface ApiCategories {
  [id: string]: Category;
}

export interface ResponseCategory extends Category {
  id: string;
}