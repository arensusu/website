import React from 'react';

import Header from './Header';
import './Home.css';

function Home() {
    return (
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
    );
}

export default Home;
