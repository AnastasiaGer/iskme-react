/* eslint-disable react/jsx-no-bind */
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { memo, useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { loadSortBy } from 'widgets/CollectionList/model/services/ActionCreators';
import { SearchBar } from '../../../features/SearchBar';
import { Select } from '../../../features/Select';
import cls from './SharedContent.module.scss';

interface SharedContentProps {
    className?: string;
}
export const SharedContent = memo(({ className }: SharedContentProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const dispatch = useAppDispatch();
  const {
    sortBy,
  } = useAppSelector((state) => state.collectionReducer);
  useEffect(() => {
    dispatch(loadSortBy());
  }, [dispatch]);

  function handleSelectChange(event: any) {
    // eslint-disable-next-line no-console
    console.log('select', event.target.value);
  }

  function handleInputChange(event: any) {
    setInputValue(event.target.value);
  }

  return (
    <div className={classNames(cls.search_block, {}, [className])}>
      <SearchBar value={inputValue} onInputChange={handleInputChange} placeholder="Search Collections"/>
      <Select
        options={sortBy}
        // eslint-disable-next-line react/jsx-no-bind
        onSelectChange={handleSelectChange}
      />
    </div>
  );
});
