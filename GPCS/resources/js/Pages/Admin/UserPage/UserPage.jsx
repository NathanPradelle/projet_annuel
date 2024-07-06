import { useForm } from '@inertiajs/react';
import axios from 'axios';
import { t } from 'i18next';
import { useCallback, useEffect, useMemo, useState } from 'react';

import SimpleButton from '@/Components/Buttons/SimpleButton';
import SimpleField from '@/Components/SimpleField';
import SimpleListMultiple from '@/Components/SimpleListMultiple';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { getProfileLabel } from '@/utils/user';

const UserPage = ({ user }) => {
  const { data, setData, reset, post, errors } = useForm(user);
  const [disabled, setDisabled] = useState(true);
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    axios
      .get(route('profile.get'))
      .then((res) => setProfiles(res.data))
      .catch((err) => {
        console.error('Error fetching profiles:', err);
      });
  }, []);

  const profilesOptions = useMemo(
    () =>
      profiles?.map((profile) => {
        return {
          value: profile?.id,
          label: getProfileLabel(profile?.id),
        };
      }),
    [profiles]
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      post(route('user.update', data)).then(() => route('user', user.id));
    },
    [data]
  );

  const onReset = useCallback(() => {
    setDisabled(!disabled);
    reset(user);
  }, [disabled]);

  return (
    <AuthenticatedLayout
      headTitle='User'
      header={
        <h2 className='font-semibold text-xl text-gray-800 leading-tight'>
          {t('common.client')}: {user?.name}
        </h2>
      }
    >
      <div className='flex'>
        <SimpleButton onClick={onReset}>
          {disabled ? t('common.modify') : t('common.back')}
        </SimpleButton>
        <SimpleButton type='submit' onClick={onSubmit} disabled={disabled}>
          {t('common.save')}
        </SimpleButton>
      </div>
      <form onSubmit={onSubmit}>
        <SimpleField
          id='firstname'
          setdata={setData}
          value={data.firstname}
          label={t('user.firstname')}
          errorMessage={errors.firstname}
          required
          disabled={disabled}
        />

        <SimpleField
          id='lastname'
          onChange={(v) => setData('lastname', v?.toUpperCase())}
          value={data.lastname}
          label={t('user.lastname')}
          errorMessage={errors.lastname}
          required
          disabled={disabled}
        />

        <SimpleField
          id='email'
          type='email'
          setdata={setData}
          value={data.email}
          label={t('common.email')}
          errorMessage={errors.email}
          required
          disabled={disabled}
        />

        <SimpleListMultiple
          id='profiles'
          setdata={setData}
          value={data.profiles}
          label="Profils de l'utilisateur"
          options={profilesOptions}
          disabled={disabled}
        />
      </form>
    </AuthenticatedLayout>
  );
};

export default UserPage;
