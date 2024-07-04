import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';

import InputLabel from '@/Components/InputLabel';

import DropdownButton from '../Buttons/DropdownButton';

const SimpleList = ({
  id,
  className,
  setData,
  label,
  options,
  onChange,
  disabled,
  styles,
}) => {
  const [selectedOption, setSelectedOption] = useState();

  useEffect(() => {
    setSelectedOption(options?.find((option) => !!option?.selected)?.label);
  }, []);

  const onClickChange = useCallback(
    (selected) => {
      setSelectedOption(selected.label);
      setData(id, selected.value);
      onChange && onChange(selected);
    },
    [setData]
  );

  return (
    <DropdownButton
      buttonClass={className}
      trigger={
        <>
          <InputLabel htmlFor={id} value={label} className={styles?.label} />
          <button id={id} type='button'>
            {selectedOption}
          </button>
        </>
      }
      content={options.map((option) => (
        <button
          key={option?.value}
          value={option?.value}
          onClick={!disabled && (() => onClickChange(option))}
          className={clsx('p-0_5', styles?.option)}
          type='button'
        >
          {option?.label}
        </button>
      ))}
      disabled={disabled}
    />
  );
};

export default SimpleList;
