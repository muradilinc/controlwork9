import {ResponseTransactions} from '../../types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {createTransaction, getTransaction, getTransactions} from './transactionThunk';
import {RootState} from '../../redux/store';

interface TransactionState {
  transactions: ResponseTransactions[];
  singleTran: ResponseTransactions | null;
  createTranLoading: boolean;
  getTransactionsLoading: boolean;
  getOneTransactionLoading: boolean;
}

const initialState: TransactionState = {
  transactions: [],
  singleTran: null,
  createTranLoading: false,
  getTransactionsLoading: false,
  getOneTransactionLoading: false,
};

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createTransaction.pending, (state) => {
      state.createTranLoading = true;
    });
    builder.addCase(createTransaction.fulfilled, (state) => {
      state.createTranLoading = false;
    });
    builder.addCase(createTransaction.rejected, (state) => {
      state.createTranLoading = false;
    });
    builder.addCase(getTransactions.pending, (state) => {
      state.getTransactionsLoading = true;
    });
    builder.addCase(getTransactions.fulfilled, (state, {payload: transactions}: PayloadAction<ResponseTransactions[]>) => {
      state.getTransactionsLoading = false;
      state.transactions = transactions.sort((firstItem, secondItem) => {
        const dateFirstItem = new Date(firstItem.item.createdAd);
        const dateSecondItem = new Date(secondItem.item.createdAd);
        return Number(dateSecondItem) - Number(dateFirstItem);
      });
    });
    builder.addCase(getTransactions.rejected, (state) => {
      state.getTransactionsLoading = false;
    });
    builder.addCase(getTransaction.pending, (state) => {
      state.getOneTransactionLoading = true;
    });
    builder.addCase(getTransaction.fulfilled, (state, {payload: transaction}: PayloadAction<ResponseTransactions>) => {
      state.getOneTransactionLoading = false;
      state.singleTran = transaction;
    });
    builder.addCase(getTransaction.rejected, (state) => {
      state.getOneTransactionLoading = false;
    });
  },
});

export const transactionReducer = transactionSlice.reducer;
export const selectTransactions = (state: RootState) => state.transaction.transactions;
export const selectTransaction = (state: RootState) => state.transaction.singleTran;
export const selectCreateTranLoading = (state: RootState) => state.transaction.createTranLoading;
export const selectGetTransLoading = (state: RootState) => state.transaction.getTransactionsLoading;