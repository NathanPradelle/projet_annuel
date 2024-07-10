import { useForm } from '@inertiajs/react';
import { useState } from 'react';

import PrimaryButton from '@/Components/Buttons/PrimaryButton';
import SecondaryButton from '@/Components/Buttons/SecondaryButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import InputText from '@/Components/InputText';
import Modal from '@/Components/Modal';
import SimpleField from '@/Components/SimpleField';

const AddAvisForm = ({ id, className = '', reservations }) => {
  console.log(reservations);
  const [Avis, setAvis] = useState(false);
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
    id: id,
  });

  const EditAvis = () => {
    setAvis(true);
  };

  const EditAvisConfirm = (e) => {
    e.preventDefault();

    route(`avis.edit`, id),
      {
        preserveScroll: true,
        onSuccess: () => closeModal(),
        onFinish: () => reset(),
      };
  };

  const closeModal = () => {
    setAvis(false);

    reset();
  };
  return (
    <section className={`space-y-6 ${className}`}>
      <SecondaryButton onClick={EditAvis}>Edit</SecondaryButton>

      <Modal show={Avis} onClose={closeModal}>
        <form onSubmit={EditAvisConfirm} className='p-6'>
          <InputLabel value={'appartement'} className='' />
          <div>
            <label htmlFor='rate' className=''>
              notation
            </label>
            <input
              id='rate'
              name='rate'
              type='number'
              className='mt-1 w-full'
              value={data.rate}
              max='5'
            />
            <div className='mt-6'>
              <SimpleField
                id='commentaire'
                setdata={setData}
                value={data.commentaire}
                label='commentaire'
                errorMessage={errors.commentaire}
              />
            </div>
          </div>

          <InputLabel value={'service annexe'} className='' />
          {/*{reservations.service.map((service, index) => (*/}
          <div /*key={index}>*/>
            <label htmlFor='rate' className=''>
              notation
            </label>
            <input
              id='rate'
              name='rate'
              type='number'
              className='mt-1 w-full'
              value={data.rate}
              max='5'
            />
            <div className='mt-6'>
              <SimpleField
                id='commentaire'
                setdata={setData}
                value={data.commentaire}
                label='commentaire'
                errorMessage={errors.commentaire}
              />
            </div>
          </div>
          {/*))}*/}
          <div className='mt-6 flex justify-end'>
            <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

            <PrimaryButton className='ms-3' disabled={processing}>
              Avis
            </PrimaryButton>
          </div>
        </form>
      </Modal>
    </section>
  );
};

export default AddAvisForm;
