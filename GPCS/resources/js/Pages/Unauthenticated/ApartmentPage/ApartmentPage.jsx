import { useForm } from '@inertiajs/react';
import { t } from 'i18next';
import React, { useCallback, useMemo } from 'react';

import SimpleButton from '@/Components/Buttons/SimpleButton';
import SimpleCheckbox from '@/Components/SimpleCheckbox';
import SimpleDate from '@/Components/SimpleDate';
import SimpleField from '@/Components/SimpleField';
import ApartmentWindowFull from '@/Features/ApartmentWindowFull';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { dateDiffInDays } from '@/utils/date';
import { Inertia } from '@inertiajs/inertia';

const demain = new Date();
demain.setDate(new Date().getDate() + 1);

const ApartmentPage = ({
                           apartment,
                           storagePath,
                           // fermetures,
                           // intervalles,
                           // reservedDates,
                           services,
                       }) => {
    const { data, setData, post, errors } = useForm({
        ...apartment,
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
            Inertia.post(route('reservation.saveInformations', data));
        },
        [data]
    );

    return (
        <AuthenticatedLayout>
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
                                    setdata={setData}
                                    value={data.dateStart}
                                    label={t('common.dateStart')}
                                    minDate={demain}
                                    errorMessage={errors.dateStart}
                                />

                                <SimpleDate
                                    id='dateEnd'
                                    setdata={setData}
                                    value={data.dateEnd}
                                    label={t('common.dateEnd')}
                                    minDate={demain}
                                    errorMessage={errors.dateEnd}
                                />

                                <SimpleField
                                    id='guestCount'
                                    type='number'
                                    setdata={setData}
                                    value={data.guestCount}
                                    max={apartment.guestCount}
                                    label={t('apartment.nbPeople')}
                                    errorMessage={errors.guestCount}
                                    required
                                />

                                {services.map((service, index) => (
                                    <SimpleCheckbox
                                        key={index}
                                        id={`${service.label}`}
                                        className='flex gap-0_5 mt-2'
                                        label={`${service.label}`}
                                        onChange={(e) =>
                                            setData('service-' + service.id, e.target.checked)
                                        }
                                        errorMessage={errors.password}
                                    />
                                ))}

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

export default ApartmentPage;
