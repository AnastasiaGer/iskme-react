import { classNames } from 'shared/lib/classNames/classNames';
import { NavLink } from 'react-router-dom';
import cls from './MicrositeItemCard.module.scss';
import { memo } from 'react';

interface MicrositeItemCardProps {
    className?: string;
    microsite?: any;
}
export const MicrositeItemCard = memo(({ microsite, className }: MicrositeItemCardProps) => {
  return (
    <div className={classNames('', {}, [className])}>
      <li className={cls.microsite_item_card}>
        <NavLink to="/" aria-label="Explore more about microsite">
          <div className={cls.microsite_item_img_wrapper}>
            <img src="" alt="" />
            <h3 className={cls.microsite_name}>{microsite.name}</h3>
          </div>
          <div>
            <p className={cls.info_text}>Education level</p>
            <p className={cls.info_text}>
              {microsite.numResources}
              Resources
            </p>
          </div>
        </NavLink>
      </li>
    </div>
  );
});
