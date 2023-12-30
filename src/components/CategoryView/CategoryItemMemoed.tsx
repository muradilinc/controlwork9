import React from 'react';
import {NotePencil, Trash} from '@phosphor-icons/react';
import {ResponseCategory} from '../../types';
import {useAppSelector} from '../../redux/hooks';
import {selectDeleteCategoryLoading, selectUpdateCategoryLoading} from '../../store/category/categorySlice';

interface Props {
  category: ResponseCategory;
  deleteCategoryHandler: React.MouseEventHandler;
  editCategory: React.MouseEventHandler;
}

const CategoryItemMemoed: React.FC<Props> = React.memo( function CategoryItem ({category, deleteCategoryHandler, editCategory})  {
  const updateCategoryLoading = useAppSelector(selectUpdateCategoryLoading);
  const deleteCategoryLoading = useAppSelector(selectDeleteCategoryLoading);
  const loading = [updateCategoryLoading, deleteCategoryLoading].every(status => !status);

  return (
    <div key={category.id} className="flex text-xl items-center p-2 justify-between border border-black">
      <div className="grid grid-cols-2 gap-x-3 items-center w-[70%]">
        <h3 className="col-span-1">{category.name}</h3>
        <div className="col-span-1 grid place-content-end">
          <p
            className={`text-white bg-${category.type.toLowerCase() === 'income' ? 'green' : 'red'}-600 px-[10px] py-[5px]`}>{category.type}</p>
        </div>
      </div>
      <div>
        <button
          disabled={!loading}
          onClick={editCategory}
        >
          <NotePencil size={32}/>
        </button>
        <button
          disabled={!loading}
          onClick={deleteCategoryHandler}
        >
          <Trash size={32}/>
        </button>
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  return prevProps.category !== nextProps.category;
});

export default CategoryItemMemoed;