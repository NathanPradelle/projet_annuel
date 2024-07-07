import { useForm } from '@inertiajs/react';
import { t } from 'i18next';
import React, { useCallback, useMemo } from 'react';

import SimpleButton from '@/Components/Buttons/SimpleButton';
import SimpleDate from '@/Components/SimpleDate';
import SimpleField from '@/Components/SimpleField';
import ApartmentWindowFull from '@/Features/ApartmentWindowFull/ApartmentWindowFull';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { dateDiffInDays } from '@/utils/date';

const demain = new Date();
demain.setDate(new Date().getDate() + 1);

const ApartmentVerificationPage = ({
  apartment,
  auth,
  storagePath,
  // fermetures,
  // intervalles,
  // reservedDates,
}) => {
  const { data, setData, post, errors } = useForm({
    ...apartment,
    dateStart: null,
  });
  const totalPrice = useMemo(() => {
    if (data?.dateStart && data?.dateEnd && data?.guestCount > 0) {
      return data?.price * dateDiffInDays(data?.dateStart, data?.dateEnd);
    }

    return 0;
  }, [data]);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      post(route('reservation.store', data));
    },
    [data]
  );

  return (
    <AuthenticatedLayout user={auth.user}>
      <div className='flex justify-center'>
        <article>
          <h1 className='text-3xl font-extrabold'>{apartment.name}</h1>
          <div className='flex justify-between mt-5'>
            <ApartmentWindowFull
              apartment={apartment}
              storagePath={storagePath}
              bg='bg-strawberry'
            />

            <div className='p-4 sm:p-8 ml-20 bg-white sm:rounded-lg shadow-xl'>
              <form>
                <input type='hidden' name='apartment_id' value={apartment.id} />

                <SimpleDate
                  id='dateStart'
                  value={data.dateStart}
                  setdata={setData}
                  label={t('common.dateStart')}
                  minDate={demain}
                  errorMessage={errors.dateStart}
                />

                <SimpleDate
                  id='dateEnd'
                  value={data.dateEnd}
                  setdata={setData}
                  label={t('common.dateEnd')}
                  minDate={demain}
                  errorMessage={errors.dateEnd}
                />

                <SimpleField
                  id='guestCount'
                  type='number'
                  value={data.guestCount}
                  max={apartment.guestCount}
                  label={t('apartment.nbPeople')}
                  onChange={(e) => setData('guestCount', e.target.value)}
                  errorMessage={errors.guestCount}
                  required
                />

                <div className='mb-4' id='total_price_container'>
                  <p>
                    Total : <span id='total_price'>{totalPrice} €</span>
                  </p>
                  <input type='hidden' name='prix' id='prix' />
                </div>

                <SimpleButton onClick={onSubmit}>
                  {t('apartment.rent')}
                </SimpleButton>
              </form>
            </div>
          </div>
        </article>
      </div>
    </AuthenticatedLayout>
  );
};

export default ApartmentVerificationPage;
