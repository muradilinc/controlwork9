import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../http/axiosApi';
import {ApiTransaction, ResponseTransactions, Transaction} from '../../types';

export const createTransaction = createAsyncThunk<void, Transaction>(
  'transaction/create',
  async (transaction) => {
    await axiosApi.post('/transactions.json', transaction);
  },
);

export const getTransactions = createAsyncThunk<ResponseTransactions[]>(
  'transaction/get',
  async () => {
    const responseTransactions = await axiosApi.get<ApiTransaction | null>('/transactions.json');
    const transactions = responseTransactions.data;

    if (!transactions){
      return [];
    }

    return await Promise.all(Object.entries(transactions).map(async ([id, item]) => {
      const responseCategory = await axiosApi.get(`/categories/${item.category}.json`);

      if (!responseCategory.data) {
        throw new Error('Not found!');
      }

      return {
        id,
        item,
        categoryType: responseCategory.data,
      };
    }));
  },
);