<?php

namespace Stacktrace\Infrastructure\WordPress;

use Stacktrace\Infrastructure\WordPress\Providers\AssetsProvider;

class Boot
{
    private $providers;

    public function __construct()
    {
        $this->providers = [
            new AssetsProvider(),
        ];
    }

    public function boot(): void
    {
        foreach ($this->providers as $provider) {
            $provider->register();
        }
    }
}   
