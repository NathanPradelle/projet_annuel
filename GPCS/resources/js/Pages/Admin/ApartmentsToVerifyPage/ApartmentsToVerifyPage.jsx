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
                    <SimpleButton to={route('apartment.show', apartment.id)}>
                      {t('common.details')}
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
            <InertiaLink href={route('apartment.create')} className='mt-4'>
              {t('apartment.askYours')}
            </InertiaLink>
          </>
        )}
      </div>
    </AuthenticatedLayout>
  );
};

export default ApartmentsToVerifyPage;
