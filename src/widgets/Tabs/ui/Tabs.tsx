import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Tabs.module.scss';

interface TabsProps {
    className?: string;
    tabs?: any;
}

export const Tabs = memo(({ className, tabs }: TabsProps) => {
  return (
    <div className={classNames(cls.Tabs, {}, [className])}>
      <div className={cls.tabs_wrapper}>
        <nav className="tabs-nav">
          <ul className={cls.content_tabs}>
            {tabs.map((tab: any) => (
              <li key={tab.picker}>
                <NavLink to={`/site-collections/${tab.picker}`} aria-label={`Go to ${tab.name} page`} className="content-btn">{tab.name}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
});
