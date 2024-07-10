import { t } from 'i18next';
import React from 'react';

import Table from '@/Components/Table';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import useColumns from './useColumns';

const MyReservationsPage = ({ reservations, pagination }) => {
  const columns = useColumns();

  return (
    <AuthenticatedLayout
      headTitle='CustomerIndex'
      header={
        <h2 className='font-semibold text-xl text-gray-800 leading-tight'>
          {t('reservation.recap')}
        </h2>
      }
    >
      <div className='bg-white shadow-sm sm:rounded-lg p-6 text-gray-900'>
        <Table
          columns={columns}
          data={reservations}
          placeholder={t('reservation.noReservation')}
          pagination={pagination}
        />
      </div>
    </AuthenticatedLayout>
  );
};

export default MyReservationsPage;
