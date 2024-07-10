import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/react';
import { t } from 'i18next';
import { useEffect, useMemo } from 'react';

import SimpleButton from '@/Components/Buttons/SimpleButton';
import { toastActionSuccess, toastCommonError } from '@/utils/toast';

const useColumns = () => {
  const apiResult = usePage().props?.flash?.message;

  const handleDelete = (tagId) => {
    const deleteTagUrl = route('tag.destroy', { tag: tagId });
    Inertia.delete(deleteTagUrl, {
      // onSuccess: () => {
      //   c.log('Tag deleted successfully');
      // },
      onError: (error) => {
        toastCommonError(error);
        console.error('Failed to delete Tag:', error);
      },
    });
  };

  useEffect(() => {
    apiResult && toastActionSuccess();
  }, [apiResult]);

  const columns = useMemo(
    () => [
      {
        field: 'name',
        headerName: 'name',
        valueGetter: (row) => row?.name,
        renderCell: (row) => row?.name,
      },
      {
        renderCell: (row) => (
          <SimpleButton to={route('tag.edit', row.id)}>
            {t('common.edit')}
          </SimpleButton>
        ),
      },
      {
        renderCell: (row) => (
          <SimpleButton onClick={() => handleDelete(row.id)} color='red'>
            {t('common.delete')}
          </SimpleButton>
        ),
      },
    ],
    []
  );

  return columns;
};

export default useColumns;
