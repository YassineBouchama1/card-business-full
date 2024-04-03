<?php

namespace Tests\Feature;

use App\Models\Card;
use App\Models\User;
use Tests\TestCase;

class CardTest extends TestCase
{
    public function testUnauthorizedAccessToCardList()
    {
        $this->getJson('api/cards')
            //assert unauthorized access
            ->assertStatus(401);
    }



    public function testCreateCardFailsWithoutAuthorization()
    {
        $data = [
            'name' => 'card1',
            'company' => "company",
            'title' => "title",
            'contact' => "0638790915",
        ];



        $this->postJson('api/cards', $data)
            //assert unauthorized creation
            ->assertStatus(401);
    }


    //testing create card with auth
    public function testCreateCardWithAuthorization()
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->postJson('api/cards', [
                'name' => 'card1',
                'company' => "company",
                'title' => "title",
                'contact' => "0638790915",

            ])
            //   assert successful created
            ->assertStatus(201);
        // ->assertJsonStructure([
        //     'id',
        //     'name',
        //     'company',
        // ]);
    }


    //testing update card
    public function testUpdateCardWithAuthorization()
    {
        $user = User::factory()->create();
        $card = Card::create([
            'name' => 'card1',
            'company' => "company",
            'title' => "title",
            'contact' => "0638790915",
            'user_id' => $user->id
        ]);

        $this->actingAs($user)
            ->putJson('api/cards/' . $card->id, [
                'name' => 'Updated Card Name',
                'company' => 'Updated Company',
            ])
            //   assert successful update
            ->assertStatus(200);
    }


    public function testDeleteCard()
    {
        $user = User::factory()->create();
        $card = Card::create([
            'name' => 'card1',
            'company' => "company",
            'title' => "title",
            'contact' => "0638790915",
            'user_id' => $user->id
        ]);

        $this->actingAs($user)
            ->deleteJson('api/cards/' . $card->id)
            //assert successful delete
            ->assertStatus(204);
    }
}
