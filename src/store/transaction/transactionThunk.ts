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

export const getTransaction = createAsyncThunk<ResponseTransactions, string>(
  'transaction/getOne',
  async (id) => {
    const responseTran = await axiosApi.get<Transaction | null>(`/transactions/${id}.json`);
    if (!responseTran.data) {
      throw new Error('No found!');
    }

    const responseCategory = await axiosApi.get(`/categories/${responseTran.data.category}.json`);

    return {
      item: responseTran.data,
      id,
      categoryType: responseCategory.data,
    };
  }
);

interface updateTran {
  id: string,
  transaction: Transaction,
}

export const updateTransaction = createAsyncThunk<void, updateTran>(
  'transaction/update',
  async ({id, transaction}) => {
    await axiosApi.put(`/transactions/${id}.json`, transaction);
  }
);

export const deleteTransaction = createAsyncThunk<void, string>(
  'transaction/delete',
  async (id) => {
    await axiosApi.delete(`/transactions/${id}.json`);
  },
);