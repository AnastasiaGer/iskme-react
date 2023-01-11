/* eslint-disable no-unused-vars */
import { classNames } from 'shared/lib/classNames/classNames';
import SearchIcon from 'shared/assets/icons/search.svg';
import cls from './SearchBar.module.scss';
import { memo } from 'react';

interface SearchBarProps {
    className?: string;
    value?: string;
    onInputChange: (event: any) => void;
    placeholder: string;
}
export const SearchBar = memo(({ value, onInputChange, placeholder, className }: SearchBarProps) => {
  return (
    <div className={classNames(cls.Searchbar, {}, [className])}>
      <SearchIcon className={cls.search_icon} />
      <input
        type="search"
        name="search"
        aria-label="Search keywords"
        autoComplete="off"
        value={value}
        className={cls.input}
        placeholder={placeholder}
        onChange={onInputChange}
      />
    </div>
  );
});
