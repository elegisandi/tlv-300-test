<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class DomainResult extends Data
{
    public function __construct(
        public string $domainName,
        public string $domainRegistrarName,
        public string $domainCreatedDate,
        public string $domainExpiresDate,
        public int $domainEstimatedAge,

        /**
         * @var array<string>|null
         */
        public ?array $domainHostNames,

        public ?string $contactRegistrantName,
        public ?string $contactTechnicalName,
        public ?string $contactAdministrativeName,
        public ?string $contactEmail,
    ) {}
}
