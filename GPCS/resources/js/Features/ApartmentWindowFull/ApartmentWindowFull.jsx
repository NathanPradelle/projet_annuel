import './ApartmentWindowFull.less';

import clsx from 'clsx';
import { t } from 'i18next';
import React from 'react';

import { getUserName } from '@/utils/user';

const ApartmentWindowFull = ({ apartment, storagePath, bg }) => {
  console.log(apartment);
  return (
    <div key={apartment?.id} className={clsx('apartment-window-full', bg)}>
      <div className='infos'>
        <div className='image'>
          {apartment?.images?.length > 0
            ? apartment?.images.map((image) => (
                <img
                  key={image.id}
                  src={storagePath + image.image}
                  alt='Apartment'
                />
              ))
            : t('apartment.noPictureAvailable')}
        </div>
        <h1 className='text-2xl font-extrabold'>{apartment?.name}</h1>
        <p>
          {apartment?.street}, {apartment?.postalCode}
        </p>
        <p>
          {t('apartment.rentedBy')} {getUserName(apartment?.user)}
        </p>
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
      </div>
      <div className='description'>
        <p>{t('common.description')}</p>
        <div className='border-t-2 border-grey overflow-x-auto'>
          <p className='text-xl'>{apartment.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ApartmentWindowFull;
