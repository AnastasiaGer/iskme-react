/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/button-has-type */
// import { NavLink } from "react-router-dom";
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { memo, useEffect, useState } from 'react';
import { loadSortBy } from 'widgets/CollectionList/model/services/ActionCreators';
import ListIcon from '../../../shared/assets/icons/list.svg';
import GearIcon from '../../../shared/assets/icons/gear.svg';
import AlertIcon from '../../../shared/assets/icons/alert.svg';
import { SearchBar } from '../../../features/SearchBar';
import { Select } from '../../../features/Select';
import { Button } from '../../../shared/ui/Button/Button';
import cls from './SubscribedContent.module.scss';

interface SubscribedContentProps {
    className?: string;
}

export const  SubscribedContent = memo(({ className }: SubscribedContentProps) => {
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
    <div className={classNames('', {}, [className])}>
      <div className={cls.list_tabs}>
        <button className={classNames(cls.list_btn, {}, ['active'])}>
          <ListIcon className={cls.list_icon} />
          Subscription List
        </button>
        <button className={cls.list_btn}>
          <GearIcon className={cls.list_icon} />
          Preferences
        </button>
        <button className={cls.list_btn}>
          <AlertIcon className={cls.list_icon} />
          Notifications
        </button>
      </div>
      <div className={cls.search_block}>
        <SearchBar value={inputValue} onInputChange={handleInputChange} placeholder="Search Collections"/>
        <Select
          options={sortBy}
          // eslint-disable-next-line react/jsx-no-bind
          onSelectChange={handleSelectChange}
        />
      </div>
      <p>
        You haven’t subscribed any collections yet!
      </p>
      <Button title="Subscribe Collections" />
    </div>
  );
});
