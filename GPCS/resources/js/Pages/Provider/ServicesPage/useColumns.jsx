import { t } from 'i18next';
import { useMemo } from 'react';

import SimpleButton from '@/Components/Buttons/SimpleButton';
import { PROFILE } from '@/Constants/profiles';
import { getCurrentUser, isUserProvider } from '@/utils/user';

const useColumns = (provider_service) => {
  console.log(provider_service);
  const currentUser = getCurrentUser();
  const columns = useMemo(() => {
    const cols = [
      {
        field: 'label',
        headerName: t('common.name'),
        valueGetter: (row) => row?.label,
        renderCell: (row) => row?.label,
      },
      {
        field: 'category',
        headerName: 'Categorie',
        valueGetter: (row) => row?.category,
        renderCell: (row) => row?.category,
      },
    ];

    return cols;
  }, []);

  return columns;
};

export default useColumns;
