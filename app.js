import React, { useState, useEffect } from 'react'
import logo from './logo.svg';
import './styles.css';

function app() {
    const [data, setData] = useState(null)
    useEffect(() => {
        fetch('/api')
            .then(response => response.json())
            .then(response => setData(response.message))
    }, [])
    return (
        <div className="app">
            <header className="app-header">
                <img src={logo} className="app-logo" alt="logo" />
                <p>
                    {
                        !data ? "Loading..." : data
                    }
                </p>
            </header>
        </div>
    );
}
export default app