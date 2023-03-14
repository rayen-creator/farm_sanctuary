export interface DriverResponse {

    createdeliveryAgent: {
        message: string;
        emailExists: Boolean;
        loginExists: Boolean;
    }
}