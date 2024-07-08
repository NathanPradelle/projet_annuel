import { t } from 'i18next';
import React from 'react';

import NavLink from '@/Components/NavBars/NavLink';

const ManagerMenu = () => {
  return (
    <>
      <NavLink href={route('apartment.managerList')}>
        {t('menu.admin.apartments')}
      </NavLink>

      <hr />

      <NavLink href={route('services')}>{t('menu.admin.services')}</NavLink>

      <hr />

      <NavLink href={route('tag.index')}>{t('menu.admin.tags')}</NavLink>

      <hr />

      <NavLink href={route('users')}>{t('menu.admin.users')}</NavLink>

      <hr />

      <NavLink href={route('users.demandes')}>{t('menu.admin.demandes')}</NavLink>
    </>
  );
};

export default ManagerMenu;
