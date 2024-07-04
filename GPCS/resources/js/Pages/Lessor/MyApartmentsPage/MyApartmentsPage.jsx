import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';
import { t } from 'i18next';

import SimpleButton from '@/Components/Buttons/SimpleButton';
import ApartmentWindow from '@/Features/ApartmentWindow/ApartmentWindow';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const MyApartmentsPage = ({ apartments, storagePath }) => {
  const handleDelete = (apartmentId) => {
    const deleteTagUrl = route('apartment.destroy', { apartment: apartmentId });
    Inertia.delete(deleteTagUrl, {
      onSuccess: () => {
        console.log('Apartment deleted successfully');
      },
      onError: (error) => {
        console.error('Failed to delete apartment:', error);
      },
    });
  };

  return (
    <AuthenticatedLayout
      head='Welcome'
      header={
        <h2 className='font-semibold text-xl text-gray-800 leading-tight'>
          {t('myApartment.title')}
        </h2>
      }
    >
      <div className='flex flex-wrap gap-2 justify-start p-4 sm:p-8 bg-white shadow sm:rounded-lg'>
        {apartments?.length > 0 ? (
          <div className='flex flex-wrap gap-2 justify-start'>
            {apartments?.map((apartment) => (
              <ApartmentWindow
                key={apartment.id}
                apartment={apartment}
                storagePath={storagePath}
                actions={
                  <>
                    <SimpleButton
                      href={route('reservation.showAll', apartment.id)}
                    >
                      Réservations
                    </SimpleButton>
                    <SimpleButton onClick={() => handleDelete(apartment.id)}>
                      {t('common.delete')}
                    </SimpleButton>
                  </>
                }
                bg='bg-blue'
              />
            ))}
          </div>
        ) : (
          <>
            <p className='text-center text-gray-600 text-lg'>
              {t('myApartment.noApartments')}
            </p>
            <InertiaLink href={route('apartment.create')} className='mt-4'>
              Mettez votte bien à disposition dès maintenant
            </InertiaLink>
          </>
        )}
      </div>
    </AuthenticatedLayout>
  );
};

export default MyApartmentsPage;
