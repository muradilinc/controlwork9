import React from 'react';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {selectCategories} from '../../store/category/categorySlice';
import {deleteCategory, getCategories, getCategory} from '../../store/category/categoryThunk';
import CategoryItemMemoed from './CategoryItemMemoed';

interface Props {
  setIdCategory: (id: string) => void;
  setEdit: (status: boolean) => void;
  setModal: (status: boolean) => void;
}

const CategoryView: React.FC<Props> = ({setIdCategory, setEdit, setModal}) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);

  const editCategory = async (id: string) => {
    setIdCategory(id);
    await dispatch(getCategory(id));
    setEdit(true);
    setModal(true);
  };

  const deleteCategoryHandler = async (id: string) => {
    await dispatch(deleteCategory(id));
    await dispatch(getCategories());
  };


  return (
    <div className="grid grid-cols-1 gap-y-3">
      {
        categories.map((category) =>
          <CategoryItemMemoed
            category={category}
            deleteCategoryHandler={() => deleteCategoryHandler(category.id)}
            editCategory={() => editCategory(category.id)}
          />
        )
      }
    </div>
  );
};

export default CategoryView;