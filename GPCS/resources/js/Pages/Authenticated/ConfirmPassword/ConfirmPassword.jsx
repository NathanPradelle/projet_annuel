import { Head, useForm } from '@inertiajs/react';
import { useEffect } from 'react';

import PrimaryButton from '@/Components/Buttons/PrimaryButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/InputText';
import GuestLayout from '@/Layouts/GuestLayout/GuestLayout';

const ConfirmPassword = () => {
  const { data, setData, post, processing, errors, reset } = useForm({
    password: '',
  });

  useEffect(() => {
    return () => {
      reset('password');
    };
  }, []);

  const submit = (e) => {
    e.preventDefault();

    post(route('password.confirm'));
  };

  return (
    <GuestLayout>
      <Head title='Confirm Password' />

      <div className='mb-4 text-sm text-gray-600'>
        This is a secure area of the application. Please confirm your password
        before continuing.
      </div>

      <form onSubmit={submit}>
        <div className='mt-4'>
          <InputLabel htmlFor='password' value='Password' />

          <TextInput
            id='password'
            type='password'
            name='password'
            value={data.password}
            className='mt-1 block w-full'
            isFocused={true}
            onChange={(e) => setData('password', e.target.value)}
          />

          <InputError message={errors.password} className='mt-2' />
        </div>

        <div className='flex items-center justify-end mt-4'>
          <PrimaryButton disabled={processing}>Confirm</PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  );
};

export default ConfirmPassword;
