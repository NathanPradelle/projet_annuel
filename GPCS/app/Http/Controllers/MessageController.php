<?php

namespace App\Http\Controllers;

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class MessageController extends Controller
{

    public function sendMessage(Request $request)
    {
        $message = Message::create([
            'user_id' => auth()->id(),
            'receiver_id' => $request->receiver_id,
            'message' => $request->message,
        ]);

        Log::info('Message sent: ', ['message' => $message]);

        broadcast(new MessageSent($message))->toOthers();

        Log::info('MessageSent event broadcasted.');

        return redirect()->route('chat.show', $message['receiver_id'])
            ->with('success', "Message sent successfully");
    }

    public function showChat(User $user)
    {
        $authUserId = auth()->id();
        $messages = Message::with('user')
            ->where(function ($query) use ($authUserId, $user) {
                $query->where('user_id', $authUserId)
                    ->where('receiver_id', $user->id);
            })
            ->orWhere(function ($query) use ($authUserId, $user) {
                $query->where('user_id', $user->id)
                    ->where('receiver_id', $authUserId);
            })
            ->get();

        return Inertia::render(\FilePaths::CHAT, [
            'messages' => $messages,
            'authUser' => auth()->user(),
            'receiver' => $user,
        ]);
    }
}

