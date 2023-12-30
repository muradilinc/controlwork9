import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../http/axiosApi';
import {ApiCategories, Category, ResponseCategory} from '../../types';

export const createCategory = createAsyncThunk<void, Category>(
  'category/create',
  async (category) => {
    await axiosApi.post('/categories.json', category);
  },
);

export const getCategories = createAsyncThunk<ResponseCategory[]>(
  'category/get',
  async () => {
    const response = await axiosApi.get<ApiCategories | null>('/categories.json');
    const categories = response.data;

    if (!categories) {
      return [];
    }

    return Object.keys(categories).map((key) => {
      const category = categories[key];
      return {
        ...category,
        id: key
      };
    });
  },
);

export const getCategory = createAsyncThunk<Category, string>(
  'category/getOne',
  async (id) => {
    const response = await axiosApi.get<Category | null>(`/categories/${id}.json`);
    const category = response.data;
    if (!category) {
      throw new Error('Not found!');
    }
    return category;
  },
);

interface updateCategory {
  id: string;
  category: Category;
}

export const updateCategory = createAsyncThunk<void, updateCategory>(
  'category/update',
  async ({id, category}) => {
    await axiosApi.put(`/categories/${id}.json`, category);
  },
);

export const deleteCategory = createAsyncThunk<void, string>(
  'category/delete',
  async (id) => {
    await axiosApi.delete(`/categories/${id}.json`);
  },
);