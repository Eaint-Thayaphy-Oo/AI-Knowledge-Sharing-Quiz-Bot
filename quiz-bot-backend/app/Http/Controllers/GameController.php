<?php

namespace App\Http\Controllers;

use App\Events\CategoryChosen;
use App\Events\CategorySelected;
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

    public function selectCategory(Request $request)
    {
        // Debugging line to inspect the incoming request data
        dd($request->all());

        $request->validate([
            'category_id' => 'required|integer',
            'room_code' => 'required|string',
        ]);

        // Proceed with the logic after validation
        $category_id = $request->input('category_id');
        $room_code = $request->input('room_code');

        // Broadcast to the room
        event(new CategorySelected($room_code, $category_id));

        return response()->json(['success' => true]);
    }

    public function chooseCategory(Request $request)
    {
        $categoryId = $request->input('category_id');
        $gameRoomId = $request->input('game_room_id');

        // Save category selection to the database
        $gameRoom = GameRoom::find($gameRoomId);
        $gameRoom->category_id = $categoryId;
        $gameRoom->save();

        // Broadcast category selection to other players
        broadcast(new CategoryChosen($gameRoom, $categoryId))->toOthers();

        return response()->json(['success' => true, 'message' => 'Category chosen']);
    }
}
