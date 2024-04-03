<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCardRequest;
use App\Http\Resources\CardResource;
use App\Models\Card;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CardController extends Controller
{
    public function index()
    {
        $userId = Auth::id();
        $cards = Card::where('user_id', $userId)->get();
        return CardResource::collection($cards);
    }



    public function store(StoreCardRequest $request)
    {

        $userId = Auth::id();

        // mergeuser_id into validated data
        $validatedData = $request->validated();
        $validatedData['user_id'] = $userId;


        $card = Card::create($validatedData);

        // Return new the CardResource
        return new CardResource($card);
    }


    public function update(StoreCardRequest $request, $id)
    {

        $card = Card::find($id);
        if (!$card) {
            return response()->json(['error' => 'Card not found.'], 404);
        }

        //chekc with policies
        if ($request->user()->cannot('update', $card)) {
            abort(403);
        }


        $card->update($request->validated());
        return new CardResource($card);
    }


    public function show(Request $request, $id)
    {
        $card = Card::find($id);
        if (!$card) {
            return response()->json(['error' => 'Card not found.'], 404);
        }

        //chekc with policies
        if ($request->user()->cannot('view', $card)) {
            abort(403);
        }

        return $card;
    }



    public function destroy(Request $request, $id)
    {
        $card = Card::find($id);
        if (!$card) {
            return response()->json(['error' => 'Card not found.'], 404);
        }

        //chekc with policies
        if ($request->user()->cannot('delete', $card)) {
            abort(403);
        }

        $card->delete();
        return response(null, 204);
    }
}
