<?php

namespace App\Contracts;

use App\Data\DomainResult;

interface DomainSearchInterface
{
    public function get(string $domain): ?DomainResult;
}
