<?php

namespace App\Contracts;

interface SendsExpoNotifications
{
    public function privateExpoChannel(): string;
    public function expoToken();
}
