import {
  Routes,
  Route,
  Outlet,
} from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import ArrowIcon from '../../../shared/assets/icons/arrow-back.svg';
import cls from './Library.module.scss';
import { SubscribedContent } from '../../../widgets/SubscribedContent';
import { Tabs } from '../../../widgets/Tabs';
import { AppLink } from 'shared/ui/AppLink/AppLink';

interface LibraryProps {
  className?: string;
}

const tabs = [
  {
    name: 'Subscribed Content',
    picker: 'subscribed-collections',
  },
  {
    name: 'Shared Content',
    picker: 'shared-collections',
  },
];
export function Library({ className }: LibraryProps) {
  return (
    <div className={classNames(cls.library_wrapper, {}, [className])}>
      <div id="my_library" className={cls.library}>
        <ArrowIcon className={cls.back_link_img} />
        <AppLink to="/explore-oer-exchange" aria-label="Go Back to Explore OER Exchange" className={cls.back_link} text='Back to Explore OER Exchange' />
        <h1 className={cls.library_title}>My Library</h1>

        <Tabs tabs={tabs} />
        <div className="">
          <Outlet />
          <Routes>
            <Route index element={<SubscribedContent />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
