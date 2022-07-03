import React from "react";
import { AppState } from "../State/Store";
import { useSelector, useDispatch } from "react-redux";
import { gettingSigninAction, signinSuccessAction, signinFailAction } from "../State/IdentityState";
import { setDefaultSettingsAction } from "../State/OperationsState";
import { useNavigate } from "react-router-dom";

import { signin } from "../Data/IdentityData";

import { Page } from "./Page";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

export const SignInPageDemo = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loading = useSelector((state: AppState) => state.identity.loading);

    React.useEffect(() => {
        const doSignin = async () => {
            dispatch(gettingSigninAction());
            const result = await signin({ email: "demo@demo.com", password: "321456" });

            if (result === null) {
                dispatch(signinFailAction("Incorrect email or password."));
                navigate("../", { replace: true });
                return;
            }

            dispatch(setDefaultSettingsAction());
            dispatch(signinSuccessAction(result.token, result.expirationDate, result.userName, result.isAdmin));
            navigate("../", { replace: true });
        };

        doSignin();
    }, []);

    return (
        <Page>
            <Container className="d-flex justify-content-center">

                {
                    loading &&
                    <Row className="d-flex justify-content-center">
                        <div className="spinner-border my-5" role="status" />
                    </Row>
                }

            </Container>
        </Page>
    )
}
