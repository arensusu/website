import React, {useState} from 'react'

import { BASE_API } from "../helper/constants";
import { UserFormState } from "../helper/types";

interface Props {
    setPopupType(type: string): void;
}

const Login = (props: Props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const postLoginApi = async (state: UserFormState) => {
        const api = `${BASE_API}/auth/login`;

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

    const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const state = {
            username,
            password,
        }
        if (!await postLoginApi(state)) {

            return;
        }
        props.setPopupType("close");
    }
    return (
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Login</h5>
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
                            <form onSubmit={handleLoginSubmit}>
                                <div className="row mb-3">
                                    <div className="col-3">
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
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-3">
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
                                        />
                                    </div>
                                </div>
                                <div className="row justify-content-end">
                                    <div className="col text-danger d-none" id="submit-info">
                                        Username or password is wrong.
                                    </div>
                                    <div className="col-auto">
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                        >
                                            Login
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

export default Login;