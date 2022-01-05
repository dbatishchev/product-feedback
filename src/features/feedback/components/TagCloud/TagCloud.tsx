import React from 'react';
import MultiSelect from '../../../../app/components/MultiSelect/MultiSelect';
import { CATEGORY_LIST } from '../../constants/categories';
import { Category } from '../../types/Category';
import { categoryFilterChanged } from '../../../filters/slices/filtersSlice';
import useAppDispatch from '../../../../app/hooks/useAppDispatch';
import useAppSelector from '../../../../app/hooks/useAppSelector';

type TagCloudProps = {

};

const TagCloud: React.FC<TagCloudProps> = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.filters.categories);
  const handleChange = (values: Category[]) => {
    dispatch(categoryFilterChanged(values));
  };

  return (
    <MultiSelect
      value={categories}
      values={CATEGORY_LIST}
      onChange={handleChange}
    />
  );
};

export default TagCloud;
