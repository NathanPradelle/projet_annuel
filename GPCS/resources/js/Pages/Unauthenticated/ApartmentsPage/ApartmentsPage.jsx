import { InertiaLink } from '@inertiajs/inertia-react';
import { useForm } from '@inertiajs/react';
import { t } from 'i18next';
import React, { useMemo } from 'react';

import SimpleButton from '@/Components/Buttons/SimpleButton';
import SimpleField from '@/Components/SimpleField';
import ApartmentWindow from '@/Features/ApartmentWindow/ApartmentWindow';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const AppartementsPage = ({ apartments, storagePath }) => {
  const { data, setData, errors } = useForm();

  const filteredApart = useMemo(() => {
    let filteredApartments = apartments?.data;

    if (data?.priceMin) {
      filteredApartments = filteredApartments.filter(
        (e) => String(e?.price) >= String(data?.priceMin)
      );
    }

    if (data?.priceMax) {
      filteredApartments = filteredApartments.filter(
        (e) => String(e?.price) <= String(data?.priceMax)
      );
    }

    if (data?.address) {
      filteredApartments = filteredApartments.filter((e) =>
        e?.address?.toLowerCase().includes(data?.address?.toLowerCase())
      );
    }

    return filteredApartments;
  }, [apartments, data]);
  return (
    <AuthenticatedLayout
      head='Welcome'
      className='bg-gradient-to-br from-gray-800 to-gray-600 flex-col'
    >
      <h3 className='flex-center dark:text-white/50 m-2'>{t('appLongName')}</h3>
      <div className='p-4 sm:p-8 bg-white shadow sm:rounded-lg'>
        <div className='flex gap-2'>
          <SimpleField
            id='priceMin'
            type='number'
            setdata={setData}
            value={data.name}
            label={t('apartment.priceMin')}
            errorMessage={errors.name}
          />
          <SimpleField
            id='priceMax'
            type='number'
            setdata={setData}
            value={data.name}
            label={t('apartment.priceMax')}
            errorMessage={errors.name}
          />
          <SimpleField
            id='address'
            setdata={setData}
            value={data.name}
            label={t('common.address')}
            errorMessage={errors.name}
          />
        </div>
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

export default AppartementsPage;
