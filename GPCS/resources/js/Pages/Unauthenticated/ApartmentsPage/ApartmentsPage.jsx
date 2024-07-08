import { InertiaLink } from '@inertiajs/inertia-react';
import { t } from 'i18next';
import React from 'react';

import SimpleButton from '@/Components/Buttons/SimpleButton';
import ApartmentsFilter from '@/Features/ApartmentsFilter';
import ApartmentWindow from '@/Features/ApartmentWindow';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const ApartmentsPage = ({ apartments, storagePath }) => {
  const { filteredApart, searchFields } = ApartmentsFilter(apartments);

  return (
    <AuthenticatedLayout
      head='Welcome'
      className='bg-gradient-to-br from-gray-800 to-gray-600 flex-col'
    >
      <h3 className='flex-center dark:text-white/50 m-2'>{t('appLongName')}</h3>
      <div className='p-4 sm:p-8 bg-white shadow sm:rounded-lg'>
        {searchFields}
        {filteredApart?.length > 0 ? (
          <div className='flex flex-wrap gap-2 justify-start'>
            {filteredApart?.map((apartment) => (
              <ApartmentWindow
                key={apartment.id}
                apartment={apartment}
                storagePath={storagePath}
                actions={
                  <SimpleButton to={route('apartment.show', apartment.id)}>
                    {t('common.details')}
                  </SimpleButton>
                }
                bg='bg-strawberry'
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

export default ApartmentsPage;
