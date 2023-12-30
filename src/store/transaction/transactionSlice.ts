import {ResponseTransactions, Transaction} from '../../types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getTransactions} from './transactionThunk';
import {RootState} from '../../redux/store';

interface TransactionState {
  transactions: ResponseTransactions[];
  getTransactionsLoading: boolean;
}

const initialState: TransactionState = {
  transactions: [],
  getTransactionsLoading: false,
};

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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
export const selectTransactions = (state: RootState) => state.transaction.transactions;