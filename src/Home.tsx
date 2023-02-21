import React from 'react';

function Home() {
    return (
        <div className="Home">
            <h1>My Web</h1>
            <nav>
                <a href='/'>About Me</a>
                <a href='/'>Skill</a>
                <a href='/'>Web3</a>
            </nav>
            <div>
                <h2>About Me</h2>
                <button>About Me</button>
            </div>
            <div>
                <h2>Skill</h2>
                <button>Skill</button>
            </div>
            <div>
                <h2>Web3</h2>
                <button>Web3</button>
            </div>
        </div>
    );
}

export default Home;
