/* eslint-disable no-useless-computed-key */
/* eslint-disable react/button-has-type */
/* eslint-disable array-callback-return */
/* eslint-disable no-console */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable max-len */
/* eslint-disable eqeqeq */

import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import {
  fetchResources,
  fetchFilters,
  loadFilteredResources,
  loadSortBy,
} from 'widgets/ResourcesList/model/services/ActionCreators';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { Button } from 'shared/ui/Button/Button';
import ArrowIcon from '../../../shared/assets/icons/arrow-back.svg';
import { SearchBar } from '../../../features/SearchBar';
import { Select } from '../../../features/Select';
import { Filter } from '../../../features/Filter';
import cls from './SearchResources.module.scss';
import { ResourcesList } from 'widgets/ResourcesList';
import { AppLink } from 'shared/ui/AppLink/AppLink';

interface search_resourcesProps {
  className?: string;
}
export function SearchResources({ className }: search_resourcesProps) {
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>(data);
  const [filters, setFilters] = useState<any[]>([]);
  const [checked, setChecked] = useState({});
  const [sorted, setSorted] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useAppDispatch();
  const {
    resources,
    filteredResources,
    filtersDisplayed,
    sortBy,
    isLoading,
    error,
  } = useAppSelector((state) => state.resourcesReducer);

  const { search } = useLocation();
  const history = useNavigate();

  // eslint-disable-next-line spaced-comment

  useEffect(() => {
    dispatch(fetchResources());
    dispatch(fetchFilters());
    dispatch(loadFilteredResources(search));
    dispatch(loadSortBy());
  }, [dispatch, search]);

  useEffect(() => {
    setData(resources);
    setFilters(filtersDisplayed);
    setFilteredData(filteredResources);
  }, [resources, filtersDisplayed, filteredResources]);

  const handleSelectChange = useCallback((event: any) => {
    setSorted(event.target.value);
  }, []);

  // Add structure for checked store:
  // {
  //   "applied-science": "f.general_subject",
  //   "architecture-and-design": "f.general_subject"      
  // }
  // const handleFilterChange = useCallback((event: any) => {
  //   const slug = event.target.getAttribute("data-slug");
  //   const value = event.target.value;
  //   let updatedList = Object.assign({}, checked);
  //   if (event.target.checked) {
  //     updatedList[value] = slug;      
  //   } else {
  //     delete updatedList[value];
  //   }
  //   console.log(updatedList);
  //   setChecked(updatedList);
  // }, [checked]);

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
    if (cleanedUpQuery === '') {
      setFilteredData(data);
    } else {
      const updatedList = [...data].filter((x) => x.title.toLowerCase().includes(cleanedUpQuery));
      setFilteredData(updatedList);
      console.log(updatedList)
    }
    setInputValue(event.target.value);
  }

  return (
    <div className={classNames(cls.search_resources, {}, [className])}>
      <ArrowIcon className={cls.back_link_img} />
      <AppLink to="/explore-oer-exchange" aria-label="Go Back to Explore OER Exchange" className={cls.back_link} text='Back to Explore OER Exchange' />
      <h1 className={cls.search_resources_title}>Search Resources</h1>
      <div className={cls.search_block}>
        <SearchBar value={inputValue} onInputChange={handleInputChange} placeholder="Search Resources" />
        <Select options={sortBy} onSelectChange={handleSelectChange} />
      </div>
      {/* {isLoading && <h3>Loading...</h3>}
      {error && <h3>{error}</h3>} */}
      <div className={cls.search_resources_board}>
        <ul className={cls.filter_bar}>
          <h2>Filter By</h2>
          {filters && filters.map((el) => (
            <Filter
              key={el.name}
              filter={el}
              onFilterChange={handleFilterChange}
              checkMarks={checked}
            />
          ))}
          {/* <Button onClick={handleSubmit} title="Search" /> */}
          <Button onClick={handleClearSearchParams} title="Reset" style={{ backgroundColor: '#0e0f58', color: '#ffffff' }} />
        </ul>
        <div className={cls.search_resources_list}>
          <ResourcesList resourcesData={filteredData} />
        </div>
      </div>
    </div>
  );
}
