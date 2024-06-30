<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\GameRoom;
use App\Models\User;

class GameController extends Controller
{
    public function createRoom(Request $request)
    {
        $user = $request->user();

        // Generate a unique room code
        $roomCode = uniqid();

        // Create the room
        $room = GameRoom::create([
            'room_code' => $roomCode,
            'creator_id' => $user->id,
        ]);

        return response()->json([
            'status' => 'success',
            'room' => $room,
            'room_code' => $roomCode
        ], 201);
    }


    public function joinRoom(Request $request)
    {
        $user = $request->user();
        $room = GameRoom::where('room_code', $request->room_code)->first();

        if (!$room) {
            return response()->json(['message' => 'Room not found. Please check the room code and try again.'], 404);
        }

        if ($room->creator_id == $user->id) {
            return response()->json(['message' => 'You cannot join a room you created.'], 400);
        }

        $room->participants()->attach($user->id);

        return response()->json(['message' => 'Successfully joined the room.', 'room' => $room], 200);
    }


    // Add other necessary methods here (submitAnswer, getQuestions, getScores)
}
