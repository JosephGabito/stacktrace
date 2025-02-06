<?php
namespace StackTrace\Domain\ValueObjects;

class Time {
    private $time;

    public function __construct($time) {
        if (!is_numeric($time) || $time < 0) {
            throw new \InvalidArgumentException('Invalid time');
        }
        $this->time = $time;
    }

    public function get() {
        return $this->time;
    }
}   
