import React from "react";
import { AppState } from "../State/Store";
import { useSelector, useDispatch } from "react-redux";
import { gettingSigninAction, signinSuccessAction, signinFailAction } from "../State/IdentityState";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { signin } from "../Data/IdentityData";

import { Page } from "./Page";

import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

export const SignInPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loading = useSelector((state: AppState) => state.identity.loading);
    const message = useSelector((state: AppState) => state.identity.message);

    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onBlur" });

    const submitSignin = async (data: any) => {        
        dispatch(gettingSigninAction());
        const result = await signin({ email: data.email, password: data.password });

        if (result === null) {
            dispatch(signinFailAction("Incorrect email or password."));
            return;
        }

        dispatch(signinSuccessAction(result.token, result.expirationDate, result.userName, result.isAdmin));
        navigate("../", { replace: true });
    }

    return (
        <Page>
            <Container className="d-flex justify-content-center">

                {
                    loading ?
                    (
                        <Row className="d-flex justify-content-center">
                            <div className="spinner-border my-5" role="status" />
                        </Row>
                    )
                    :
                    (
                        <Form className="my-3 col-6" onSubmit={handleSubmit(submitSignin)}>

                            {
                                message &&
                                <div className="d-grid mx-auto text-center">
                                    <h6 className="text-danger">
                                        {message}
                                    </h6>
                                </div>
                            }

                            <FloatingLabel label="Email" className="mb-3">
                                <Form.Control
                                    type="email" placeholder="Enter email"
                                    {...register("email", { required: true })} />
                            </FloatingLabel>
                            {
                                errors?.email?.type === "required" &&
                                <Form.Text muted>
                                    <p className="text-danger">Email is required</p>
                                </Form.Text>
                            }
                            
                            <FloatingLabel label="Password" className="mb-3">
                                <Form.Control
                                    type="password" placeholder="Enter password"
                                    {...register("password", { required: true })} />
                            </FloatingLabel>
                            {
                                errors?.password?.type === "required" &&
                                <Form.Text muted>
                                    <p className="text-danger">Password is required</p>
                                </Form.Text>
                            }

                            <div className="d-grid col-6 mx-auto mb-3">
                                <Button type="submit" variant="btn btn-success" size="lg">Sign in</Button>
                            </div>

                            <div className="d-grid mx-auto text-center">
                                <Form.Text>
                                    New to Personal Budget? <Link to="/signup">Create an account</Link>.
                                </Form.Text>
                            </div>
                            
                        </Form>
                    )
                }

            </Container>
        </Page>
    )
}
