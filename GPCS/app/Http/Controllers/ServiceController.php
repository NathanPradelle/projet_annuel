<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Models\provider_service;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use FilePaths;

class ServiceController extends Controller
{
    public function create_page(){
        return Inertia::render(FilePaths::SERVICE_CREATE);
    }
    public function create(Request $request){
        $service = new Service();
        //dd($request);
        $service->label=$request['label'];
        $service->category=$request['category'];
        dd($service->save());
    }

    /// <summary>
    /// Get all services.
    /// </summary>
    public function list(){
        $services = Service::all();
        $user = User::find(auth()->id()); //to change
        $user->id; // to change
        $provider_service = provider_service::where('user_id', $user->id)->get();
        // dd($provider_service);
        // dd($service);
        return Inertia::render(FilePaths::SERVICE, ['services' => $services]);
    }

    /// <summary>
    /// Get services of a provider.
    /// </summary>
    public function myServices(){
        $services = Service::all();
        // TODO
        return Inertia::render(FilePaths::SERVICE, ['services' => $services]);
    }

    public function addprovider($id){
        return Inertia::render(FilePaths::SERVICE_ADD_PROVIDER, ['id' => $id]);
    }

    public function apply(){
        $user = User::with('services')->find(auth()->id());
        $services = Service::all();
        return Inertia::render(FilePaths::SERVICE_APPLY, ['user'=>$user,'services' => $services,]);
    }

    public function addProviderPage(Request $request){
        //dd($request);
        $service_provider = new provider_service();
        $service_provider->user_id = $request['user_id'];
        $service_provider->service_id = $request['service_id'];
        //dd($service_provider);
        return Inertia::render(FilePaths::SERVICE_FEE,);
        dd($service_provider->save());
    }

    public function addProviderVerif(Request $request,){
        $service_provider = new provider_service();
        //dd($request,$request['user.id'],$request->input());
        $service_provider->user_id = $request['user.id'];
        $service_provider->service_id = $request['id'];
        dd($service_provider->save());
    }
}
