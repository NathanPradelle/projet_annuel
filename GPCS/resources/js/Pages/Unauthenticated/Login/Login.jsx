import { Head, Link, useForm } from '@inertiajs/react';
import { t } from 'i18next';
import { useEffect } from 'react';

import SimpleButton from '@/Components/Buttons/SimpleButton';
import SimpleCheckbox from '@/Components/SimpleCheckbox';
import SimpleField from '@/Components/SimpleField';
import GuestLayout from '@/Layouts/GuestLayout';

const Login = ({ status, canResetPassword }) => {
  const { data, setData, post, errors, reset } = useForm({
    email: '',
    password: '',
    remember: '',
  });

  useEffect(() => {
    return () => {
      reset('password');
    };
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    post(route('login'));
  };

  return (
    <GuestLayout>
      <Head title='Log in' />

      {status && (
        <div className='mb-4 font-medium text-sm text-green-600'>{status}</div>
      )}

      <form onSubmit={onSubmit}>
        <SimpleField
          id='email'
          type='email'
          setdata={setData}
          value={data.email}
          label={t('common.email')}
          errorMessage={errors.email}
        />
        <SimpleField
          id='password'
          type='password'
          setdata={setData}
          value={data.password}
          label={t('signIn.password.label')}
          errorMessage={errors.password}
        />
        <SimpleCheckbox
          id='remember'
          setdata={setData}
          className='flex gap-0_5 mt-2'
          value={data.remember}
          label={t('login.rememberMe')}
          errorMessage={errors.password}
        />

        <div className='flex items-center justify-end'>
          {canResetPassword && (
            <Link href={route('password.request')}>
              {t('login.forgottenPassword')}
            </Link>
          )}

          <SimpleButton type='submit'>{t('common.connection')}</SimpleButton>
        </div>
      </form>
    </GuestLayout>
  );
};

export default Login;
