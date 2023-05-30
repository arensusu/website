import React, {useState, useRef, useEffect} from 'react'

import { BASE_API } from "../helper/constants";
import { UserFormState } from "../helper/types";

interface Props {
    setPopupType(type: string): void;
}

const Register = (props: Props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const registerForm = useRef<HTMLFormElement>(null);

    useEffect(() => {
        const input = document.getElementById("confirm-password");
        if (password !== confirmPassword) {
            input?.classList.add("is-invalid");
        } else {
            input?.classList.remove("is-invalid");
        }
    }, [password, confirmPassword]);

    const postRegisterApi = async (state: UserFormState) => {
        const api = `${BASE_API}/auth/register`;

        const response = await fetch(api, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(state),
        });
        if (!response.ok) {
            return false;
        }

        const data = await response.json();
        localStorage.setItem("jwt", data.jwt);
        return true;
    }

    const handleRegisterSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!registerForm.current?.checkValidity()) {
            registerForm.current?.classList.add("was-validated");
            return;
        }
        if (password !== confirmPassword) {
            return;
        }

        const state = {
            username,
            password,
        }
        if (!await postRegisterApi(state)) {

            return;
        }
        props.setPopupType("close");
    }

    return (
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Register</h5>
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => props.setPopupType("close")}
                />
            </div>
            <div className="modal-body">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <form onSubmit={handleRegisterSubmit} className="needs-validation" noValidate ref={registerForm}>
                                <div className="row mb-3">
                                    <div className="col-5">
                                        <label
                                            htmlFor="username"
                                            className="col-form-label"
                                        >
                                            Username
                                        </label>
                                    </div>
                                    <div className="col">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="username"
                                            onChange={(event) => { setUsername(event.target.value) }}
                                            required
                                        />
                                        <div className="invalid-feedback">Please Enter a username</div>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-5">
                                        <label
                                            htmlFor="password"
                                            className="col-form-label"
                                        >
                                            Password
                                        </label>
                                    </div>
                                    <div className="col">
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            onChange={(event) => { setPassword(event.target.value) }}
                                            required
                                        />
                                        <div className="invalid-feedback">Please Enter a password</div>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-5">
                                        <label
                                            htmlFor="confirm-password"
                                            className="col-form-label"
                                        >
                                            Confirm Password
                                        </label>
                                    </div>
                                    <div className="col">
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="confirm-password"
                                            onChange={(event) => { setConfirmPassword(event.target.value) }}
                                        />
                                        <div className="invalid-feedback">Confirm password is wrong.</div>
                                    </div>
                                </div>
                                <div className="row justify-content-end">
                                    <div className="col text-danger d-none" id="submit-info">
                                        User is existed.
                                    </div>
                                    <div className="col-auto">
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            id="submit"
                                        >
                                            Register
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;