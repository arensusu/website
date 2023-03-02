import React from 'react';

import Header from './Header';
import './Home.css';

function Home() {
    return (
        <div className="Home">
            <Header/>
            <main>
                <div></div>
                <section>
                    <h2>About Me</h2>
                    <p>Introduce Me</p>
                    <button>Go To About Me</button>
                </section>
                <section>
                    <h2>Skills</h2>
                    <p>Introduce my skills</p>
                    <button>Go To Skills</button>
                </section>
                <section>
                    <h2>Web3</h2>
                    <p>Introduce the web3 page</p>
                    <button>Go To Web3</button>
                </section>
            </main>
        </div>
    );
}

export default Home;
