class ApiError extends Error {
    constructor(statusCode, message = "something went wrong", error = [], stack = "") {
        super(message);
        this.error = error,
        this.stack = stack,
        this.data = null,
        this.message = message,
        this.sucess = false
        
        if(stack){
            this.stack=stack
        }else{
            Error.captureStackTrace(this,this.constructor)
        }

    }
}