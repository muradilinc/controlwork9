import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {selectCategories} from '../../store/category/categorySlice';
import {Transaction} from '../../types';
import {createTransaction, getTransactions} from '../../store/transaction/transactionThunk';
import {useNavigate} from 'react-router-dom';
import {HOME_PAGE} from '../../constants/routes';
import {selectCreateTranLoading} from '../../store/transaction/transactionSlice';
import {ButtonSpinner} from '../../components/Spinner/ButtonSpinner';

const TransactionForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const createLoading = useAppSelector(selectCreateTranLoading);
  const [type, setType] = useState('');
  const [transaction, setTransaction] = useState<Transaction>({
    category: '',
    amount: 0,
    createdAd: '',
  });

  const filteredCategory = categories.filter(category => category.type.toLowerCase() === type.toLowerCase());

  const changeTransaction = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const {name, value} = event.target;

    setTransaction((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const createHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    const dataTransaction: Transaction = {
      ...transaction,
      createdAd: new Date().toString(),
    };
    await dispatch(createTransaction(dataTransaction));
    await dispatch(getTransactions());
    navigate(HOME_PAGE);
    setTransaction({
      category: '',
      amount: 0,
      createdAd: ''
    });
  };

  return (
    <form className="grid grid-cols-1 gap-y-3" onSubmit={createHandler}>
      <div className="col-span-1">
        <label
          htmlFor="categories"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Type
        </label>
        <select
          name="type"
          id="categories"
          required
          value={type}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setType(event.target.value)}
          className="outline-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value=""></option>
          <option value="Income">Income</option>
          <option value="Expanse">Expanse</option>
        </select>
      </div>
      <div className="col-span-1">
        <label
          htmlFor="categories"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Category
        </label>
        <select
          name="category"
          id="categories"
          required
          value={transaction.category}
          onChange={changeTransaction}
          disabled={type === ''}
          className="outline-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value=""></option>
          {
            filteredCategory.map((category) => <option value={category.id}>{category.name}</option>)
          }
        </select>
      </div>
      <div className="col-span-1">
        <label
          htmlFor="default-input"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Amount:
        </label>
        <div className="flex gap-x-3 items-center">
          <input
            type="number"
            name="amount"
            required
            value={transaction.amount}
            onChange={changeTransaction}
            className="outline-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <p className="border border-gray-300 p-2.5">KGS</p>
        </div>
      </div>
      <div className="flex justify-end gap-x-3">
        <button
          type='button'
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Cancel
        </button>
        {
          createLoading ?
            <ButtonSpinner color="bg-green-600"/>
            :
            <button
              type="submit"
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Save
            </button>
        }
      </div>
    </form>
  );
};

export default TransactionForm;