<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Question;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function createCategory(Request $request)
    {
        $request->validate(['name' => 'required|string']);
        $category = Category::create(['name' => $request->input('name')]);
        return response()->json($category, 201);
    }

    public function updateCategory(Request $request, $id)
    {
        $category = Category::findOrFail($id);
        $request->validate(['name' => 'required|string']);
        $category->update(['name' => $request->input('name')]);
        return response()->json($category);
    }

    public function deleteCategory($id)
    {
        $category = Category::findOrFail($id);
        $category->delete();
        return response()->json(null, 204);
    }

    public function getCategories(Request $request)
    {
        $categories = Category::all();
        return response()->json($categories, 200);
    }


    public function createQuestion(Request $request)
    {
        $request->validate([
            'question' => 'required|string',
            'options' => 'required|array',
            'correctAnswer' => 'required|integer',
            'category_id' => 'required|exists:categories,id',
            'level' => 'required|integer|in:1,2,3'
        ]);

        $question = Question::create($request->all());
        return response()->json($question, 201);
    }

    public function updateQuestion(Request $request, $id)
    {
        $request->validate([
            'question' => 'required|string',
            'options' => 'required|array',
            'correctAnswer' => 'required|integer',
            'category_id' => 'required|exists:categories,id',
            'level' => 'required|integer|in:1,2,3'
        ]);

        $question = Question::findOrFail($id);
        $question->update($request->all());
        return response()->json($question);
    }

    public function deleteQuestion($id)
    {
        $question = Question::findOrFail($id);
        $question->delete();

        return response()->json(null, 204);
    }

    public function getQuestions(Request $request)
    {
        $categoryId = $request->input('category_id');
        $level = $request->input('level', 1);

        $questions = Question::where('category_id', $categoryId)
            ->where('level', $level)
            ->get();

        return response()->json($questions);
    }
    // public function getQuestions(Request $request)
    // {
    //     $level = $request->query('level');
    //     return Question::where('level', $level)->get();
    // }

    public function getUsers()
    {
        $users = User::all();
        return response()->json($users);
    }
}
