import { t } from 'i18next';
import React from 'react';

import Table from '@/Components/Table';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import useColumns from './useColumns';

const ServicesPage = ({ services, user }) => {
  console.log(services);
  console.log(user);
  console.log(user.services);
  const columns = useColumns();

  return (
    <AuthenticatedLayout
      head='Welcome'
      header={
        <h2 className='font-semibold text-xl text-gray-800 leading-tight'>
          Service apply
        </h2>
      }
    >
      <div className='bg-white overflow-hidden shadow-sm sm:rounded-lg'>
        <Table
          columns={columns}
          data={services}
          placeholder={t('service.apply')}
        />
      </div>
    </AuthenticatedLayout>
  );
};

export default ServicesPage;
