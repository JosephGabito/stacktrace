<?php

namespace StackTrace\Domain;

use StackTrace\Domain\ValueObjects\Method;
use StackTrace\Domain\ValueObjects\Url;
use StackTrace\Domain\ValueObjects\Status;
use StackTrace\Domain\ValueObjects\Time;
use StackTrace\Domain\ValueObjects\Stack;
use StackTrace\Domain\ValueObjects\Payload;
use StackTrace\Domain\ValueObjects\Response;

class HttpRequest {

    const SLOW_TIME_THRESHOLD = 1000;
    const SUCCESS_STATUS_THRESHOLD = 200;
    const REDIRECT_STATUS_THRESHOLD = 300;
    const ERROR_STATUS_THRESHOLD = 400;

    protected Url $url;
    protected Method $method;
    protected Status $status;
    protected Time $time;
    protected Stack $stack;
    protected Payload $payload;
    protected Response $response;

    public function __construct(Url $url, Method $method, Status $status, Time $time, Stack $stack, Payload $payload, Response $response) {
        $this->url = $url;
        $this->method = $method;
        $this->status = $status;
        $this->time = $time;
        $this->stack = $stack;
        $this->payload = $payload;
        $this->response = $response;
    }

    public function isSlow(): bool {
        return $this->time->get() > self::SLOW_TIME_THRESHOLD;
    }

    public function isError(): bool {
        return $this->status->get() >= self::ERROR_STATUS_THRESHOLD;
    }

    public function isSuccess(): bool {
        return $this->status->get() >= self::SUCCESS_STATUS_THRESHOLD 
            && $this->status->get() < self::REDIRECT_STATUS_THRESHOLD;
    }

    public function isRedirect(): bool {
        return $this->status->get() >= self::REDIRECT_STATUS_THRESHOLD 
            && $this->status->get() < self::ERROR_STATUS_THRESHOLD;
    }
}