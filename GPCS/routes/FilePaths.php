<?php

use Illuminate\Support\Facades\Storage;

class FilePaths
{
    /* Unauthenticated */
    const WELCOME = 'Unauthenticated/Welcome/Welcome';
    const APARTMENTS = 'Unauthenticated/ApartmentsPage/ApartmentsPage';
    const APARTMENT = 'Unauthenticated/ApartmentPage/ApartmentPage';
    const LOGIN = "Unauthenticated/Login/Login";
    const REGISTER = "Unauthenticated/Register/Register";

    /* Authenticated */
    const CONFIRM_PASSWORD = "Authenticated/ConfirmPassword/ConfirmPassword";
    const DASHBOARD = "Authenticated/Dashboard/Dashboard";
    const FORGOT_PASSWORD = "Authenticated/ForgotPassword/ForgotPassword";
    const PROFILE = "Authenticated/Profile/ProfileEditionPage";
    const RESET_PASSWORD = "Authenticated/ResetPassword/ResetPassword";
    const VERIFY_EMAIL = "Authenticated/VerifyEmail/VerifyEmail";
    const CONTACT = "Authenticated/Contact/Contact";
    const TICKET_CREATION = "Authenticated/TicketCreationPage/TicketCreationPage";
    const TICKET_INDEX = "Authenticated/TicketIndex/TicketIndex";

    /* Admin */
    const ADMIN_CREATION = 'Admin/AdminCreationPage/AdminCreationPage';
    const ADMINS_PAGE = 'Admin/AdminsPage/AdminsPage';
    const TAG_CREATION = 'Admin/TagCreationPage/TagCreationPage';
    const TAG_EDITION = 'Admin/TagEditionPage/TagEditionPage';
    const TAGS = 'Admin/TagsPage/TagsPage';
    const USERS = 'Admin/UsersPage/UsersPage';
    const USER = 'Admin/UserPage/UserPage';
    const APARTMENT_TO_VERIFY = 'Admin/ApartmentsToVerifyPage/ApartmentsToVerifyPage';
    const APARTMENT_VERIFICATION = 'Admin/ApartmentVerificationPage/ApartmentVerificationPage';


    /* Lessor */
    const APARTMENT_CREATION = 'Lessor/ApartmentCreationPage/ApartmentCreationPage';
    const MY_APARTMENT = 'Lessor/MyApartmentPage/MyApartmentPage';
    const MY_APARTMENTS = 'Lessor/MyApartmentsPage/MyApartmentsPage';

    /* Traveler */
    const MY_RESERVATION = 'Traveler/MyReservationPage/MyReservationPage';
    const MY_RESERVATIONS = 'Traveler/MyReservationsPage/MyReservationsPage';

    /* Images */
    const IMAGE_URL = "http://127.0.0.1:8000/Storage/";

    /* Provider */
    const SERVICE_CREATE = "Provider/ServiceCreationPage/ServiceCreationPage";
    const SERVICE_FEE = "Provider/ServiceFeePage/ServiceFeePage";
    const SERVICE = "Provider/ServicesPage/ServicesPage";
    const SERVICE_ADD_PROVIDER = "Provider/AddProviderPage/AddProviderPage";
}
