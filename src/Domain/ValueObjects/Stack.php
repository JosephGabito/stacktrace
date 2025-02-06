<?php
namespace StackTrace\Domain\ValueObjects;

class Stack {
    private $stack;
    public function __construct($stack) {
        if (!is_array($stack)) {
            throw new \InvalidArgumentException('Stack must be an array');
        }
        $this->stack = $stack;
    }

    public function get() {
        return $this->stack;
    }
}