import { makeHttpRequest } from "../Services/HttpServices";
import appsettings from "../appsettings.json";

export interface IdentityDTO {
    userName: string,
    token: string,
    expirationDate: Date,
    isAdmin: boolean
}

export interface SigninDTO {
    email: string,
    password: string
}

export interface SignupDTO {
    email: string,
    password: string,
    passwordConfirmation: string
}

export const signin = async (signinDTO: SigninDTO): Promise<IdentityDTO | null> => {
    const result = await makeHttpRequest<IdentityDTO, SigninDTO>({
        path: "/identity/signin",
        method: "post",
        body: signinDTO
    });
    
    if (result.ok && result.body) {
        return {
            userName: result.body.userName,
            token: result.body.token,
            expirationDate: new Date(result.body.expirationDate),
            isAdmin: result.body.isAdmin
        };
    } else {
        return null;
    }
}

export const signup = async (signupDTO: SignupDTO): Promise<IdentityDTO | null> => {
    const result = await makeHttpRequest<IdentityDTO, SigninDTO>({
        path: "/identity/signup",
        method: "post",
        body: signupDTO
    });
    
    if (result.ok && result.body) {
        return {
            userName: result.body.userName,
            token: result.body.token,
            expirationDate: result.body.expirationDate,
            isAdmin: result.body.isAdmin
        };
    } else {
        return null;
    }
}

export const signinDemo = async (): Promise<IdentityDTO | null> => {
    const result = await makeHttpRequest<IdentityDTO, SigninDTO>({
        path: "/identity/signin",
        method: "post",
        body: { email: appsettings.demo_user.email, password: appsettings.demo_user.password }
    });
    
    if (result.ok && result.body) {
        return {
            userName: result.body.userName,
            token: result.body.token,
            expirationDate: new Date(result.body.expirationDate),
            isAdmin: result.body.isAdmin
        };
    } else {
        return null;
    }
}
