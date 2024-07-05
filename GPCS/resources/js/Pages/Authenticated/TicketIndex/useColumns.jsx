import { Link } from '@inertiajs/react';
import { t } from 'i18next';
import { useMemo } from 'react';

const useColumns = () => {
    const columns = useMemo(
        () => [
            {
                field: 'id',
                headerName: 'ID',
                valueGetter: (row) => row?.id,
                renderCell: (row) => row?.id,
            },
            {
                    field: 'objet',
                headerName: 'TITRE',
                valueGetter: (row) => row?.objet,
                renderCell: (row) => row?.objet,
            },
            // {
            //     field: 'category',
            //     headerName: 'CATEGORY',
            //     valueGetter: (row) => row?.category,
            //     renderCell: (row) => row?.category,
            // },
            {
                renderCell: (row) => (
                    <Link href={route('tickets.show', row?.id)}>{t('common.details')}</Link>
                ),
            },
        ],
        []
    );

    return columns;
};

export default useColumns;
