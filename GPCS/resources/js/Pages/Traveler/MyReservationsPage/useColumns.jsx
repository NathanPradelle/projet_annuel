import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';
import { format } from 'date-fns';
import { useMemo } from 'react';

import AddAvisForm from './AddAvisForm';

const useColumns = () => {
  const handleCancelReservation = (e, reservationId) => {
    e.preventDefault();
    if (confirm('Êtes-vous sûr de vouloir annuler cette réservation ?')) {
      Inertia.patch(route('reservation.refused', reservationId));
    }
  };

  const Facture = (e, reservationId) => {
    e.preventDefault();
    //if (confirm('Êtes-vous sûr de vouloir annuler cette réservation ?')) {
    route('/facture/client/${reservationId}');
    //}
  };

  const formatDate = (dateString) => {
    if (!dateString) {
      return '';
    }
    const date = new Date(dateString);
    return format(date, 'dd/MM/yyyy');
  };

  const columns = useMemo(
    () => [
      {
        field: 'name',
        headerName: 'Nom',
        valueGetter: (row) => row?.apartment?.name,
        renderCell: (row) => row?.apartment?.name,
      },
      {
        field: 'price',
        headerName: 'Price',
        valueGetter: (row) => row?.price,
        renderCell: (row) => row?.price,
      },
      {
        field: 'dateStart',
        headerName: 'dateStart',
        valueGetter: (row) => row?.dateStart,
        renderCell: (row) => formatDate(row?.dateStart),
      },
      {
        field: 'dateEnd',
        headerName: 'dateEnd',
        valueGetter: (row) => row?.dateEnd,
        renderCell: (row) => formatDate(row?.dateEnd),
      },
      {
        field: 'createdAt',
        headerName: 'createdAt',
        valueGetter: (row) => row?.createdAt,
        renderCell: (row) => formatDate(row?.createdAt),
      },
      {
        field: 'status',
        headerName: 'status',
        valueGetter: (row) => row?.status,
        renderCell: (row) => row?.status,
      },
      {
        renderCell: (row) => (
          <button
            className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            onClick={(e) => handleCancelReservation(e, row?.id)}
          >
            Annuler
          </button>
        ),
      },
      {
        renderCell: (row) => (
          <InertiaLink
            href={route('facture.client.id', row.id)}
            className='bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded'
          >
            facture
          </InertiaLink>
        ),
      },
      {
        renderCell: (row) => <AddAvisForm id={row.id}></AddAvisForm>,
      },
    ],
    []
  );

  return columns;
};

export default useColumns;
