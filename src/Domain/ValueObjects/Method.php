<?php

namespace StackTrace\Domain\ValueObjects;

class Method {
    private $method;

    public function __construct($method) {
        if (!in_array($method, ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'])) {
            throw new \InvalidArgumentException('Invalid HTTP method');
        }
    }

    public function get() {
        return $this->method;
    }
}
