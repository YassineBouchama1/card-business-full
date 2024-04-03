<?php

use App\Models\Card;


it('test access cards with pest unAuth', function () {
    $this->getJson('/api/cards')
        //assert unauthorized access
        ->assertStatus(401);
});


it('create card', function () {
    $product = new Card([
        'name' => 'card1',
        'company' => "company",
        'title' => "title",
        'contact' => "0638790915",
    ]);
    expect($product->name)->toBe('card1');
    expect($product->company)->toBe('company');
});
