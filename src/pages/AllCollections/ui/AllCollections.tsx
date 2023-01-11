/* eslint-disable no-useless-computed-key */
/* eslint-disable react/button-has-type */
/* eslint-disable array-callback-return */
/* eslint-disable no-console */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable max-len */
/* eslint-disable eqeqeq */

import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';

import {
  fetchCollections,
  fetchFilters,
  loadFilteredCollections,
  loadSortBy,
} from 'widgets/CollectionList/model/services/ActionCreators';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { Button } from 'shared/ui/Button/Button';
import ArrowIcon from '../../../shared/assets/icons/arrow-back.svg';
import { SearchBar } from '../../../features/SearchBar';
import { Select } from '../../../features/Select';
import { Filter } from '../../../features/Filter';
import { CollectionItemCard } from '../../../entities/CollectionItemCard';
import cls from './AllCollections.module.scss';
import { AppLink } from 'shared/ui/AppLink/AppLink';
interface AllCollectionsProps {
  className?: string;
}
export function AllCollections({ className }: AllCollectionsProps) {
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>(data);
  const [filters, setFilters] = useState<any[]>([]);
  const [checked, setChecked] = useState({});
  const [sorted, setSorted] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useAppDispatch();
  const {
    collections,
    filteredCollections,
    filtersDisplayed,
    sortBy,
    isLoading,
    error,
  } = useAppSelector((state) => state.collectionReducer);

  const { search } = useLocation();
  const history = useNavigate();

  useEffect(() => {
    dispatch(fetchCollections());
    dispatch(fetchFilters());
    dispatch(loadFilteredCollections(search));
    dispatch(loadSortBy());
  }, [dispatch, search]);

  useEffect(() => {
    setData(collections);
    setFilters(filtersDisplayed);
    setFilteredData(filteredCollections);
  }, [collections, filtersDisplayed, filteredCollections]);

  const handleSelectChange = useCallback((event: any) => {
    setSorted(event.target.value);
  }, []);

  const handleFilterChange = useCallback((event: any) => {
    const slug = event.target.getAttribute("data-slug");
    const value = event.target.value;
    let updatedList = Object.assign({}, checked);
    if (event.target.checked) {
      if (updatedList.hasOwnProperty(slug)) {
        updatedList[slug].push(value)
      } else {
        updatedList[slug] = [value]
      }
    } else {
      updatedList[slug].splice(updatedList[slug].indexOf(value), 1);
    }
    setChecked(updatedList);
  }, [checked]);

  const handleSetSearchParams = useCallback(() => {
    setSearchParams({ ...checked, sortby: sorted || 'title' });
  }, [checked, sorted]);

  useEffect(() => {
    handleSetSearchParams();
  }, [handleSetSearchParams]);

  useEffect(() => {
    let url = searchParams.toString()
    history(`?${url}`);
  }, [searchParams]);

  const handleClearSearchParams = () => {
    setSearchParams('');
    setChecked({});
    setInputValue('');
  };

  function handleInputChange(event: any) {
    const cleanedUpQuery = event.target.value.trim().toLowerCase();
    console.log(cleanedUpQuery);
    if (cleanedUpQuery === '') {
      setFilteredData(data);
    } else {
      const updatedList = [...data].filter((x) => x.name.toLowerCase().includes(cleanedUpQuery));
      setFilteredData(updatedList);
    }
    setInputValue(event.target.value);
  }

  return (
    <div className={classNames(cls.allcollections, {}, [className])}>
      <ArrowIcon />
      <AppLink to="/explore-oer-exchange" aria-label="Go Back to Explore OER Exchange" className={cls.back_link} text='Back to Explore OER Exchange' />
      <h1 className={cls.allcollections_title}>All Collections</h1>
      <div className={cls.search_block}>
        <SearchBar value={inputValue} onInputChange={handleInputChange} placeholder="Search Collections" />
        <Select options={sortBy} onSelectChange={handleSelectChange} />
      </div>
      {/* {isLoading && <h3>Loading...</h3>}
      {error && <h3>{error}</h3>} */}
      <div className={cls.allcollections_board}>
        <ul className={cls.filter_bar}>
          {filters && filters.map((el) => (
            <Filter
              key={el.name}
              filter={el}
              onFilterChange={handleFilterChange}
              checkMarks={checked}
            />
          ))}
          {/* <Button onClick={handleSetSearchParams} title="Search" /> */}
          <Button onClick={handleClearSearchParams} title="Reset" style={{ backgroundColor: '#0e0f58', color: '#ffffff' }} />
        </ul>
        <ul className={cls.allcollections_list}>
          {filteredData && filteredData.map((el) => (
            <CollectionItemCard key={el.name} collection={el} />
          ))}
        </ul>
      </div>
    </div>
  );
}
