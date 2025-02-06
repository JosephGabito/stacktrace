<?php
namespace StackTrace\Domain\ValueObjects;

class Url {
    private $url;
    
    public function __construct($url) {
        if (!filter_var($url, FILTER_VALIDATE_URL)) {
            throw new \InvalidArgumentException('Invalid URL');
        }
        $this->url = $url;
    }

    public function get() {
        return $this->url;
    }
}
