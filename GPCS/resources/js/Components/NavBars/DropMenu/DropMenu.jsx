import { Inertia } from '@inertiajs/inertia';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import React, { useCallback } from 'react';

import DropdownButton from '@/Components/Buttons/DropdownButton';
import SimpleList from '@/Components/SimpleList';
import { getCurrentUser, getProfileLabel, getUserName } from '@/utils/user';

import NavLink from '../NavLink';

const DropMenu = () => {
  const currentUser = getCurrentUser();

  const { setData } = useForm();

  const profilesOptions = currentUser?.profiles?.map((profile) => {
    return {
      value: profile?.id,
      label: getProfileLabel(profile?.id),
      selected: profile?.id == currentUser?.profileInUse,
    };
  });

  const onProfileChange = useCallback((data) => {
    axios
      .post(route('user.profileToUse'), { id: data.value })
      .then(() => Inertia.reload());
  }, []);

  return (
    <DropdownButton
      trigger={
        <button type='button' className='nav-link'>
          {getUserName(currentUser)}

          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
            width='2.5rem'
          >
            <path
              fillRule='evenodd'
              d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
              clipRule='evenodd'
            />
          </svg>
        </button>
      }
      content={
        <>
          <NavLink href={route('profile.edit')}>Profile</NavLink>
          <NavLink href={route('logout')} method='post'>
            Log Out
          </NavLink>
          <SimpleList
            id='currentUserProfile'
            className='nav-link'
            setdata={setData}
            label='Profile utilisé'
            options={profilesOptions}
            onChange={onProfileChange}
            styles={{ label: 'nav-input', option: 'nav-option' }}
          />
        </>
      }
      contentClass='drop-menu'
    />
  );
};

export default DropMenu;
