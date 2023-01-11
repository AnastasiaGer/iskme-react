/* eslint-disable max-len */
import { classNames } from 'shared/lib/classNames/classNames';
import { Link } from 'react-router-dom';
import cls from './CollectionItemCard.module.scss';
import { memo, useEffect } from 'react';

interface CollectionItemCardProps {
    className?: string;
    collection?: any;
}

export const CollectionItemCard = memo(({ collection, className }: CollectionItemCardProps) => {

  return (
    <div className={classNames('', {}, [className])} onClick={() => console.log(collection.id)}>
      <li className={cls.item_card}>
        <Link to={`/collection-details/${collection.micrositeName}/${collection.id}/resources`} aria-label="Go to Collection page" className="">
          <div className={cls.item_img_wrapper}>
            <img src={collection.thumbnail} alt="" width="300" height="150" />
            <p className={cls.item_name}>
              {collection.name}
            </p>
          </div>
          <h3 className={cls.site_name}>{collection.micrositeName}</h3>
          <p className="">
            {collection.numResources}
            resources
          </p>
        </Link>
      </li>
    </div>
  );
});
