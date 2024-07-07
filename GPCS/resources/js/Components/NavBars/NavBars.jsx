import './NavBars.less';

import { t } from 'i18next';
import React from 'react';

import logoImage from '@/../../public/favicon.png';
import { MANAGER_PROFILES, PROFILE } from '@/Constants/profiles';
import {
  getCurrentUser,
  isUserAdmin,
  isUserLessor,
  isUserManager,
  isUserProvider,
  isUserTraveler,
} from '@/utils/user';

import DropMenu from './DropMenu/DropMenu';
import ManagerMenu from './ManagerMenu/ManagerMenu';
import NavLink from './NavLink';
import UnauthenticatedMenu from './UnauthenticatedMenu/UnauthenticatedMenu';

const NavBars = () => {
  const currentUser = getCurrentUser();

  return (
    <div className='nav-bars'>
      <NavLink href={route('apartment.list')}>
        <img src={logoImage} alt='Logo' />
        {t('menu.home')}
      </NavLink>
      <div className='center'>
        {isUserLessor(currentUser) &&
          currentUser.profileInUse == PROFILE.LESSOR && (
            <NavLink href={route('lessor.myApartments')}>
              {t('menu.myApartments')}
            </NavLink>
          )}

        {isUserTraveler(currentUser) &&
          currentUser.profileInUse == PROFILE.TRAVELER && (
            <NavLink href={route('reservation.index')}>
              {t('menu.myReservations')}
            </NavLink>
          )}

        {isUserProvider(currentUser) &&
          currentUser.profileInUse == PROFILE.PROVIDER && (
            <NavLink href={route('services')}>Mes Services</NavLink>
          )}

        {isUserManager(currentUser) &&
          MANAGER_PROFILES.includes(currentUser.profileInUse) && (
            <ManagerMenu />
          )}

        {isUserAdmin(currentUser) &&
          currentUser.profileInUse == PROFILE.ADMIN && (
            <NavLink href={route('users.admin')}>
              {t('menu.admin.managers')}
            </NavLink>
          )}
      </div>
      {currentUser ? <DropMenu /> : <UnauthenticatedMenu />}
    </div>
  );
};

export default NavBars;
