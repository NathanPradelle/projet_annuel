import 'flatpickr/dist/flatpickr.min.css';

import { useForm } from '@inertiajs/react';
import { t } from 'i18next';
import React, { useCallback } from 'react';

import SimpleButton from '@/Components/Buttons/SimpleButton';
import SimpleField from '@/Components/SimpleField';
import SimpleList from '@/Components/SimpleList';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const options = [
  {
    value: 'jour',
    label: 'jour',
  },
  {
    value: 'distance',
    label: 'distance',
  },
  {
    value: 'variable',
    label: 'variable',
  },
];
const ServiceCreationPage = () => {
  const { data, setData, post, errors } = useForm({
    label: '',
    category: 'jour',
  });

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      post(route('service.creates', data));
    },
    [data]
  );

  return (
    <AuthenticatedLayout
      head='Welcome'
      header={
        <h2 className='font-semibold text-xl text-gray-800 leading-tight'>
          {t('service.create')}
        </h2>
      }
    >
      <div>
        <form method='POST' action='/service/create'>
          <SimpleList
            id='category'
            setdata={setData}
            value={data?.category}
            label='Type de service'
            options={options}
            styles={{ label: 'nav-input', option: 'nav-option' }}
          />
          <SimpleField
            id='label'
            setdata={setData}
            type='string'
            value={data.label}
            label={'Nom Service'}
            errorMessage={errors.label}
            required
          />
          <SimpleButton type='submit' onClick={onSubmit}>
            Enregistrer nouveau service
          </SimpleButton>
        </form>
      </div>
    </AuthenticatedLayout>
  );
};

export default ServiceCreationPage;
