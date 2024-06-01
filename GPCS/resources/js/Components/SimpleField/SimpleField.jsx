import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

const SimpleField = ({
  id,
  className,
  type,
  value,
  label,
  onChange,
  errorMessage,
  placeholder,
}) => {
  return (
    <div className={className}>
      <InputLabel htmlFor={id} value={label} />

      <TextInput
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />

      <InputError message={errorMessage} />
    </div>
  );
};

export default SimpleField;
