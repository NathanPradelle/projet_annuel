import { Link } from '@inertiajs/react';
import { t } from 'i18next';
import { useMemo } from 'react';

import { getProfileLabel, getUserName } from '@/utils/user';

import BanUserForm from './BanUserForm';
import BanUserList from './BanUserList';

const useColumns = () => {
  const columns = useMemo(
    () => [
      {
        field: 'id',
        headerName: 'ID',
        valueGetter: (row) => row?.id,
        renderCell: (row) => row?.id,
      },
      {
        field: 'name',
        headerName: t('common.name'),
        valueGetter: (row) => row?.firstname,
        renderCell: (row) => getUserName(row),
      },
      {
        field: 'email',
        headerName: t('common.email'),
        valueGetter: (row) => row?.email,
        renderCell: (row) => row?.email,
      },
      {
        field: 'profiles',
        headerName: 'Role Actif',
        valueGetter: (row) => row?.profileInUse,
        renderCell: (row) => getProfileLabel(row?.profileInUse),
      },
      {
        renderCell: (row) => (
          <Link href={route('user', row?.id)}>{t('common.details')}</Link>
        ),
      },
      {
        renderCell: (row) => (
          <a
            href={route('user.exclude', { user: row?.id })}
            className='text-red-600 hover:text-red-900'
          >
            RGPD
          </a>
        ),
      },
      {
        renderCell: (row) => (
          <BanUserForm userId={row?.id} className='max-w-xl' />
        ),
      },
      {
        renderCell: (row) => <BanUserList userId={row?.id} />,
      },
    ],
    []
  );

  return columns;
};

export default useColumns;
