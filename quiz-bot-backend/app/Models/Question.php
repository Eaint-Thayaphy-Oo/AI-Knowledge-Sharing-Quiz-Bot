<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    protected $fillable = ['question', 'options', 'correctAnswer', 'category_id'];

    protected $casts = [
        'options' => 'array',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
