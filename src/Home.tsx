import React from "react";
import { Link } from "react-router-dom";

import Header from "./component/Header";

function Home() {
    return (
        <div>
            <Header />
            <main>
                <div className="container text-center">
                    <section>
                        <div className="row mt-3">
                            <div className="col-8">
                                <div className="row">
                                    <div className="col">
                                        <h2>Working Timer Project</h2>
                                    </div>
                                    <div className="col">
                                        <p>A timer for working time management with Pomodoro technique and 52/17 method.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <Link className="btn btn-secondary" to="/timer">
                                    Go To Timer
                                </Link>
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className="row mt-3">
                            <div className="col-8">
                                <div className="row">
                                    <div className="col">
                                        <h2>Bookkeeping Project</h2>
                                    </div>
                                    <div className="col">
                                        <p>This website provides a daily expense tracking service.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <Link className="btn btn-secondary" to="/bookkeeping">
                                    Go To Bookkeeping
                                </Link>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}

export default Home;
