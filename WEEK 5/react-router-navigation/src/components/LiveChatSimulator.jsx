import React, { useState, useEffect, useRef } from 'react';

const SAMPLE_MESSAGES = [
    "Hey, how is it going?",
    "Did you test the new feature yet?",
    "React hooks make state management so clean!",
    "Don't forget to clean up your intervals!",
    "This live chat simulator is working great.",
    "Let's catch up later today."
];

const LiveChatSimulator = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: "Welcome to the live chat!", sender: "System", timestamp: new Date().toLocaleTimeString() }
    ]);
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [isTyping, setIsTyping] = useState(false);

    const chatContainerRef = useRef(null);
    const typingTimeoutRef = useRef(null);

    // 1. Handle Online / Offline Status
    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    // 2. Auto-generate messages every few seconds (with interval cleanup)
    useEffect(() => {
        if (!isOnline) return;

        const intervalId = setInterval(() => {
            // Trigger typing indicator before receiving a message
            setIsTyping(true);

            // Clear any existing typing timeout to avoid memory leaks
            if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

            typingTimeoutRef.current = setTimeout(() => {
                const randomText = SAMPLE_MESSAGES[Math.floor(Math.random() * SAMPLE_MESSAGES.length)];

                setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        id: Date.now(),
                        text: randomText,
                        sender: "Bot",
                        timestamp: new Date().toLocaleTimeString()
                    }
                ]);

                setIsTyping(false);
            }, 1500); // 1.5 second typing duration

        }, 4000); // New message every 4 seconds

        // Cleanup interval and timeout on unmount or when offline
        return () => {
            clearInterval(intervalId);
            if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        };
    }, [isOnline]);

    // 3. Auto-scroll to bottom when new messages or typing status updates
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    return (
        <div style={styles.card}>
            {/* Header & Online/Offline status */}
            <div style={styles.header}>
                <h3>Live Chat Simulator</h3>
                <span style={{ ...styles.badge, backgroundColor: isOnline ? '#2e7d32' : '#d32f2f' }}>
                    {isOnline ? 'Online' : 'Offline'}
                </span>
            </div>

            {/* Messages List Container */}
            <div style={styles.chatBox} ref={chatContainerRef}>
                {messages.map((msg) => (
                    <div key={msg.id} style={styles.message}>
                        <strong>{msg.sender}: </strong> {msg.text}
                        <span style={styles.time}>{msg.timestamp}</span>
                    </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                    <div style={styles.typingIndicator}>
                        <em>Bot is typing...</em>
                    </div>
                )}
            </div>
        </div>
    );
};

// Inline basic styling
const styles = {
    card: {
        width: '360px',
        margin: '20px auto',
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        fontFamily: 'sans-serif'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px'
    },
    badge: {
        color: '#fff',
        padding: '4px 8px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: 'bold'
    },
    chatBox: {
        height: '250px',
        overflowY: 'auto',
        border: '1px solid #eee',
        borderRadius: '4px',
        padding: '8px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    message: {
        padding: '6px 10px',
        borderRadius: '6px',
        backgroundColor: '#f1f1f1',
        fontSize: '14px',
        position: 'relative'
    },
    time: {
        display: 'block',
        fontSize: '10px',
        color: '#888',
        marginTop: '2px',
        textAlign: 'right'
    },
    typingIndicator: {
        fontSize: '12px',
        color: '#666',
        padding: '4px'
    }
};

export default LiveChatSimulator;