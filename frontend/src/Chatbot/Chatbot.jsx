import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Chatbot.css';

const Chatbot = () => {
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState('');

    useEffect(() => {
        console.log("QueryComponent rendered");
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(query);
            const res = await axios.post('http://localhost:3000/api/llm/query', { query });
            console.log(res.data);
            setResponse(res.data);
        } catch (error) {
            console.error("Error in handleSubmit in Query Component: ", error);
            setResponse(error.toString());
        }
    };

    return (
        <div className="query-component-container">
            <div className="query-component">
                <h2 className="query-title">Ask for Directions</h2>
                <form onSubmit={handleSubmit} className="query-form">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Enter your question..."
                        className="query-input"
                    />
                    <button 
                        type="submit"
                        className="query-button"
                    >
                        Submit
                    </button>
                </form>
                {response && (
                    <div className="query-response">
                        <p>{response}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Chatbot;