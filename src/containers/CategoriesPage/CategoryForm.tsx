import React, {FormEvent} from 'react';
import {Category} from '../../types';
import {ButtonSpinner} from '../../components/Spinner/ButtonSpinner';
import {useAppSelector} from '../../redux/hooks';
import {selectCreateCategoryLoading, selectGetCategoryLoading} from '../../store/category/categorySlice';
import Spinner from '../../components/Spinner/Spinner';

interface Props {
  category: Category,
  onClose: React.MouseEventHandler;
  onSubmitHandler: (event: FormEvent) => void;
  changeCategory: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const CategoryForm: React.FC<Props> = ({category, onSubmitHandler, changeCategory, onClose}) => {
  const createLoading = useAppSelector(selectCreateCategoryLoading);
  const singleCategoryLoading = useAppSelector(selectGetCategoryLoading);

  if (singleCategoryLoading) {
    return <Spinner/>;
  }

  return (
    <form onSubmit={onSubmitHandler} className="grid grid-cols-1 my-5 gap-y-3">
      <div className="col-span-1">
        <label
          htmlFor="default-input"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Name category:
        </label>
        <input
          type="text"
          name="name"
          value={category.name}
          onChange={changeCategory}
          required
          className="outline-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
      </div>
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
          value={category.type}
          onChange={changeCategory}
          required
          className="outline-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value=""></option>
          <option value="Expanse">
            Expanse
          </option>
          <option value="Income">
            Income
          </option>
        </select>
      </div>
      <div className="flex justify-end gap-x-3">
        <button
          type='button'
          onClick={onClose}
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

export default CategoryForm;