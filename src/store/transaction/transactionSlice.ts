import {ResponseTransactions} from '../../types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {createTransaction, getTransactions} from './transactionThunk';
import {RootState} from '../../redux/store';

interface TransactionState {
  transactions: ResponseTransactions[];
  createTranLoading: boolean;
  getTransactionsLoading: boolean;
}

const initialState: TransactionState = {
  transactions: [],
  createTranLoading: false,
  getTransactionsLoading: false,
};

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createTransaction.pending, (state) => {
      state.getTransactionsLoading = false;
    });
    builder.addCase(createTransaction.fulfilled, (state) => {
      state.getTransactionsLoading = false;
    });
    builder.addCase(createTransaction.rejected, (state) => {
      state.getTransactionsLoading = false;
    });
    builder.addCase(getTransactions.pending, (state) => {
      state.getTransactionsLoading = false;
    });
    builder.addCase(getTransactions.fulfilled, (state, {payload: transactions}: PayloadAction<ResponseTransactions[]>) => {
      state.getTransactionsLoading = false;
      state.transactions = transactions;
    });
    builder.addCase(getTransactions.rejected, (state) => {
      state.getTransactionsLoading = false;
    });
  },
});

export const transactionReducer = transactionSlice.reducer;
export const selectCreateTranLoading = (state: RootState) => state.transaction.createTranLoading;
export const selectTransactions = (state: RootState) => state.transaction.transactions;
