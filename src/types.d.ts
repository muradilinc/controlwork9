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

export interface Transaction {
  category: string;
  amount: number;
  createdAd: string;
}

export interface ApiTransaction {
  [id: string]: Transaction;
}

export interface ResponseTransactions {
  id: string;
  item: Transaction;
  categoryType: Category;
}