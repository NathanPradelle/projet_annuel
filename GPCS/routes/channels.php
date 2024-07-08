<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::routes();

Broadcast::channel('chat.{userId}.{receiverId}', function ($user, $userId, $receiverId) {
    return true; // Permet à tous les utilisateurs de s'abonner aux canaux publics
});
