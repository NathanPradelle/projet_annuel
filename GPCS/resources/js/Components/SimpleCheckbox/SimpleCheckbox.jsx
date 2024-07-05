import { useCallback } from 'react';

import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';

import Checkbox from '../Checkbox';

const SimpleCheckbox = ({
  id,
  setData,
  className,
  value,
  label,
  onChange,
  errorMessage,
}) => {
  const onChangeInput = useCallback(
    (e) => {
      setData && setData(id, e.target.value);
      onChange && onChange(e);
    },
    [onChange, setData]
  );

  return (
    <div className={className}>
      <InputLabel htmlFor={id} value={label} />

      <Checkbox id={id} checked={value} onChange={onChangeInput} />

      <InputError message={errorMessage} />
    </div>
  );
};

export default SimpleCheckbox;
