<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\StripeController;
use App\Http\Controllers\ApartmentController;
use App\Http\Controllers\ClosedPeriodController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\FactureController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\TestController;
use App\Http\Controllers\BanController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\PriceController;
use App\Http\Controllers\checkTableController;
use App\Http\Middleware\CheckUserProfile;
use App\Http\Middleware\VerifyCsrfToken;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

require_once 'FilePaths.php';


Route::get('/test', [TestController::class, 'test']);

Route::get('/', function () {
    return Inertia::render(FilePaths::WELCOME, [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render(FilePaths::DASHBOARD);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {

    Route::get('/contact', [TicketController::class, 'contact'])->name('contact.show');
    Route::get('/ticket/create', [TicketController::class, 'create'])->name('ticket.create');
    Route::post('/ticket', [TicketController::class, 'store'])->name('ticket.store');
    Route::get('/tickets/{Id}', [TicketController::class, 'customerIndex'])->name('tickets.index');
    Route::get('/ticket/{id}', [TicketController::class, 'show'])->name('ticket.show');
    Route::put('/ticket/{id}', [TicketController::class, 'update'])->name('ticket.update');

    Route::post('/userProfile', [UserController::class, 'profileToUse'])->name('user.profileToUse');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('users', UserController::class);

    Route::get('/admin', [UserController::class, 'indexAdmin'])->name('users.admin');
    Route::post('/admin', [UserController::class, 'StoreAdmin'])->name('admin.store');
    Route::get('/admin/create', [UserController::class, 'CreateAdmin'])->name('admin.create');

    Route::middleware(CheckUserProfile::class.':isManager')->group(function () {
        Route::get('/profile/get', [ProfileController::class, 'get'])->name('profile.get');

        Route::get('/users', [UserController::class, 'indexCustomer'])->name('users');
        Route::get('/user/{id}', [UserController::class, 'user'])->name('user');
        Route::post('/user/{id}', [UserController::class, 'update'])->name('user.update');
        Route::post('/user/exclude', [UserController::class, 'RGPDCustomer'])->name('user.exclude');
        Route::get('/user/{id}/ban', [BanController::class, 'addban']);
        Route::get('/user/{id}/ban/list', [BanController::class, 'banlist']);
    });

    Route::get('/services', [ServiceController::class, 'list'])->name('services');
    Route::post('/service/create', [ServiceController::class, 'create'])->name('service.creates');
    Route::get('/service/addprovider/{id}', [ServiceController::class, 'addprovider'])->name('service.provider.add');
    Route::post('/service/addprovider', [ServiceController::class, 'addProviderVerif'])->name('service.addprovider.post');
    Route::get('/service/create/page', [ServiceController::class, 'create_page'])->name('service.create');
    Route::get('/service/listtarrification', [ServiceController::class, 'liste_provider_service'])->name('service.provider.list');
    Route::get('/service/provider', [ServiceController::class, 'addProviderPage']);
    Route::post('/service/provider/price', [PriceController::class, 'priceUpdate'])->name('service.provider.price');

    Route::resource('apartment', ApartmentController::class);
    Route::delete('/appartimage/{id}', [ApartmentController::class, 'destroyImg'])->name('appart.destroyImg');

    Route::resource('tag', TagController::class);

    Route::get('/reservation', [ReservationController::class, 'index'])->name('reservation');
    Route::get('/reservation/{id}/edit', [ReservationController::class, 'edit'])->name('reservation.edit');
    Route::get('reservation/create/{apartment_id}', [ReservationController::class, 'create'])->name('reservation.create');
    Route::get('/reservations', [ReservationController::class, 'index'])->name('reservation.index');
    //Route::get('/reservation', [ReservationController::class, 'test'])->name('reservation.test'); //test
    Route::post('/reservation', [ReservationController::class, 'store'])->name('reservation.store');
    Route::patch('/reservation/validate/{id}', [ReservationController::class, 'validate'])->name('reservation.validate');
    Route::patch('/reservation/refused/{id}', [ReservationController::class, 'refused'])->name('reservation.refused');
    Route::get('/reservation/{id}', [ReservationController::class, 'showAll'])->name('reservation.showAll');

    Route::prefix('appartement/{appartement}/edit')->group(function () {
        Route::get('/fermetures', [ClosedPeriodController::class, 'index'])->name('fermeture.index');
        Route::delete('/fermetures/{fermeture}', [ClosedPeriodController::class, 'destroy'])->name('fermeture.destroy');
        Route::patch('/fermetures/{fermeture}', [ClosedPeriodController::class, 'update'])->name('fermeture.update');
        Route::get('/fermetures/create', [ClosedPeriodController::class, 'create'])->name('fermeture.create');
        Route::post('/fermetures', [ClosedPeriodController::class, 'store'])->name('fermeture.store');
    });
    Route::get('/payment',[PaymentController::class, 'payment']);

    Route::get('/factureclient/{id}', [FactureController::class, 'client'])->name('facture.client.id'); // need fix

});

Route::get('/', [ApartmentController::class, 'list'])->name('apartment.list');


Route::get('/create-payment-intent', [StripeController::class, 'createPaymentIntent']);

Route::get('/check-table', [CheckTableController::class, 'checkTableBan']);


require __DIR__.'/auth.php';
