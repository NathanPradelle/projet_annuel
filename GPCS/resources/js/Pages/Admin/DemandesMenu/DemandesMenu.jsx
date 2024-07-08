import { Head } from '@inertiajs/react';
import React from 'react';

import SimpleButton from '@/Components/Buttons/SimpleButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';

const DemandesMenu = () => {

    return (
        <AuthenticatedLayout>
            <Head title='Demandes' />
            <div className='flex h-screen items-center justify-center p-8'>
                    <SimpleButton to={route('demande.bailleur')}>
                        Demandes Bailleur
                    </SimpleButton>
                    <SimpleButton to={route('demande.prestataire')}>
                        Demandes Prestataires
                    </SimpleButton>
                    <SimpleButton to={route('demande.prestatation')}>
                        Demandes Prestations
                    </SimpleButton>
            </div>
        </AuthenticatedLayout>
    );
};

export default DemandesMenu;
