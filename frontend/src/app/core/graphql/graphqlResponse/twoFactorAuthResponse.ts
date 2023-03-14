export interface VerifyOTPResponse {

    verifyOTP: {
        message: string; 
        statusCode:boolean;
     
    }
}
export interface SendOTPMutationResponse {

    sendOTPVerificationEmail: {
        message: string; 
        statusCode:boolean;
     
    }
}

