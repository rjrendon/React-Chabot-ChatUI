import React, { useState, useEffect } from 'react';
import './chatbot.scss';

const Chatbot = () => {
    const [minimized, setMinimized] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([]);
    const [userName, setUserName] = useState('');
    const [expectingName, setExpectingName] = useState(false);


//Optional
// // Delayed appearance of the "hi there stranger" message and maximize the chatbot ChatUI
//     useEffect(() => {
//         const timeoutId = setTimeout(() => {
//           setMinimized(false);
//         }, 15000); // 15 seconds
      
//         return () => clearTimeout(timeoutId);
//       }, []);

//     useEffect(() => {

        
//         const preloadedMessage = { text: 'Bot: Hi there! Stranger', sender: 'bot' };
//         const delay = 17000; 
//         const timeoutId = setTimeout(() => {
//             setMessages([preloadedMessage]);
//         }, delay);

//         // Clear the timeout when the component unmounts
//         return () => clearTimeout(timeoutId);
//     }, []);
   

    const handleToggleMinimize = () => {
        setMinimized(!minimized);
    };



    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };


    const handleSendMessage = () => {
      

        if (inputValue.trim() !== '') {
            // Add the user's message to the chat immediately
            setMessages((prevMessages) => [...prevMessages, { text: inputValue, sender: 'user' }]);
            setInputValue('');

            // Check for specific conditions and provide custom responses
            if (inputValue.toLowerCase().includes('how are you')) {
                // Custom response for asking about the chatbot's well-being
                setTimeout(() => {
                    setMessages((prevMessages) => [...prevMessages, { text: 'Bot: I am just a chatbot, but thanks for asking!', sender: 'bot' }]);
                }, 500);
            } else if (inputValue.toLowerCase().includes('Your custom message') || inputValue.toLowerCase().includes('Your custom message')) {
                // Custom response for another specific condition
                setTimeout(() => {
                    setMessages((prevMessages) => [...prevMessages, { text: 'Bot: Your custom message', sender: 'bot' }]);
                }, 500);

            } 
            else {

                // Default response if no specific conditions are met
                setTimeout(() => {
                    if (!userName) {
                        setMessages((prevMessages) => [...prevMessages, { text: 'Bot: What is your name? or I`ll keep asking if you dont submit', sender: 'bot' }]);
                        setExpectingName(true);

                    } 
                    else if ((userName) && inputValue.toLowerCase().includes('hi') || inputValue.toLowerCase().includes('hello')) {
                        setMessages((prevMessages) => [
                            ...prevMessages,
                            { text: `Bot: Hello, ${userName}!`, sender: 'bot' },
                            { text: 'Bot: How can I assist you today?', sender: 'bot' },
                        ]);
                    }
                    else if (inputValue.toLowerCase() != 'Your custom message' || inputValue.toLowerCase() != 'Your custom message') {
                        // Custom response for another specific condition
                        setTimeout(() => {
                            setMessages((prevMessages) => [...prevMessages, { text: 'Bot: Your Bot custom message', sender: 'bot' }]);
                        }, 500); 
                    }
                    else{
                        setMessages((prevMessages) => [
                            ...prevMessages,
                            { text: 'Bot: Your Bot custom message', sender: 'bot' }
                            
                        ]);
                    }
                    
                   
                }, 500);
            }
        }
    };
   
    const handleReceiveName = () => {
        setExpectingName(false);
    };

    return (

        
        <div className={`chatbot-container ${minimized ? 'minimized' : ''}`}>
            <div className="chat-header" onClick={handleToggleMinimize}>
                Chatbot
            </div>
            {!minimized && (
                
                <div className="chat-body">
                    {messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.sender}`}>
                            {msg.text}
                        </div>
                    ))}
                </div>
            )}
            {expectingName && (
                <div className="input-container">
                    <input
                        type="text"
                        placeholder="Type your name..."
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <button onClick={handleReceiveName}>Submit</button>
                </div>
            )}
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Type here..."
                    value={inputValue}
                    onChange={handleInputChange}
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
            <button className="minimize-button" onClick={handleToggleMinimize}>
                {minimized ? '+' : '-'}
            </button>
        </div>
    );
};

export default Chatbot;

