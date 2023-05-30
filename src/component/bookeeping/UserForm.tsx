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

    const popupPage = (type: string) => {
        switch (type) {
            case "login":
                return <Login setPopupType={setPopupType} />;
            case "register":
                return <Register setPopupType={setPopupType} />;
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
