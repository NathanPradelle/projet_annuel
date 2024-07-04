import { useCallback } from 'react';

import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import InputText from '@/Components/InputText';

const SimpleField = ({
  id,
  className,
  type,
  value,
  setData,
  label,
  onChange,
  errorMessage,
  placeholder,
  required,
  disabled,
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

      <InputText
        id={id}
        type={type}
        value={value}
        onChange={onChangeInput}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
      />

      <InputError message={errorMessage} />
    </div>
  );
};

export default SimpleField;
