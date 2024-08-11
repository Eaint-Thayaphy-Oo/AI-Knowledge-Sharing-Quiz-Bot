<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\GameRoom;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class GameController extends Controller
{
    public function createRoom(Request $request)
    {
        $user = $request->user();

        $roomCode = uniqid();

        try {
            $room = DB::transaction(function () use ($user, $roomCode) {
                $room = GameRoom::create([
                    'room_code' => $roomCode,
                    'creator_id' => $user->id,
                ]);

                $room->participants()->attach($user->id);

                return $room;
            });

            return response()->json([
                'status' => 'success',
                'room' => $room,
                'room_code' => $roomCode
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to create room. Please try again.'
            ], 500);
        }
    }

    public function joinRoom(Request $request)
    {
        $user = $request->user();
        $roomCode = $request->room_code;

        $room = GameRoom::where('room_code', $roomCode)->first();

        if (!$room) {
            return response()->json(['message' => 'Room not found. Please check the room code and try again.'], 404);
        }

        try {
            $room->participants()->attach($user->id);

            return response()->json(['message' => 'Successfully joined the room.', 'room' => $room], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to join room. Please try again.'], 500);
        }
    }
}
