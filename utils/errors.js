export class InvalidHeaderToken extends Error {
    constructor() {
        super("Invalid token");
    }
} 

export class AuthenticationError extends Error {
    constructor() {
        super("Authentication failed");
    }
}

export class NotFoundError extends Error {
    constructor(message) {
        super(message);
    }
}


export class BadRequestError extends Error {
    constructor(message) {
        super(message);
    }
}

export class ValidationError extends Error {
    constructor(message) {
        super(message);
    }
}

export class UnauthorizedError extends Error {
    constructor(message) {
        super(message);
    }
}

export class NotAcceptableError extends Error {
    constructor(message) {
        super(message);
    }
}


