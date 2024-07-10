import { Inertia } from '@inertiajs/inertia';
import { useForm, usePage } from '@inertiajs/react';
import { t } from 'i18next';
import { useCallback, useEffect, useMemo, useState } from 'react';

import InputText from '@/Components/InputText';
import SimpleListMultiple from '@/Components/SimpleListMultiple';
import { ALL_PROFILES } from '@/Constants/profiles';
import { toastActionSuccess, toastCommonError } from '@/utils/toast';
import { getProfileLabel, getUserName } from '@/utils/user';

const useColumns = () => {
  const apiResult = usePage().props?.flash?.message;

  const { data, setData, patch } = useForm();
  const [editingUser, setUserToEdit] = useState(null);

  const handleEdit = useCallback(
    (user) => {
      setData(user);
      setUserToEdit(user?.id);
    },
    [editingUser]
  );

  const handleSave = useCallback(() => {
    patch(route('users.update', data));

    setUserToEdit(null);
  }, [data]);

  const handleDelete = (userId) => {
    const deleteUserUrl = route('users.destroy', { user: userId });
    Inertia.delete(deleteUserUrl, {
      // onSuccess: () => {
      //   c.log('User deleted successfully');
      // },
      onError: (error) => {
        toastCommonError(error);
        console.error('Failed to delete user:', error);
      },
    });
  };

  useEffect(() => {
    apiResult && toastActionSuccess();
  }, [apiResult]);

  const profilesOptions = useMemo(
    () =>
      ALL_PROFILES?.map((profileId) => {
        return {
          value: profileId,
          label: getProfileLabel(profileId),
        };
      }),
    []
  );

  const columns = useMemo(
    () => [
      {
        field: 'id',
        headerName: 'ID',
        valueGetter: (row) => row?.id,
        renderCell: (row) => row?.id,
      },
      {
        field: 'name',
        headerName: t('common.name'),
        valueGetter: (row) => row?.name,
        renderCell: (row) =>
          editingUser === row.id ? (
            <>
              <InputText
                id='firstname'
                setdata={setData}
                value={data.firstname}
                required
              />
              <InputText
                id='lastname'
                setdata={setData}
                value={data.lastname}
                required
              />
            </>
          ) : (
            getUserName(row)
          ),
      },
      {
        field: 'email',
        headerName: t('common.email'),
        valueGetter: (row) => row?.email,
        renderCell: (row) =>
          editingUser === row.id ? (
            <InputText
              id='email'
              type='email'
              setdata={setData}
              value={data.email}
              required
            />
          ) : (
            row?.email
          ),
      },
      {
        field: 'profiles',
        headerName: 'Roles',
        valueGetter: (row) => row?.profileInUse,
        renderCell: (row) =>
          editingUser === row.id ? (
            <SimpleListMultiple
              id='profiles'
              setdata={setData}
              value={data.profiles}
              options={profilesOptions}
            />
          ) : (
            <div className='flex-col'>
              {row.profiles.map((profile, key) => (
                <label key={key}>{getProfileLabel(profile?.id)}</label>
              ))}
            </div>
          ),
      },
      {
        renderCell: (row) =>
          editingUser === row.id ? (
            <button
              onClick={handleSave}
              className='text-indigo-600 hover:text-indigo-900'
            >
              Save
            </button>
          ) : (
            <>
              <button
                onClick={() => handleEdit(row)}
                className='text-indigo-600 hover:text-indigo-900'
              >
                Edit
              </button>
              <span className='px-2'>|</span>
              <button
                onClick={() => handleDelete(row.id)}
                className='text-red-600 hover:text-red-900'
              >
                Delete
              </button>
            </>
          ),
      },
    ],
    [
      data,
      editingUser,
      profilesOptions,
      handleEdit,
      handleSave,
      handleDelete,
      setData,
    ]
  );

  return columns;
};

export default useColumns;
