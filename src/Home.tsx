import React from "react";

import Header from "./component/Header";

function Home() {
    return (
        <div>
            <Header />
            <main>
                <div className="container text-center">
                    <section>
                        <div className="row">
                            <div className="col">
                                <div className="row">
                                    <div className="col">
                                        <h2>About Me</h2>
                                    </div>
                                    <div className="col">
                                        <p>Introduce Me</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <button className="btn btn-secondary">
                                    Go To About Me
                                </button>
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className="row">
                            <div className="col">
                                <div className="row">
                                    <div className="col">
                                        <h2>Skills</h2>
                                    </div>
                                    <div className="col">
                                        <p>Introduce my skills</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <button className="btn btn-secondary">
                                    Go To Skills
                                </button>
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className="row">
                            <div className="col">
                                <div className="row">
                                    <div className="col">
                                        <h2>Web3</h2>
                                    </div>
                                    <div className="col">
                                        <p>Introduce the web3 page</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <button className="btn btn-secondary">
                                    Go To Web3
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}

export default Home;

/*
<div className="Home">
            <Header/>
            <main>
                <section>
                    <h2>About Me</h2>
                    <p>Introduce Me</p>
                    <div>                    
                        <button>Go To About Me</button>
                    </div>
                </section>
                <section>
                    <h2>Skills</h2>
                    <p>Introduce my skills</p>
                    <div>                    
                        <button>Go To Skills</button>
                    </div>
                </section>
                <section>
                    <h2>Web3</h2>
                    <p>Introduce the web3 page</p>
                    <div>                    
                        <button>Go To Web3</button>
                    </div>
                </section>
            </main>
        </div>
*/
