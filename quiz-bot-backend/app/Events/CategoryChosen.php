<?php

namespace App\Events;

use App\Models\Category;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class CategoryChosen implements ShouldBroadcast
{
    public $category;
    public $gameRoom;

    public function __construct($gameRoom, $categoryId)
    {
        $this->gameRoom = $gameRoom;
        $this->category = Category::find($categoryId);
    }

    public function broadcastOn()
    {
        return new Channel('game-room.' . $this->gameRoom->id);
    }
}
