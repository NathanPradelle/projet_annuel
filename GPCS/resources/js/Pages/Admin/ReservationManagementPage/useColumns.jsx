import { useForm } from '@inertiajs/react';
import { t } from 'i18next';
import { useMemo } from 'react';

import PrimaryButton from '@/Components/Buttons/PrimaryButton';

import AddProviderForm from './AddProviderForm';

const useColumns = (reservations) => {
  console.log(reservations);

  const { post, patch } = useForm({});

  const confirmReservation = (id) => {
    patch(route('reservation.validate', { id: id }));
  };

  const columns = useMemo(() => {
    const cols = [
      {
        field: 'id',
        headerName: 'id',
        valueGetter: (row) => row?.id,
        renderCell: (row) => row?.id,
      },
      {
        field: 'user',
        headerName: 'user',
        valueGetter: (row) => row?.user.name,
        renderCell: (row) => row?.user.name,
      },
      {
        field: 'appartement',
        headerName: 'appartement',
        valueGetter: (row) => row?.apartment.name,
        renderCell: (row) => row?.apartment.name,
      },
      {
        field: 'status',
        headerName: 'status',
        valueGetter: (row) => row?.status,
        renderCell: (row) => row?.status,
      },
    ];
    if (
      reservations &&
      reservations.length > 0 &&
      reservations.some((reservation) => {
        const { providers, services } = reservation;
        return providers.length !== services.length;
      })
    ) {
      cols.push({
        field: 'Edit',
        headerName: 'Edit',
        renderCell: (row) => <AddProviderForm userId={row?.id} />,
      });
    } else {
      cols.push({
        field: 'Edit',
        headerName: 'Edit',
        renderCell: (row) => (
          <div>
            <AddProviderForm userId={row?.id} />
            <PrimaryButton
              onClick={() => confirmReservation(row.id)}
              className='ms-3'
            >
              Confirmer
            </PrimaryButton>
          </div>
        ),
      });
    }

    return cols;
  }, [reservations]);

  return columns;
};

export default useColumns;
