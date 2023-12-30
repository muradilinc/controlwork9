import React, {FormEvent, useEffect, useState} from 'react';
import Modal from '../../components/Modal/Modal';
import {Category} from '../../types';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {createCategory, getCategories, updateCategory} from '../../store/category/categoryThunk';
import CategoryForm from './CategoryForm';
import {selectCategory, selectGetCategoriesLoading} from '../../store/category/categorySlice';
import CategoryView from '../../components/CategoryView/CategoryView';
import Spinner from '../../components/Spinner/Spinner';

const CategoriesPage = () => {
  const dispatch = useAppDispatch();
  const singleCategory = useAppSelector(selectCategory);
  const allCategoryLoading = useAppSelector(selectGetCategoriesLoading);
  const [isEdit, setEdit] = useState(false);
  const [idCategory, setIdCategory] = useState('');
  const [category, setCategory] = useState<Category>({
    name: '',
    type: '',
  });
  const [modal, setModal] = useState(false);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const changeCategory = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = event.target;
    setCategory(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (event: FormEvent) => {
    event.preventDefault();
    if (isEdit) {
      await dispatch(updateCategory({id: idCategory, category}));
    } else {
      await dispatch(createCategory(category));
    }
    await dispatch(getCategories());
    setModal(false);
    setCategory({
      name: '',
      type: '',
    });
  };

  useEffect(() => {
    if (singleCategory){
      setCategory(singleCategory);
    }
  }, [singleCategory]);

  const ModalHandler = () => {
    setModal(prevState => !prevState);
    setCategory({
      name: '',
      type: '',
    });
  };

  return (
    <div className="flex flex-col gap-y-5">
      <div className="border-b-2 flex items-center justify-between pb-3">
        <h2 className="text-2xl">Categories</h2>
        <button
          className="focus:outline-none capitalize text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          onClick={ModalHandler}
        >
          add
        </button>
      </div>
      {
        allCategoryLoading ?
          <Spinner/>
          :
          <CategoryView
            setIdCategory={setIdCategory}
            setModal={setModal}
            setEdit={setEdit}
          />
      }
      <Modal
        title={'Category'} 
        show={modal} 
        onClose={ModalHandler}
      >
        <CategoryForm
          category={category}
          changeCategory={changeCategory}
          onSubmitHandler={onSubmitHandler}
          onClose={() => setModal(false)}
        />
      </Modal>
    </div>
  );
};

export default CategoriesPage;