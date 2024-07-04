import React from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import { Head } from "@inertiajs/react";
import { InertiaLink } from '@inertiajs/inertia-react';
import SimpleButton from "@/Components/Buttons/SimpleButton";
import {getCurrentUser} from '@/utils/user';


const Contact = () => {
    const currentUser = getCurrentUser();
    return (
        <AuthenticatedLayout>
            <Head title='Contact' />
            <div className="flex h-screen items-center justify-center p-8">
                <div className="flex flex-col w-1/2 space-y-4">
                    <div className="border border-gray-300 p-6 text-xl font-bold">
                        Nous Contacter
                    </div>
                    <div className="border border-gray-300 p-4">
                        Nathan (chef de projet réseau)<br/>
                        - nathan@GPCS.reseau<br/>
                        - 02 02 02 02 02
                    </div>
                    <div className="border border-gray-300 p-4">
                        Maxime (chef de projet dev)<br/>
                        - maxime@GPCS.dev<br/>
                        - 03 03 03 03 03
                    </div>
                    <div className="border border-gray-300 p-4">
                        Ahmad (développeur)<br/>
                        - ahmad@GPCS.dev<br/>
                        - 04 04 04 04 04
                    </div>
                </div>
                <div className="border-l border-gray-300 h-full mx-4"></div>
                <div className="flex-col gap-2 items-center justify-center w-1/2">
                    <SimpleButton to={route('ticket.create')}>Envoyer un ticket à GPCS</SimpleButton>
                    <SimpleButton to={route('tickets.index', currentUser.id)}>Voir ses tickets</SimpleButton>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Contact;
