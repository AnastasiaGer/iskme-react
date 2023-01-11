/* eslint-disable no-unused-vars */
import { memo, SelectHTMLAttributes } from 'react';
import { SelectRenderer } from 'react-dropdown-select';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Select.module.scss';

interface SelectProps {
    className?: string;
    options: [];
    onSelectChange: (event: any) => void;
}
export const Select = memo((props: SelectProps) => {
  const {options, onSelectChange, className} = props;
  const selectOptions = options as Array<any>;

  return (
    <div className={classNames(cls.Select, {}, [className])}>
      <p>Sort by:</p>
      <select aria-label="Sort" className={cls.select} onChange={(event) => onSelectChange(event)}>
        {selectOptions && selectOptions.map((el: any) => (
          <option key={el.slug} value={el.slug}>{el.name}</option>
        ))}
        {/* <option defaultValue="defaultOption" disabled>defaultOption</option>
                <option>optionname</option> */}
      </select>
    </div>

  );
});
