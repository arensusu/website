import React, { useState, useEffect, useRef } from "react";

export interface UserFormState {
    username: string;
    password: string;
}

interface Props {
    login(state: UserFormState): Promise<boolean>;
    register(state: UserFormState): Promise<boolean>;
}

const UserForm = (props: Props) => {
    const [popupType, setPopupType] = useState<string>("close");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [forceUpdate, setForceUpdate] = useState(0);

    const user = useRef("");

    useEffect(() => {
        const modal = document.getElementById("popup");
        if (modal === null) return;

        if (popupType === "close") {
            modal.style.display = "none";
            modal.className = "modal fade";
        } else {
            modal.style.display = "block";
            modal.className = "modal fade show";
        }
    }, [popupType]);

    useEffect(() => {
        if (popupType === "register") {
            const input = document.getElementById("confirm-password");
            if (password !== confirmPassword) {
                input?.classList.add("is-invalid");
            } else {
                input?.classList.remove("is-invalid");
            }
        }
    }, [password, confirmPassword]);

    const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const state = {
            username,
            password,
        }
        if (!await props.login(state)) {

            return;
        }
        user.current = username;
        setPopupType("close");
    }

    const handleRegisterSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            return;
        }

        const state = {
            username,
            password,
        }
        if (!await props.register(state)) {

            return;
        }
        user.current = username;
        setPopupType("close");
    }

    const popupPage = (type: string) => {
        switch (type) {
            case "login":
                return (
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Login</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={() => setPopupType("close")}
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
            case "register":
                return (
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Register</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={() => setPopupType("close")}
                            />
                        </div>
                        <div className="modal-body">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col">
                                        <form onSubmit={handleRegisterSubmit}>
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
                                                    />
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
                                                    />
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
            case "close":
                return <div className="modal-content"></div>;
            default:
                return undefined;
        }
    };

    const userAction = () => {
        if (localStorage.getItem("jwt") !== null) {
            return (
                <div className="row justify-content-end">
                    <div className="col-auto">
                        <p>{user.current}</p>
                    </div>
                    <div className="col-auto">
                    <button
                        className="btn btn-danger"
                        onClick={() => {
                            localStorage.removeItem("jwt");
                            setForceUpdate(forceUpdate + 1);
                        }}
                    >
                        Logout
                    </button>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="row justify-content-end">
                    <div className="col-auto">
                    <button
                        className="btn btn-outline-primary"
                        onClick={() => setPopupType("login")}
                    >
                        Login
                    </button>
                    </div>
                    <div className="col-auto">
                    <button
                        className="btn btn-primary"
                        onClick={() => setPopupType("register")}
                    >
                        Register
                    </button>
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="container-fluid">
            {userAction()}
            <div className="row">
                <div className="modal fade" id="popup">
                    <div className="modal-dialog modal-dialog-centered modal">
                        {popupPage(popupType)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserForm;
