import { t } from 'i18next';
import React from 'react';

import SimpleButton from '@/Components/Buttons/SimpleButton';
import Table from '@/Components/Table';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import useColumns from './useColumns';

const ServicesPage = ({ services }) => {
  const columns = useColumns();

  return (
    <AuthenticatedLayout
      head='Welcome'
      header={
        <h2 className='font-semibold text-xl text-gray-800 leading-tight'>
          Service List
        </h2>
      }
    >
      <SimpleButton className='flex justify-end' to={route('service.create')}>
        Nouveau service
      </SimpleButton>

      <div className='bg-white overflow-hidden shadow-sm sm:rounded-lg'>
        <Table
          columns={columns}
          data={services}
          placeholder={t('service.noServices')}
        />
      </div>
    </AuthenticatedLayout>
  );
};

export default ServicesPage;
