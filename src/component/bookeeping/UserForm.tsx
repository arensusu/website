import React, { useState, useEffect, useRef } from "react";

import { BASE_API } from "../helper/constants";

import Login from "./Login";
import Register from "./Register";

interface Props {
    getJwtToken(): string | null;
}

const UserForm = (props: Props) => {
    const [popupType, setPopupType] = useState<string>("close");
    const [forceUpdate, setForceUpdate] = useState(0);

    const user = useRef("");

    const getUserApi = async () => {
        const api = `${BASE_API}/auth/user`;

        const response = await fetch(api, {
            headers: { "Authorization": `Bearer ${props.getJwtToken()}` },
        });
        if (!response.ok) {
            localStorage.removeItem("jwt");
            return;
        }
        const data = await response.json();
        return data["username"];
    }

    useEffect(() => {
        if (localStorage.getItem("jwt") === null) {
            user.current = "";
            return
        }
        getUserApi().then((username) => {
            user.current = username;
            setForceUpdate(forceUpdate + 1);
        });
        return;
    }, [popupType])

    const popupPage = (type: string) => {
        switch (type) {
            case "login":
                return <Login setPopupType={setPopupType} />;
            case "register":
                return <Register setPopupType={setPopupType} />;
            default:
                return undefined;
        }
    };

    const userAction = () => {
        if (localStorage.getItem("jwt") !== null) {
            return (
                <div className="row justify-content-end">
                    <div className="col-auto">
                        <p className="fs-5 mt-1 mb-0">{user.current}</p>
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
            {popupType !== "close" ? <><div className="modal d-block bg-secondary opacity-50" id="modal-bg"></div>
                <div className="modal d-block" id="popup">
                    <div className="modal-dialog modal-dialog-centered modal">
                        {popupPage(popupType)}
                    </div>
                </div></> : undefined}
        </div>
    );
};

export default UserForm;
