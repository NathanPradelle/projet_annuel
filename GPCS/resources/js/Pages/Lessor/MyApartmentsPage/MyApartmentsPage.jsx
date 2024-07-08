import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';
import { usePage } from '@inertiajs/react';
import clsx from 'clsx';
import { t } from 'i18next';
import { useEffect } from 'react';

import SimpleButton from '@/Components/Buttons/SimpleButton';
import ApartmentWindow from '@/Features/ApartmentWindow';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { toastActionSuccess, toastCommonError } from '@/utils/toast';

const MyApartmentsPage = ({ apartments, storagePath }) => {
  const apiResult = usePage().props?.flash?.message;

  const handleDelete = (apartmentId) => {
    const deleteTagUrl = route('apartment.destroy', { apartment: apartmentId });
    Inertia.delete(deleteTagUrl, {
      onSuccess: () => {
        // Inertia.reload({
        //   preserveScroll: true,
        //   replace: true,
        //   only: ['flash'],
        // });
      },
      onError: (error) => {
        toastCommonError(error);
        console.error('Failed to delete apartment:', error);
      },
    });
  };

  useEffect(() => {
    apiResult && toastActionSuccess();
  }, [apiResult]);

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
                    {' '}
                    <div
                      className={clsx(
                        'w-1_2 text-center',
                        apartment?.activated ? 'bg-green' : 'bg-error'
                      )}
                    >
                      {apartment?.activated
                        ? t('common.isActivated')
                        : t('common.isNotActivated')}
                    </div>
                    {!!apartment?.activated && (
                      <SimpleButton
                        href={route('reservation.showAll', apartment.id)}
                      >
                        {t('myApartment.reservationOnMyApartment')}
                      </SimpleButton>
                    )}
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
