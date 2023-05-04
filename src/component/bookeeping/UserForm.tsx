import React, { useState, useEffect } from "react";

export interface UserFormState {
    username: string;
    password: string;
    confirmPassword?: string;
}

interface Props {
    action(type: string, state: UserFormState): Promise<void>;
}

const UserForm = (props: Props) => {
    const [popupType, setPopupType] = useState<string>("close");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [forceUpdate, setForceUpdate] = useState(0);

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

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let state: UserFormState;
        if (popupType === "login") {
            state = {
                username,
                password,
            }
        } else if (popupType === "register") {
            state = {
                username,
                password,
                confirmPassword,
            }
        } else {
            return;
        }
        await props.action(popupType, state);
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
                                        <form onSubmit={handleSubmit}>
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
                                                        onChange={(event) => {setUsername(event.target.value)}}
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
                                                        onChange={(event) => {setPassword(event.target.value)}}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col text-end">
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
                                        <form onSubmit={handleSubmit}>
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
                                                        onChange={(event) => {setUsername(event.target.value)}}
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
                                                        onChange={(event) => {setPassword(event.target.value)}}
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
                                                        onChange={(event) => {setConfirmPassword(event.target.value)}}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col text-end">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary"
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
                <div>
                    <p>123</p>
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
            );
        } else {
            return (
                <div>
                    <button
                        className="btn btn-outline-primary"
                        onClick={() => setPopupType("login")}
                    >
                        Login
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={() => setPopupType("register")}
                    >
                        Register
                    </button>
                </div>
            );
        }
    };

    return (
        <div className="container-fluid">
            <div className="row justify-content-end">
                <div className="col-auto">{userAction()}</div>
            </div>
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
