<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CardResource extends JsonResource
{
    public function convertDatetimeString(string $datetimeString): string
    {
        // Parse the datetime string with Carbon
        $dateTime = Carbon::parse($datetimeString);

        // Format the datetime object to YYYY-MM-DD format
        return $dateTime->format('Y-m-d');
    }

    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'company' => $this->company,
            'title' => $this->title,
            'contact' => $this->contact,
            'created_at' => $this->convertDatetimeString($this->created_at),
        ];
    }
}
