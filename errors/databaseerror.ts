class DatabaseErrror extends Error {
    status: string;
    message: string;

    constructor(status: string, message: string) {
        super(message);
        this.status = status;
        this.message = message;
    }
}

class NotAuthenticatedError extends DatabaseErrror {
    constructor() {
        super('AUTH_DENIED', 'User not authenticated.');
    }
}

class AccessDeniedError extends DatabaseErrror {
    constructor() {
        super('ACCESS_DENIED', 'Access to this resource denied.');
    }
}

class SupabaseError extends DatabaseErrror {
    constructor() {
        super('SUPABASE_ERR', ` Supabase error occurred.`);
    }
}

class UnhandledError extends DatabaseErrror {
    constructor() {
        super("UNHANDLED_ERR", 'Internal Server Error.');
    }
}

export { NotAuthenticatedError, AccessDeniedError, SupabaseError, UnhandledError };