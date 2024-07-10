import { t } from 'i18next';
import { useMemo } from 'react';

import PrimaryButton from '@/Components/Buttons/PrimaryButton';
import SimpleButton from '@/Components/Buttons/SimpleButton';
import { PROFILE } from '@/Constants/profiles';
import { getCurrentUser, isUserProvider } from '@/utils/user';

const useColumns = (services, user) => {
  console.log('services:', services);
  console.log('user:', user);

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
        headerName: 'Category',
        valueGetter: (row) => row?.category,
        renderCell: (row) => row?.category,
      },
    ];

    if (
      Array.isArray(services) &&
      user?.services &&
      Array.isArray(user.services)
    ) {
      services.forEach((service) => {
        var verif = 1;
        user.services.forEach((userService) => {
          if (userService.service_id === service.id) {
            verif = 0;
          }
        });
        if (verif) {
          cols.push({
            field: 'Edit',
            headerName: 'Edit',
            renderCell: (row) => <PrimaryButton>Edit</PrimaryButton>,
          });
        }
      });
    } else {
      console.log(
        'services or user.services is not in expected format:',
        services,
        user?.services
      );
    }

    return cols;
  }, [services, user]);

  return columns;
};

export default useColumns;
