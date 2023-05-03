import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 px-0">
                    <nav className="navbar navbar-expand-md navbar-light bg-light px-5">
                        <Link className="navbar-brand" to="/">
                            <h1 className="logo">My Website</h1>
                        </Link>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNav"
                            aria-controls="navbarNav"
                            aria-expanded={isCollapsed}
                            aria-label="Toggle navigation"
                            onClick={() =>
                                setIsCollapsed((prevState) => !prevState)
                            }
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div
                            className={
                                "collapse navbar-collapse justify-content-between" +
                                (isCollapsed ? " show" : "")
                            }
                            id="navbarNav"
                        >
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/about">
                                        About Me
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/timer">
                                        Timer
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link"
                                        to="/bookkeeping"
                                    >
                                        Bookkeeping
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">
                                        Web3
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
}
