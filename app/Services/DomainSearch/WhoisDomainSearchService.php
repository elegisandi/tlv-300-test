<?php

namespace App\Services\DomainSearch;

use App\Contracts\DomainSearchInterface;
use App\Data\DomainResult;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class WhoisDomainSearchService implements DomainSearchInterface
{
    private string $url = 'https://www.whoisxmlapi.com/whoisserver/WhoisService';

    private const TIMEOUT = 60;

    /**
     * @throws \Illuminate\Http\Client\RequestException|\Exception
     */
    public function get(string $domain): DomainResult
    {
        $cache_key = "whois:{$domain}";
        $cache_ttl = now()->addDay();

        $result = Cache::remember($cache_key, $cache_ttl, function () use ($domain) {
            $response = Http::withToken(config('services.whois.key'))
                ->timeout(self::TIMEOUT)
                ->post($this->url, [
                    'domainName' => $domain,
                    'outputFormat' => 'JSON',
                ])
                ->throw()
                ->json();

            if (isset($response['ErrorMessage'])) {
                throw new \Exception($response['ErrorMessage']['msg'] ?? 'API error occurred, please try again later.');
            }

            return $response['WhoisRecord'];
        });

        return new DomainResult(
            $this->parseResponse($result, 'domainName'),
            $this->parseResponse($result, 'registrarName'),
            $this->parseResponse($result, 'createdDate'),
            $this->parseResponse($result, 'expiresDate'),
            $this->parseResponse($result, 'estimatedDomainAge', false),
            $this->parseResponse($result, 'nameServers.hostNames'),
            $this->parseResponse($result, 'registrant.name', false),
            $this->parseResponse($result, 'technicalContact.name', false),
            $this->parseResponse($result, 'administrativeContact.name', false),
            $this->parseResponse($result, 'contactEmail', false),
        );
    }

    private function parseResponse(array $result, string $key, bool $fallbackRegistryData = true): mixed
    {
        $value = data_get($result, $key);

        if (empty($value) && $fallbackRegistryData) {
            $value = data_get($result, "registryData.$key");
        }

        return $value;
    }
}
