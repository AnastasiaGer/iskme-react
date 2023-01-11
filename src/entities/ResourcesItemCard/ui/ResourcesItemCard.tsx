/* eslint-disable max-len */
import { classNames } from 'shared/lib/classNames/classNames';
import { Link } from 'react-router-dom';
import cls from './ResourcesItemCard.module.scss';
import StarIcon from '../../../shared/assets/icons/star.svg';
import AccessibleIcon from '../../../shared/assets/icons/accessible.svg';
import FullCourseIcon from '../../../shared/assets/icons/full-course.svg';
import RightsIcon from '../../../shared/assets/icons/rights.svg';
import InfoIcon from '../../../shared/assets/icons/info.svg';
import { memo } from 'react';

interface CollectionItemCardProps {
  className?: string;
  resource?: any;
}

export const ResourcesItemCard = memo(({ resource, className }: CollectionItemCardProps) => {

  
  let sub = resource.metadata[0].items.map(el => el.name).join(', ')
  let type = resource?.metadata[1]?.items.map(el => el.name).join(', ')

  return (
      <li className={cls.item_card}>
        <div className={cls.item_overview}>
          <p> resource.site(?) </p>
          <div className={cls.item_label_wrapper}>
            <Link to='/' aria-label="Go to Resource page" className={cls.item_link}>
              <label className={cls.item_label}>
                <input type="checkbox" />
                {resource.title}
              </label>
            </Link>
          </div>
          <p>
            Updated  {resource.timestamp} </p>
          <div className={cls.item_stars}>
            <StarIcon className={cls.star_icon} />
            <StarIcon className={cls.star_icon} />
            <StarIcon className={cls.star_icon} />
            <StarIcon className={cls.star_icon} />
            <StarIcon className={cls.star_icon} />
          </div>
          <p>resource.reviews(?)</p>
          <p className={cls.subTitle}>
            Subject:
            <span>{sub}</span>
          </p>
          <p className={cls.subTitle}>
            Material Type:
            <span>{type}</span>
          </p>
          <p className={cls.subTitle}>
            Level:
            <span>resource.educationLevels(?)</span>
          </p>
          <div className={cls.item_accessibility}>
            <AccessibleIcon className={cls.accessible_icon} />
            resource.accessibility(?)
          </div>
          <p className={cls.subTitle}>
            Overview:
            <span>{resource.abstract}</span>
            <a href="#" className={cls.overview_link}>Read More</a>
          </p>
        </div>

        <div className={cls.item_info}>
          <div className={cls.item_big_icon}>
            <FullCourseIcon className={cls.full_course_icon} />
            Full Course
          </div>
          <div className={cls.subTitle}>
            <p>License Type:</p>
            <span>resource.licenseType(?)</span>
          </div>
          <div className={cls.item_icons}>
            <span>resource.licenseIndex(?)</span>
            <RightsIcon className={cls.icon} />
            <InfoIcon className={cls.info_icon} />
          </div>
        </div>
      </li>
  );
});
