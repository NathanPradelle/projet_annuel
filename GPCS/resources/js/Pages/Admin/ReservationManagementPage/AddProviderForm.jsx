import { useForm } from '@inertiajs/react';
import { useState } from 'react';

import DangerButton from '@/Components/Buttons/DangerButton';
import PrimaryButton from '@/Components/Buttons/PrimaryButton';
import SecondaryButton from '@/Components/Buttons/SecondaryButton';
import DateInput from '@/Components/DateInput';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import InputText from '@/Components/InputText';
import Modal from '@/Components/Modal';

const AddProviderForm = ({ userId, className = '' }) => {
  const [ConfirmingReservation, setConfirmingReservation] = useState(false);
  const {
    data,
    setData,
    get,
    post,
    delete: destroy,
    processing,
    reset,
    errors,
  } = useForm({
    user_id: userId,
    date_start: '',
    date_end: '',
    raison: '',
  });

  const EditProvider = () => {
    setConfirmingReservation(true);
  };

  const EditProviderConfirm = (e) => {
    e.preventDefault();

    get(`/user/${userId}/ban`, {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onFinish: () => reset(),
    });
  };

  const closeModal = () => {
    setConfirmingReservation(false);

    reset();
  };
  return (
    <section className={`space-y-6 ${className}`}>
      <SecondaryButton onClick={EditProvider}>Edit</SecondaryButton>

      <Modal show={ConfirmingReservation} onClose={closeModal}>
        <form onSubmit={EditProviderConfirm} className='p-6'>
          <div className='mt-6 flex justify-end'>
            <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

            <PrimaryButton className='ms-3' disabled={processing}>
              Enregistrer
            </PrimaryButton>
          </div>
        </form>
      </Modal>
    </section>
  );
};

export default AddProviderForm;
