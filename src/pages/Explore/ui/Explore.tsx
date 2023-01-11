/* eslint-disable react/jsx-no-bind */
/* eslint-disable max-len */
/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { fetchCollections } from 'widgets/CollectionList/model/services/ActionCreators';
import { fetchCollectionsByMicrosite } from 'widgets/MicrositeCollectionList/model/services/ActionCreators';
import { SearchBar } from '../../../features/SearchBar';
import { CollectionList } from '../../../widgets/CollectionList';
import { MicrositeCollectionList } from '../../../widgets/MicrositeCollectionList';
import cls from './Explore.module.scss';
import { AppLink } from 'shared/ui/AppLink/AppLink';


interface ExploreProps {
  className?: string;
}
export function Explore({ className }: ExploreProps) {
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>(data);
  const [microsites, setMicrosites] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const dispatch = useAppDispatch();
  const {
    collections,
    isLoading,
    error,
  } = useAppSelector((state) => state.collectionReducer);
  const {
    collectionsByMicrosite,
  } = useAppSelector((state) => state.collectionsByMicrositeReducer);

  // eslint-disable-next-line spaced-comment

  useEffect(() => {
    dispatch(fetchCollections());
    dispatch(fetchCollectionsByMicrosite());
  }, [dispatch]);

  useEffect(() => {
    setData(collections);
    setFilteredData(collections);
    setMicrosites(collectionsByMicrosite);
  }, [collections, collectionsByMicrosite]);

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
    <div className={classNames(cls.Explore, {}, [className])}>
      <h1 className={cls.explore_title}>Explore</h1>
      <div className={cls.links_wrapper}>
        <AppLink to="/advanced-resource-search" aria-label="Go to Advanced resource search page" className={cls.back_link} text='Go to Advanced resource search'/>
      </div>

      {/* {isLoading && <h3>Loading...</h3>}
      {error && <h3>{error}</h3>} */}
      <div className={cls.shared_collections}>
        <div className={cls.titles_wrapper}>
          <h2>All Shared Collections</h2>
          <AppLink to="/browse" aria-label="Go to View All Collections page" className={cls.back_link} text='View All Collections' />
        </div>
        <div>
          <SearchBar value={inputValue} onInputChange={handleInputChange} placeholder="Search Collections" />
        </div>
        <CollectionList collections={filteredData} />
      </div>

      <div className={cls.collections_by_microsite}>
        <h2>By Microsite</h2>
        <p>TODO:The microsite needs a background image.</p>
        <MicrositeCollectionList microsites={microsites} />
      </div>

      <div>
        <h2 style={{ marginBottom: '20px' }}>By Education Level</h2>
        <p>TODO:If we want to list collections by Education Level - we need a flag for the Collection indicating the general level of education</p>
      </div>
    </div>
  );
}
