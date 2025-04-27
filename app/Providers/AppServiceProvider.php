<?php

namespace App\Providers;

use App\Contracts\DomainSearchInterface;
use App\Services\DomainSearch\WhoisDomainSearchService;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * All of the container bindings that should be registered.
     *
     * @var array
     */
    public $bindings = [
        DomainSearchInterface::class => WhoisDomainSearchService::class,
    ];

    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        URL::forceHttps($this->app->environment('production'));
    }
}
