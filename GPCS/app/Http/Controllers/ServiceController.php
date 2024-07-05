<?php

namespace App\Http\Controllers;

use App\Models\service;
use App\Models\provider_services;
use App\Models\Services;
use Illuminate\Http\Request;
use Inertia\Inertia;
use FilePaths;

class ServiceController extends Controller
{
    public function create_page(){
        return Inertia::render(FilePaths::SERVICE_CREATE);
    }
    public function create(Request $request){
        $service = new Services();
        $service->label=$request['label'];
        $service->category=$request['category'];
        dd($service->save());
    }

    /// <summary>
    /// Get all services.
    /// </summary>
    public function list(){
        $services = Services::all();
        //dd($service);
        return Inertia::render(FilePaths::SERVICE, ['services' => $services]);
    }

    /// <summary>
    /// Get services of a provider.
    /// </summary>
    public function myServices(){
        $services = Services::all();
        // TODO
        return Inertia::render(FilePaths::SERVICE, ['services' => $services]);
    }

    public function addprovider($id){
        return Inertia::render(FilePaths::SERVICE_ADD_PROVIDER, ['id' => $id]);
    }

    public function addProviderPage(Request $request){
        //dd($request);
        $service_provider = new provider_services();
        $service_provider->user_id = $request['user_id'];
        $service_provider->service_id = $request['service_id'];
        //dd($service_provider);
        return Inertia::render(FilePaths::SERVICE_FEE,);
        dd($service_provider->save());
    }

    public function addProviderVerif(Request $request){
        $service_provider = new provider_services();
        dd($request);
        $service_provider->user_id = 1;
        $service_provider->service_id = 1;
        $service_provider;
    }
}
