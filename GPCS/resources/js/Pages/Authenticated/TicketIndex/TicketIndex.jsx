import { useState } from 'react';

import Table from '@/Components/Table';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import useColumns from './useColumns';

const TicketIndex = ({ tickets, pagination }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const columns = useColumns();
    // Fonction pour filtrer les utilisateurs par ID ou par Objet
    const filteredTickets = tickets?.filter(
        (ticket) =>
               String(ticket.id) === searchTerm || ticket.objet.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Gestionnaire de changement pour la recherche
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
    return (
        <AuthenticatedLayout
            headTitle='CustomerIndex'
            header={
                <h2 className='font-semibold text-xl text-gray-800 leading-tight'>
                    Historique des tickets
                </h2>
            }
        >
            <div className='bg-white overflow-hidden shadow-sm sm:rounded-lg'>
                <Table
                    seachInput={
                        <input
                            type='text'
                            placeholder='Recherche par ID ou par Objet...'
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className='block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                        />
                    }
                    columns={columns}
                    data={filteredTickets}
                    pagination={pagination}
                />
            </div>
        </AuthenticatedLayout>
    );
};

export default TicketIndex;
