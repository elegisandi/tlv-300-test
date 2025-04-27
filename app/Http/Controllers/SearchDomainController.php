<?php

namespace App\Http\Controllers;

use App\Contracts\DomainSearchInterface;
use App\Http\Requests\SearchDomainRequest;
use Inertia\Inertia;

class SearchDomainController extends Controller
{
    public function __invoke(SearchDomainRequest $request, DomainSearchInterface $domainSearchService)
    {
        try {
            $domain = $request->validated('domain');

            if ($domain) {
                $result = $domainSearchService->get($domain);

                $animate = $result && ! session('has_result', false);

                session(['has_result' => (bool) $result]);

                return Inertia::render('search/index', compact('result', 'domain', 'animate'));
            }
        } catch (\Exception $e) {
            return back()
                ->withError($e->getMessage());
        }

        session(['has_result' => false]);

        return Inertia::render('search/index');
    }
}
