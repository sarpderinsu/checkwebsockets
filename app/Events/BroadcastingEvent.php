<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class BroadcastingEvent implements ShouldBroadcast
{

    public string $stringy;

    public function __construct(string $stringy)
    {
        $this->stringy = $stringy;
    }

    public function broadcastOn(): string
    {
        return 'something';
    }
}
