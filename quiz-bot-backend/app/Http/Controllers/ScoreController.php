<?php

namespace App\Http\Controllers;

use App\Models\Score;
use Illuminate\Http\Request;

class ScoreController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->input('user_id');
        $scores = Score::where('user_id', $userId)->get();
        return response()->json($scores);
    }

    // public function store(Request $request)
    // {
    //     $validated = $request->validate([
    //         'user_id' => 'required|exists:users,id',
    //         'level' => 'required|integer',
    //         'score' => 'required|integer',
    //     ]);

    //     // Check if the score for this level exists, if yes, update, else create new
    //     $score = Score::updateOrCreate(
    //         [
    //             'user_id' => $validated['user_id'],
    //             'level' => $validated['level']
    //         ],
    //         [
    //             'score' => $validated['score'],
    //             'total_score' => Score::where('user_id', $validated['user_id'])->sum('score') + $validated['score']
    //         ]
    //     );

    //     return response()->json(['message' => 'Score saved successfully', 'total_score' => $score->total_score]);
    // }

    public function store(Request $request)
    {
        // Validate request data
        $validatedData = $request->validate([
            'user_id' => 'required|integer',
            'score' => 'required|integer',
            // any other required fields
        ]);

        // Create score entry
        try {
            $score = Score::create($validatedData);
            return response()->json($score, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
