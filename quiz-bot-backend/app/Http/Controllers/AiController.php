<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AiController extends Controller
{
    public function askAi(Request $request)
    {
        $question = $request->input('prompt');
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . env('OPENAI_API_KEY')
        ])->post('https://api.openai.com/v1/engines/gpt-3.5-turbo/completions', [
            'model' => 'text-davinci-003',
            'prompt' => $question,
            'max_tokens' => 50,
        ]);

        return response()->json($response->json());
    }

    public function getHint(Request $request)
    {
        $client = new Client();
        $response = $client->post('https://api.openai.com/v1/engines/gpt-3.5-turbo/completions', [
            'headers' => [
                'Authorization' => 'Bearer ' . env('OPENAI_API_KEY'),
                'Content-Type'  => 'application/json',
            ],
            'json' => [
                'prompt' => $request->input('prompt'),
                'max_tokens' => 50,
            ],
        ]);

        return response()->json(json_decode($response->getBody(), true));
    }
}
