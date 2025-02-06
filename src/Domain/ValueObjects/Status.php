<?php
namespace StackTrace\Domain\ValueObjects;

class Status {
    private $status;

    public function __construct($status) {
        if (!is_int($status) || $status < 100 || $status >= 600) {
            throw new \InvalidArgumentException('Invalid HTTP status code');
        }
        $this->status = $status;
    }
    
    public function get() {
        return $this->status;
    }
}
