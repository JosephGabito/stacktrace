<?php

namespace Stacktrace\Infrastructure\Contracts;

interface AssetsProviderInterface
{
    public function register(): void;
    public function enqueue(): void;
}