<?php

namespace App\Http\Controllers;

use App\Events\CategoryChosen;
use App\Events\CategorySelected;
use Illuminate\Http\Request;
use App\Models\GameRoom;
use App\Models\Score;
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

        $updateRoom = $room->update(['is_exit' => true]);

        try {
            $room->participants()->attach($user->id);

            return response()->json(['message' => 'Successfully joined the room.', 'room' => $room], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to join room. Please try again.'], 500);
        }
    }

    public function updateRoomCategory($room_id, $category_id)
    {
        $room = GameRoom::where('id', $room_id)->update(['category_id' => $category_id]);
        return response()->json([
            'status' => 'success',
        ], 201);
    }

    public function saveScore(Request $request)
    {
        \Log::info('Request data: ', $request->all()); // Log request data

        $validated = $request->validate([
            'user_id' => 'required|integer',
            'game_room_id' => 'nullable|integer',
            'category_id' => 'required|integer',
            'level' => 'required|integer',
            'score' => 'required|numeric',
        ]);

        $score = Score::create($validated);

        return response()->json(['message' => 'Score saved successfully', 'score' => $score], 200);
    }


    public function nextLevel(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        // Retrieve the current user's highest level and score
        $currentScore = Score::where('user_id', $request->user_id)
            ->orderBy('level', 'desc')
            ->first();

        $nextLevel = $currentScore ? $currentScore->level + 1 : 1; // Next level logic

        // Create or update the next level with the score (if needed)
        Score::updateOrCreate(
            [
                'user_id' => $request->user_id,
                'level' => $nextLevel
            ],
            [
                'score' => 0 // Set default score for the next level
            ]
        );

        return response()->json([
            'status' => 'success',
            'next_level' => $nextLevel
        ]);
    }

    // public function getScores(Request $request)
    // {
    //     $userId = $request->query('user_id');
    //     $categoryId = $request->query('category_id');
    //     $roomId = $request->query('room_id');

    //     $scores = DB::table('scores')
    //         ->where('user_id', $userId)
    //         ->where('category_id', $categoryId)
    //         ->where('game_room_id', $roomId)
    //         ->distinct()
    //         ->get();

    //     logger($scores);

    //     return response()->json($scores);
    // }

    public function getScores(Request $request)
    {
        $userId = $request->query('user_id');
        $categoryId = $request->query('category_id');
        $roomId = $request->query('room_id');

        $scores = DB::table('scores')
            ->join('users', 'scores.user_id', '=', 'users.id')
            ->where('game_room_id', $roomId)
            ->where('category_id', $categoryId)
            ->select('scores.*', 'users.name as username')
            ->get();

        logger($scores);

        return response()->json($scores);
    }

    // public function getAllUsersScores()
    // {
    //     $scores = DB::table('scores')
    //         ->join('users', 'scores.user_id', '=', 'users.id')
    //         ->select('users.name', 'users.email', 'scores.level', 'scores.score')
    //         ->get();

    //     return response()->json($scores);
    // }

    public function getCurrentUser(Request $request)
    {
        return response()->json($request->user());
    }

    public function getScoresByRoomAndCategory(Request $request, $game_room_id, $category_id)
    {
        $scores = Score::where('game_room_id', $game_room_id)
            ->where('category_id', $category_id)
            ->orderBy('level')
            ->get();

        return response()->json($scores);
    }

    public function getAllUsersScores()
    {
        $scores = DB::table('scores')
            ->join('users', 'scores.user_id', '=', 'users.id')
            ->select(
                'scores.id',
                'scores.game_room_id',
                'scores.category_id',
                'scores.level',
                'scores.score',
                'scores.created_at',
                'scores.updated_at',
                'users.name as username'
            )
            ->orderBy('scores.created_at', 'desc') // Order by created_at if needed
            ->get();

        return response()->json($scores);
    }
}
