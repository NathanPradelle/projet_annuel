import { useForm } from '@inertiajs/react';
import { t } from 'i18next';
import React, { useMemo } from 'react';

import SimpleField from '@/Components/SimpleField';

// May not be optimised, lack time to do better
const ApartmentsFilter = (apartments) => {
  const { data, setData, errors } = useForm();

  const filteredApart = useMemo(() => {
    let filteredApartments = apartments;

    if (data?.priceMin) {
      filteredApartments = filteredApartments.filter(
        (e) => parseInt(e?.price) >= parseInt(data?.priceMin)
      );
    }

    if (data?.priceMax) {
      filteredApartments = filteredApartments.filter(
        (e) => parseInt(e?.price) <= parseInt(data?.priceMax)
      );
    }

    if (data?.postalCode) {
      filteredApartments = filteredApartments.filter((e) =>
        String(e?.postalCode)?.toLowerCase().includes(data?.postalCode)
      );
    }

    if (data?.street) {
      filteredApartments = filteredApartments.filter((e) =>
        e?.street?.toLowerCase().includes(data?.street?.toLowerCase())
      );
    }

    return filteredApartments;
  }, [apartments, data]);

  const searchFields = (
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
        id='postalCode'
        type='number'
        setdata={setData}
        value={data.name}
        label={t('common.postalCode')}
        errorMessage={errors.name}
      />
      <SimpleField
        id='street'
        setdata={setData}
        value={data.name}
        label={t('common.street')}
        errorMessage={errors.name}
      />
    </div>
  );

  return { filteredApart, searchFields };
};

export default ApartmentsFilter;
