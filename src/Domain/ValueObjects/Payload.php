<?php
namespace StackTrace\Domain\ValueObjects;

class Payload {
    private $payload;

    public function __construct($payload) {
        if (!is_array($payload)) {
            throw new \InvalidArgumentException('Payload must be an array');
        }
        $this->payload = $payload;
    }

    public function get() {
        return $this->payload;
    }
}