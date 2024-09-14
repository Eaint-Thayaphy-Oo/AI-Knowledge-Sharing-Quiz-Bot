<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Score extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'game_room_id', 'category_id', 'level', 'score'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function gameRoom()
    {
        return $this->belongsTo(GameRoom::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
