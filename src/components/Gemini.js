import { useState } from 'react';
import React from 'react';
import styles from '../styles/Gemini.module.css';

async function fetchGeminiResponse(query) {
    const response = await fetch('http://localhost:8000/api/gemini/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query })
    });
    const data = await response.json();
    return data;
}


export function Reason({ reason }) {

    return (
        <div className="reason_grid fade-in">
            <button className='reason'>{reason}</button>
        </div>
    );
}

export function Gemini({ handleSubmit }) {
    const [query, setQuery] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();
        const result = await fetchGeminiResponse(query);
        const data = result.data.split('; ')
        const indicies = new Set()
        data.forEach((e) => {
            let i = Math.floor(Math.random() * 18);
            while (indicies.has(i)) i = Math.floor(Math.random() * 18);
            indicies.add(i);
        });
        handleSubmit(indicies, data);

    };
    
    
    return (
        <div className={styles.gemini}>
            <form className={styles.container} onSubmit={onSubmit}>
                <input
                    className={styles.text}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="What are you uncertain about?"
                />
                <button className={styles.fetch} type="submit">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-2xl">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M15.1918 8.90615C15.6381 8.45983 16.3618 8.45983 16.8081 8.90615L21.9509 14.049C22.3972 14.4953 22.3972 15.2189 21.9509 15.6652C21.5046 16.1116 20.781 16.1116 20.3347 15.6652L17.1428 12.4734V22.2857C17.1428 22.9169 16.6311 23.4286 15.9999 23.4286C15.3688 23.4286 14.8571 22.9169 14.8571 22.2857V12.4734L11.6652 15.6652C11.2189 16.1116 10.4953 16.1116 10.049 15.6652C9.60265 15.2189 9.60265 14.4953 10.049 14.049L15.1918 8.90615Z" fill="currentColor">
                        </path>
                    </svg>
                </button>
            </form>
        </div>
    );

}

export default {Gemini, Reason}
