class DatabaseError extends Error {
    code: string;
    
    constructor(message: string, code: string) {
        super(message);
        this.code = code;
    }
}

class NotAuthenticatedError extends DatabaseError {
    constructor(message: string) {
        super(message, 'AUTH_DENIED');
    }
}

class AccessDeniedError extends DatabaseError {
    constructor(message: string) {
        super(message, 'ACCESS_DENIED');
    }
}

class SupabaseError extends DatabaseError {
    constructor(message: string) {
        super(message, 'SUPABASE_ERR');
    }
}
class UnhandledError extends DatabaseError {
    constructor(message: string) {
        super(message, 'UNHANDLED_ERROR');
    }
}

export { NotAuthenticatedError, AccessDeniedError, SupabaseError, UnhandledError };