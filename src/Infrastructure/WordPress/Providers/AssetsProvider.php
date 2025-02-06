<?php

namespace Stacktrace\Infrastructure\WordPress\Providers;

use Stacktrace\Infrastructure\Contracts\AssetsProviderInterface;

class AssetsProvider implements AssetsProviderInterface
{
    public function register(): void
    {
        add_action('admin_enqueue_scripts', [$this, 'enqueue']);
    }

    public function enqueue(): void
    {
        wp_enqueue_style(
            'stacktrace-admin-styles', 
            STACKTRACE_URL . 'assets/css/stacktrace.css', 
            [], 
            STACKTRACE_VERSION
        );

        wp_enqueue_script(
            'stacktrace-admin-scripts', 
            STACKTRACE_URL . 'assets/js/stacktrace.js', 
            [], 
            STACKTRACE_VERSION
        );
    }
}   