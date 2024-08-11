<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Question;
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

    public function getCategories()
    {
        $categories = Category::all();
        return response()->json($categories, 200);
    }

    public function createQuestion(Request $request)
    {
        $validated = $request->validate([
            'question' => 'required|string',
            'options' => 'required|array|min:4|max:4',
            'correctAnswer' => 'required|integer|between:0,3',
            'category_id' => 'required|exists:categories,id',
        ]);

        $question = Question::create($validated);

        return response()->json($question, 201);
    }

    public function updateQuestion(Request $request, $id)
    {
        $validated = $request->validate([
            'question' => 'required|string',
            'options' => 'required|array|min:4|max:4',
            'correctAnswer' => 'required|integer|between:0,3',
            'category_id' => 'required|exists:categories,id',
        ]);

        $question = Question::findOrFail($id);
        $question->update($validated);

        return response()->json($question);
    }

    public function deleteQuestion($id)
    {
        $question = Question::findOrFail($id);
        $question->delete();

        return response()->json(null, 204);
    }

    public function getQuestions()
    {
        try {
            $questions = Question::all();
            return response()->json($questions, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch questions.'], 500);
        }
    }
}
