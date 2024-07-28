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
        $request->validate([
            'question' => 'required|string',
            'answer' => 'required|string',
            'categoryId' => 'required|integer|exists:categories,id',
        ]);

        $question = Question::create([
            'question' => $request->input('question'),
            'answer' => $request->input('answer'),
            'category_id' => $request->input('categoryId'),
        ]);

        return response()->json($question, 201);
    }


    public function getQuestions($categoryId)
    {
        $questions = Question::where('category_id', $categoryId)->get();
        return response()->json($questions, 200);
    }

    // Add methods for updating and deleting categories and questions
}
