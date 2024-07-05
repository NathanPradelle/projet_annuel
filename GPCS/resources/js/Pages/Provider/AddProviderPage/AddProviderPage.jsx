import { useForm } from '@inertiajs/react';
import { t } from 'i18next';
import React, { useCallback } from 'react';

import SimpleButton from '@/Components/Buttons/SimpleButton';
import SimpleField from '@/Components/SimpleField';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { getCurrentUser } from '@/utils/user';

const AddProviderPage = ({ service, id }) => {
  const currentUser = getCurrentUser();

  const { data, setData, post, errors } = useForm({
    ...service,
    user: currentUser,
  });

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const dataToSend = { ...data, id };
      post(route('service.addprovider.post', dataToSend));
    },
    [data]
  );

  return (
    <AuthenticatedLayout
      head='Welcome'
      header={
        <h2 className='font-semibold text-xl text-gray-800 leading-tight'>
          Ajout provider :
        </h2>
      }
    >
      <div>
        <form>
          <SimpleField
            id='PrixRegulier'
            type='number'
            value={data.PrixRegulier}
            label={t('service.regularPrice')}
            onChange={(e) => setData('PrixRegulier', e.target.value)}
            errorMessage={errors.PrixRegulier}
            required
          />
          <input type='hidden' id='id' name='id' value={id} />
          <SimpleButton type='submit' onClick={onSubmit}>
            Enregistrer nouveau prix
          </SimpleButton>
        </form>
      </div>
    </AuthenticatedLayout>
  );
};

export default AddProviderPage;
