export interface IdentityState {
    readonly loading: boolean,
    readonly isAuthenticated: boolean,
    readonly token: string,
    readonly userName: string,
    readonly isAdmin: boolean,
    readonly message: string
}

const initialIdentityState: IdentityState = {
    loading: false,
    isAuthenticated: false,
    token: "",
    userName: "",
    isAdmin: false,
    message: ""
}

export const TRYRESTOREIDENTITY = "TryRestoreIdentity";
export const GETTINGSIGNUP = "GettingSignup";
export const SIGNUPSUCCESS = "SignupSuccess";
export const SIGNUPFAIL = "SignupFail";
export const GETTINGSIGNIN = "GettingSignin";
export const SIGNINSUCCESS = "SigninSuccess";
export const SIGNINFAIL = "SigninFail";
export const SIGNOUT = "Signout";

export const tryRestoreIdentityAction = () => (
    { type: TRYRESTOREIDENTITY } as const
)
export const gettingSignupAction = () => (
    { type: GETTINGSIGNUP } as const
);
export const signupSuccessAction = (token: string, expirationDate: Date, userName: string, isAdmin: boolean) => (
    { type: SIGNUPSUCCESS, token: token, expirationDate: expirationDate, userName: userName, isAdmin: isAdmin } as const
);
export const signupFailAction = (message: string) => (
    { type: SIGNUPFAIL, message: message } as const
);
export const gettingSigninAction = () => (
    { type: GETTINGSIGNIN } as const
);
export const signinSuccessAction = (token: string, expirationDate: Date, userName: string, isAdmin: boolean) => (
    { type: SIGNINSUCCESS, token: token, expirationDate: expirationDate, userName: userName, isAdmin: isAdmin } as const
);
export const signinFailAction = (message: string) => (
    { type: SIGNINFAIL, message: message } as const
);
export const signoutAction = () => (
    { type: SIGNOUT } as const
);

type IdentityActions =
    | ReturnType<typeof tryRestoreIdentityAction>
    | ReturnType<typeof gettingSignupAction>
    | ReturnType<typeof signupSuccessAction>
    | ReturnType<typeof signupFailAction>
    | ReturnType<typeof gettingSigninAction>
    | ReturnType<typeof signinSuccessAction>
    | ReturnType<typeof signinFailAction>
    | ReturnType<typeof signoutAction>;

export const IdentityReducer = (state = initialIdentityState, action: IdentityActions) => {   
    switch (action.type) {
        case TRYRESTOREIDENTITY: {
            const identity = localStorage.getItem("identity");
            if (identity === null) {
                return {
                    ...state
                }
            }

            const identityAsObject = JSON.parse(identity);
            if (identityAsObject.expirationDate >= new Date()){
                return {
                    ...state
                }
            }

            sessionStorage.setItem("authToken", identityAsObject.token);
            return {
                ...state,
                isAuthenticated: true,
                token: identityAsObject.token,
                userName: identityAsObject.userName,
                isAdmin: identityAsObject.isAdmin,
                message: ""
            }
        }
        case GETTINGSIGNUP: {
            return {
                ...state,
                loading: true,
                message: ""
            }
        }
        case SIGNUPSUCCESS: {
            sessionStorage.setItem("authToken", action.token);
            localStorage.setItem("identity", JSON.stringify({
                token: action.token,
                expirationDate: action.expirationDate,
                userName: action.userName,
                isAdmin: action.isAdmin,
            }));
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                token: action.token,
                userName: action.userName,
                isAdmin: action.isAdmin,
                message: ""
            }
        }
        case SIGNUPFAIL: {
            return {
                ...state,
                loading: false,
                message: action.message
            }
        }
        case GETTINGSIGNIN: {
            return {
                ...state,
                loading: true,
                message: ""
            }
        }
        case SIGNINSUCCESS: {
            sessionStorage.setItem("authToken", action.token);
            localStorage.setItem("identity", JSON.stringify({
                token: action.token,
                expirationDate: action.expirationDate,
                userName: action.userName,
                isAdmin: action.isAdmin,
            }));
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                token: action.token,
                userName: action.userName,
                isAdmin: action.isAdmin,
                message: ""
            }
        }
        case SIGNINFAIL: {
            return {
                ...state,
                loading: false,
                message: action.message
            }
        }
        case SIGNOUT: {
            sessionStorage.removeItem("authToken");
            localStorage.removeItem("identity");
            return {
                ...state,
                isAuthenticated: false,
                token: "",
                userName: "",
                isAdmin: false,
                message: ""
            }
        }
        default:
            return state;
    }
}
