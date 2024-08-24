<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Queue\SerializesModels;

class CategorySelected
{
    use InteractsWithSockets, SerializesModels;

    public $roomCode;
    public $categoryId;

    public function __construct($roomCode, $categoryId)
    {
        $this->roomCode = $roomCode;
        $this->categoryId = $categoryId;
    }

    public function broadcastOn()
    {
        return new PresenceChannel('room.' . $this->roomCode);
    }
}
