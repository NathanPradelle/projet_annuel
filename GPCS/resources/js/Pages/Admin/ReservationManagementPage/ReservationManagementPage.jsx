import { Inertia } from '@inertiajs/inertia';
import { useForm } from '@inertiajs/inertia-react';
import { t } from 'i18next';
import React from 'react';

import Table from '@/Components/Table';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import useColumns from './useColumns';

const ReservationManagementPage = ({ reservations }) => {
  const columns = useColumns();
  return (
    <AuthenticatedLayout>
      <Table
        columns={columns}
        data={reservations}
        placeholder={t('service.noServices')}
      />
    </AuthenticatedLayout>
  );
};

export default ReservationManagementPage;
