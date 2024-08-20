<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class CategorySelected implements ShouldBroadcast
{
    public $category_id;
    public $room_code;

    public function __construct($room_code, $category_id)
    {
        $this->category_id = $category_id;
        $this->room_code = $room_code;
    }

    public function broadcastOn()
    {
        return new Channel('room.' . $this->room_code);
    }
}
