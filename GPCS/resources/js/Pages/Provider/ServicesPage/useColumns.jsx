import { t } from 'i18next';
import { useMemo } from 'react';

import SimpleButton from '@/Components/Buttons/SimpleButton';
import { PROFILE } from '@/Constants/profiles';
import { getCurrentUser, isUserProvider } from '@/utils/user';

const useColumns = () => {
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

    isUserProvider(currentUser) &&
      [PROFILE.PROVIDER].includes(currentUser.profileInUse) &&
      cols.push({
        renderCell: (row) => (
          <SimpleButton to={route('service.provider.add', row.id)}>
            Proposer service
          </SimpleButton>
        ),
      });

    return cols;
  }, []);

  return columns;
};

export default useColumns;
