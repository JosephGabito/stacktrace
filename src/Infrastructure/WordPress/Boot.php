<?php

namespace Stacktrace\Infrastructure\WordPress;

use Stacktrace\Infrastructure\WordPress\Providers\MainAssetsProvider;

class Boot
{
    private $providers;

    public function __construct()
    {
        $this->providers = [
            new MainAssetsProvider(),
        ];
    }

    public function boot(): void
    {
        foreach ($this->providers as $provider) {
            $provider->register();
        }
    }
}   
