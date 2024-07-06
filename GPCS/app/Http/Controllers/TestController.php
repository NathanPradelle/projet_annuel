<?php

namespace App\Http\Controllers;

use App\Models\provider_service;
use App\Models\Apartment;
use Illuminate\Http\Request;

class TestController extends Controller
{
    //public function (){}

    public function test(){
        dd(provider_service::all());
        //var_dump(class_exists(FilePaths::class)); // Vérifie si la classe est chargée
        //dd(FilePaths::test()); // Vérifie le résultat de la méthode
        /*$appartement = Apartment::all();
        dd($appartement);*/
        //return view('test');
    }
}
