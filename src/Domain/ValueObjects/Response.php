<?php
namespace StackTrace\Domain\ValueObjects;

class Response {
    private $response;
    
    public function __construct($response) {
        if (!is_array($response)) {
            throw new \InvalidArgumentException('Response must be an array');
        }
        $this->response = $response;
    }

    public function get() {
        return $this->response;
    }
}