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
          id='name'
          setData={setData}
          value={data.name}
          label={t('common.name')}
          errorMessage={errors.name}
          required
          disabled={disabled}
        />

        <SimpleField
          id='email'
          type='email'
          value={data.email}
          label={t('common.email')}
          onChange={(e) => setData('email', e.target.value)}
          errorMessage={errors.email}
          required
          disabled={disabled}
        />

        <SimpleListMultiple
          id='profiles'
          value={data.profiles}
          setData={setData}
          label="Profils de l'utilisateur"
          options={profilesOptions}
          disabled={disabled}
        />
      </form>
    </AuthenticatedLayout>
  );
};

export default UserPage;
