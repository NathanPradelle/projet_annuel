<?php

namespace App\Http\Controllers;

use App\Mail\testMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;


class MailController extends Controller
{
    public function test(){
        try {
            Mail::to('wengmaxime@outlook.fr')->send(new testMail());
            return view('mail.test');
        } catch (\Exception $e) {
            dd($e->getMessage());
        }
    }
}
