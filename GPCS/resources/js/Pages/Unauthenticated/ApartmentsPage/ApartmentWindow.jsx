import { InertiaLink } from '@inertiajs/inertia-react';
import { t } from 'i18next';
import React from 'react';

const ApartmentWindow = ({ apartment, storagePath }) => {
  return (
    <InertiaLink
      key={apartment?.id}
      href={route('apartment.show', apartment.id)}
      className='block'
    >
      {apartment?.images?.length > 0 ? (
        <img
          key={apartment.id}
          src={storagePath + apartment.images[0].image}
          className='rounded-md'
          width='25%'
          style={{ height: '250px' }}
          alt='Appartement'
        />
      ) : (
        t('apartment.noApartmentAvailable')
      )}
      <h1 className='text-2xl font-extrabold'>{apartment?.name}</h1>
      <p>{apartment?.address}</p>
      <p>Loué par {apartment?.user?.name}</p>
      <p>
        <span className='font-extrabold'>
          {apartment?.price}€ {t('apartment.perNight')}
        </span>
      </p>
      {apartment?.tags?.map((tag) => (
        <span
          key={tag.id}
          className='bg-blue-900 text-blue-300 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-100 dark:text-blue-800'
        >
          {tag.name}
        </span>
      ))}
    </InertiaLink>
  );
};

export default ApartmentWindow;
