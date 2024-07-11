import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';
import clsx from 'clsx';
import { t } from 'i18next';
import React from 'react';

import SimpleButton from '@/Components/Buttons/SimpleButton';
import ApartmentsFilter from '@/Features/ApartmentsFilter';
import ApartmentWindow from '@/Features/ApartmentWindow';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const ApartmentsToVerifyPage = ({ apartments, storagePath }) => {
  const { filteredApart, searchFields } = ApartmentsFilter(apartments);

  const handleValidation = (id) => {
    Inertia.put(route('apartment.validate', id));
  };

  const handleDevalidation = (id) => {
    Inertia.put(route('apartment.devalidate', id));
  };

  const handleDelete = (id) => {
    Inertia.delete(route('apartment.destroy', id));
  };

  return (
    <AuthenticatedLayout
      head='Welcome'
      headTitle='Apartments'
      header={
        <h2 className='font-semibold text-xl text-gray-800 leading-tight'>
          {t('apartment.apartmentsToVerify')}
        </h2>
      }
    >
      <div className='bg-white overflow-hidden shadow-sm sm:rounded-lg'>
        {searchFields}
        {filteredApart?.length > 0 ? (
          <div className='flex flex-wrap gap-2 justify-start'>
            {filteredApart?.map((apartment) => (
              <ApartmentWindow
                key={apartment.id}
                apartment={apartment}
                storagePath={storagePath}
                actions={
                  <>
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
                    {!apartment?.activated ? (
                      <SimpleButton
                        onClick={() => handleValidation(apartment?.id)}
                      >
                        {t('common.validate')}
                      </SimpleButton>
                    ) : (
                      <SimpleButton
                        onClick={() => handleDevalidation(apartment?.id)}
                      >
                        {t('common.unvalidate')}
                      </SimpleButton>
                    )}
                    <SimpleButton onClick={() => handleDelete(apartment?.id)}>
                      {t('common.delete')}
                    </SimpleButton>
                  </>
                }
                bg='bg-purple'
              />
            ))}
          </div>
        ) : (
          <>
            <p className='text-center text-gray-600 text-lg'>
              {t('apartment.noApartmentAvailable')}
            </p>
          </>
        )}
      </div>
    </AuthenticatedLayout>
  );
};

export default ApartmentsToVerifyPage;
