import React from "react";
import { AppState } from "../State/Store";
import { useSelector, useDispatch } from "react-redux";
import { gettingSignupAction, signupSuccessAction, signupFailAction } from "../State/IdentityState";
import { setDefaultSettingsAction } from "../State/OperationsState";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { signup } from "../Data/IdentityData";

import { Page } from "./Page";

import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

export const SignUpPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loading = useSelector((state: AppState) => state.identity.loading);
    const message = useSelector((state: AppState) => state.identity.message);

    const formSchema = Yup.object().shape({
        email: Yup.string()
            .required("Email is required")
            .email("Incorrect email"),
        password: Yup.string()
            .required("Password is required")
            .min(6, "Password must be at 6 char long"),
        passwordConfirmation: Yup.string()
            .required("Confirmation is required")
            .oneOf([Yup.ref("password")], "Passwords does not match"),
      })

    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onBlur", resolver: yupResolver(formSchema) });

    const submitSignup = async (data: any) => {        
        dispatch(gettingSignupAction());
        const result = await signup({
            email: data.email,
            password: data.password,
            passwordConfirmation: data.passwordConfirmation
        });

        if (result === null) {
            dispatch(signupFailAction("Email is already taken."));
            return;
        }

        dispatch(setDefaultSettingsAction());
        dispatch(signupSuccessAction(result.token, result.expirationDate, result.userName, result.isAdmin));
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
                    <Form className="my-3 col-6" onSubmit={handleSubmit(submitSignup)}>

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
                                {...register("email")} />
                        </FloatingLabel>
                        {
                            errors?.email &&
                            <Form.Text muted>
                                <p className="text-danger">{errors?.email.message}</p>
                            </Form.Text>
                        }
                        
                        <FloatingLabel label="Password" className="mb-3">
                            <Form.Control
                                type="password" placeholder="Enter password"
                                {...register("password")} />
                        </FloatingLabel>
                        {
                            errors?.password &&
                            <Form.Text muted>
                                <p className="text-danger">{errors?.password.message}</p>
                            </Form.Text>
                        }

                        <FloatingLabel label="Password confirmation" className="mb-3">
                            <Form.Control
                                type="password" placeholder="Confirm password"
                                {...register("passwordConfirmation")} />
                        </FloatingLabel>
                        {
                            errors?.passwordConfirmation &&
                            <Form.Text muted>
                                <p className="text-danger">{errors?.passwordConfirmation.message}</p>
                            </Form.Text>
                        }

                        <div className="d-grid col-6 mx-auto mb-3">
                            <Button type="submit" variant="btn btn-success" size="lg">Sign up</Button>
                        </div>

                        <div className="d-grid mx-auto text-center">
                            <Form.Text>
                                Already has an account? <Link to="/signin">Sign in</Link>!
                            </Form.Text>
                        </div>
                        
                    </Form>
                )
            }

            </Container>
        </Page>
    );
}
