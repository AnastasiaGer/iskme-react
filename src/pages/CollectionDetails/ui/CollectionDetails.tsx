/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import Select from 'react-dropdown-select';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useCallback, useEffect, useState } from 'react';
import cls from './CollectionDetails.module.scss';
import ArrowIcon from '../../../shared/assets/icons/arrow-back.svg';
import ArrowRight from '../../../shared/assets/icons/arrow-right.svg';
import { Button } from '../../../shared/ui/Button/Button';
import { SearchBar } from '../../../features/SearchBar';
import { Filter } from '../../../features/Filter';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { fetchCollectionDetailsResources, fetchFilters, loadFilteredResources, loadSortBy } from 'pages/CollectionDetails/model/services/ActionCreators';
import { ResourcesItemCard } from 'entities/ResourcesItemCard';

interface CollectionDetailsProps {
  className?: string;
}

export function CollectionDetails({ className }: CollectionDetailsProps) {
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>(data);
  const [filters, setFilters] = useState<any[]>([]);
  const [checked, setChecked] = useState({});
  const [sorted, setSorted] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useAppDispatch();
  const {
    collectionDetailsResources,
    filteredResources,
    filtersDisplayed,
    sortBy,
    isLoading,
    error,
  } = useAppSelector((state) => state.collectionDetailsReducer);

  const { search } = useLocation();
  const history = useNavigate();

  // eslint-disable-next-line spaced-comment

  useEffect(() => {
    dispatch(fetchCollectionDetailsResources(search));
    dispatch(fetchFilters(search));
    dispatch(loadFilteredResources(search));
    dispatch(loadSortBy(search));
  }, [dispatch, search]);

  useEffect(() => {
    setData(collectionDetailsResources);
    setFilters(filtersDisplayed);
    setFilteredData(filteredResources);
  }, [collectionDetailsResources, filtersDisplayed, filteredResources]);

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
    <div className={classNames(cls.CollectionDetails, {}, [className])}>
      <ArrowIcon />
      <AppLink to="/explore-oer-exchange" aria-label="Go Back to Explore OER Exchange" className={cls.back_link} text='Back to Explore OER Exchange' />
      {/* {isLoading && <h3>Loading...</h3>}
      {error && <h3>{error}</h3>} */}
      <div className={cls.collection_details_board}>
        <div className={cls.filter_bar}>
        <div className={cls.collection_img_wrapper}>
            <img src="" alt="" />
          </div>
          <p className="m-1">micrositeTitle </p>
          <h3 className="m-1 font-bold text-base"> collectionTitle </h3>
          <p className="m-1 font-bold text-base"> resourcesNumber  resources |  educationLevel </p>
          <p className="m-1 font-bold text-base">Created May 2020 | 6 Subscribers</p>
          <Button
            title="Add Collection to site"
            className="rounded-lg shadow-sm bg-blue-800 text-center text-white px-2 py-2"
          />
          <a href="#" className="text-blue-600 m-1">
            Read More About This Collection
            <ArrowRight className={cls.back_link_img} />
          </a>
          <p className="m-1">75% of collection / (9) Resources are not in your library</p>

          <h5 className="text-base font-bold">Filters</h5>
          <ul>
            
            <p>For filters run start:dev:server</p>
            {filters && filters.map((el) => (
              <Filter
                key={el.name + 1}
                filter={el}
                onFilterChange={handleFilterChange}
                checkMarks={checked}
              />
            ))}
            {/* <Button onClick={handleSetSearchParams} title="Search" /> */}
            <Button onClick={handleClearSearchParams} title="Reset" style={{ backgroundColor: '#0e0f58', color: '#ffffff' }} />
          </ul>
        </div>

        <div className={cls.collection_details_list}>
          <div className={cls.search_block}>
            <SearchBar value={inputValue} onInputChange={handleInputChange} placeholder="Search Collections" />

            //TODO Fix Select
            {/* <Select options={sortBy} onSelectChange={handleSelectChange} /> */}
          </div>
          <ul>
            <p>List of Resources</p>
            {filteredData && filteredData.map((el) => (
              <ResourcesItemCard key={el.name} resource={el} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
