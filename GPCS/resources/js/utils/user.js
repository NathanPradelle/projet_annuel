import { usePage } from '@inertiajs/react';
import { t } from 'i18next';

import { MANAGER_PROFILES, PROFILE } from '@/Constants/profiles';

export const getCurrentUser = () => {
  return usePage().props?.auth?.currentUser;
};

export const getUserName = (user) => {
  return `${user?.firstname} ${user?.lastname}`;
};

export const getProfileLabel = (profileId) => {
  switch (profileId) {
    case PROFILE.LESSOR:
      return t('profile.lessor');
    case PROFILE.TRAVELER:
      return t('profile.traveler');
    case PROFILE.PROVIDER:
      return t('profile.provider');
    case PROFILE.MANAGEMENT:
      return t('profile.management');
    case PROFILE.ADMIN:
      return t('profile.admin');
    default:
      return 'Autre';
  }
};

export const isUserAdmin = (user) => {
  return user?.profiles?.some((profile) => profile.id == PROFILE.ADMIN);
};

export const isUserManager = (user) => {
  return user?.profiles?.some((profile) =>
    MANAGER_PROFILES.includes(profile.id)
  );
};

export const isUserLessor = (user) => {
  return user?.profiles?.some((profile) => PROFILE.LESSOR == profile?.id);
};

export const isUserProvider = (user) => {
  return user?.profiles?.some((profile) => PROFILE.PROVIDER == profile?.id);
};

export const isUserTraveler = (user) => {
  return user?.profiles?.some((profile) => PROFILE.TRAVELER == profile?.id);
};
