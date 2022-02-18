import { ChangeEvent } from 'react';
import { CategoryProps } from '../../types';

const filterCheckedCategories = (categories: CategoryProps) => {
  return categories.filter(({ checked }) => checked);
};

const getCategoryIds = (categories: CategoryProps) => {
  const checkedCategories = filterCheckedCategories(categories);
  const categoryIds = checkedCategories.map((item) => item.id);
  return categoryIds;
};

const formatCategories = (categories: CategoryProps) => {
  return categories.map(({ id, name }) => ({
    id,
    name,
    checked: false,
  }));
};

const getCheckedCategories = (
  categories: CategoryProps,
  categoryId: string,
  event: ChangeEvent<HTMLInputElement>,
) => {
  const categoriesUpdated = categories.map((category) => {
    const isSelectedCategory = category.id === categoryId;
    return {
      ...category,
      checked: isSelectedCategory ? event.target.checked : category.checked,
    };
  });

  return categoriesUpdated;
};

export { getCategoryIds, formatCategories, getCheckedCategories };
