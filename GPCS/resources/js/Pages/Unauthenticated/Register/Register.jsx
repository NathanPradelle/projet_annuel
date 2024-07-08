import { Head, Link, useForm } from '@inertiajs/react';
import { t } from 'i18next';
import { useCallback, useEffect } from 'react';

import PrimaryButton from '@/Components/Buttons/PrimaryButton';
import SimpleField from '@/Components/SimpleField';
import GuestLayout from '@/Layouts/GuestLayout/GuestLayout';

const Register = () => {
  const { data, setData, post, processing, errors, reset } = useForm({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  useEffect(() => {
    return () => {
      reset('password', 'password_confirmation');
    };
  }, [errors]);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      post(route('register', data));
    },
    [data]
  );

  return (
    <GuestLayout>
      <Head title='Register' />

      <form onSubmit={onSubmit}>
        <SimpleField
          id='firstname'
          setdata={setData}
          value={data.firstname}
          label={t('user.firstname')}
          errorMessage={errors.firstname}
          required
        />

        <SimpleField
          id='lastname'
          onChange={(v) => setData('lastname', v?.toUpperCase())}
          value={data.lastname}
          label={t('user.lastname')}
          errorMessage={errors.lastname}
          required
        />

        <SimpleField
          id='email'
          type='email'
          setdata={setData}
          value={data.email}
          label={t('common.email')}
          errorMessage={errors.email}
          required
        />

        <SimpleField
          id='password'
          type='password'
          setdata={setData}
          value={data.password}
          label={t('signIn.password.label')}
          errorMessage={errors.password}
          required
        />

        <SimpleField
          id='password_confirmation'
          type='password'
          setdata={setData}
          value={data.password_confirmation}
          label={t('signIn.password.confirmLabel')}
          errorMessage={errors.password_confirmation}
          required
        />

        <div className='flex items-center justify-end mt-4'>
          <Link
            href={route('login')}
            className='underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            {t('signIn.alreadyRegistered')}
          </Link>

          <PrimaryButton disabled={processing}>
            {t('signIn.label')}
          </PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  );
};

export default Register;
