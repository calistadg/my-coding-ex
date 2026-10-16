import React, { useState, useEffect, useCallback } from 'react';

const QUESTIONS = [
    {
        id: 1,
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        correctIndex: 2,
    },
    {
        id: 2,
        question: "Which hook is used to handle side effects in React?",
        options: ["useState", "useEffect", "useContext", "useReducer"],
        correctIndex: 1,
    },
    {
        id: 3,
        question: "What does CSS stand for?",
        options: [
            "Creative Style Sheets",
            "Cascading Style Sheets",
            "Computer Style Sheets",
            "Colorful Style Sheets",
        ],
        correctIndex: 1,
    },
    {
        id: 4,
        question: "Which programming language runs in the browser?",
        options: ["Java", "C++", "Python", "JavaScript"],
        correctIndex: 3,
    },
];

const TIMER_SECONDS = 60;

export default function QuizApp() {
    const [userAnswers, setUserAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [validationError, setValidationError] = useState('');

    // Handle selecting an option
    const handleSelectOption = useCallback((questionId, optionIndex) => {
        if (isSubmitted) return;
        setUserAnswers((prev) => ({
            ...prev,
            [questionId]: optionIndex,
        }));
        setValidationError('');
    }, [isSubmitted]);

    // Submit quiz function
    const handleSubmit = useCallback(() => {
        setIsSubmitted(true);
    }, []);

    // Timer Countdown & Automatic Submission
    useEffect(() => {
        if (isSubmitted) return;

        if (timeLeft <= 0) {
            handleSubmit();
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, isSubmitted, handleSubmit]);

    // Keyboard Listener (1-4 keys fill unanswered questions sequentially)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (isSubmitted) return;

            const keyNumber = parseInt(e.key, 10);
            if (keyNumber >= 1 && keyNumber <= 4) {
                const unansweredQuestion = QUESTIONS.find((q) => userAnswers[q.id] === undefined);
                if (unansweredQuestion) {
                    handleSelectOption(unansweredQuestion.id, keyNumber - 1);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [userAnswers, isSubmitted, handleSelectOption]);

    // Form Validation Before Manual Submission
    const handleManualSubmit = (e) => {
        e.preventDefault();
        const answeredCount = Object.keys(userAnswers).length;
        if (answeredCount < QUESTIONS.length) {
            setValidationError(`Please answer all questions before submitting. (${answeredCount}/${QUESTIONS.length} answered)`);
            return;
        }
        handleSubmit();
    };

    // Restart Quiz
    const handleRestart = () => {
        setUserAnswers({});
        setTimeLeft(TIMER_SECONDS);
        setIsSubmitted(false);
        setValidationError('');
    };

    const answeredCount = Object.keys(userAnswers).length;
    const progressPercentage = (answeredCount / QUESTIONS.length) * 100;

    const calculateScore = () => {
        return QUESTIONS.reduce((score, q) => {
            return userAnswers[q.id] === q.correctIndex ? score + 1 : score;
        }, 0);
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1>Interactive Quiz Application</h1>
                {!isSubmitted && (
                    <div style={styles.timer}>
                        ⏱ Time Remaining: <strong>{timeLeft}s</strong>
                    </div>
                )}
            </header>

            {/* Progress Bar */}
            {!isSubmitted && (
                <div style={styles.progressContainer}>
                    <div style={{ ...styles.progressBar, width: `${progressPercentage}%` }} />
                    <span style={styles.progressText}>
                        Progress: {answeredCount} / {QUESTIONS.length} Questions Answered
                    </span>
                </div>
            )}

            {/* Results View */}
            {isSubmitted ? (
                <div style={styles.resultsContainer}>
                    <h2>Quiz Completed!</h2>
                    <p style={styles.scoreText}>
                        Your Score: <strong>{calculateScore()} / {QUESTIONS.length}</strong> (
                        {Math.round((calculateScore() / QUESTIONS.length) * 100)}%)
                    </p>

                    <h3>Review Answers</h3>
                    <div style={styles.reviewList}>
                        {QUESTIONS.map((q, idx) => {
                            const selectedIndex = userAnswers[q.id];
                            const isCorrect = selectedIndex === q.correctIndex;
                            return (
                                <div key={q.id} style={styles.reviewCard}>
                                    <h4>{idx + 1}. {q.question}</h4>
                                    <p>
                                        <strong>Your Answer:</strong>{' '}
                                        {selectedIndex !== undefined ? q.options[selectedIndex] : <em>Unanswered</em>}{' '}
                                        {isCorrect ? '✅' : '❌'}
                                    </p>
                                    {!isCorrect && (
                                        <p style={{ color: 'green' }}>
                                            <strong>Correct Answer:</strong> {q.options[q.correctIndex]}
                                        </p>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    <button style={styles.button} onClick={handleRestart}>
                        Restart Quiz
                    </button>
                </div>
            ) : (
                /* Question Form View */
                <form onSubmit={handleManualSubmit}>
                    {QUESTIONS.map((q, qIdx) => (
                        <div key={q.id} style={styles.questionCard}>
                            <h3>{qIdx + 1}. {q.question}</h3>
                            <div style={styles.optionsGrid}>
                                {q.options.map((option, oIdx) => {
                                    const isSelected = userAnswers[q.id] === oIdx;
                                    return (
                                        <button
                                            key={oIdx}
                                            type="button"
                                            onClick={() => handleSelectOption(q.id, oIdx)}
                                            style={{
                                                ...styles.optionButton,
                                                ...(isSelected ? styles.selectedOption : {}),
                                            }}
                                        >
                                            <span style={styles.keyBadge}>{oIdx + 1}</span> {option}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}

                    {validationError && (
                        <div style={styles.errorMessage}>{validationError}</div>
                    )}

                    <button type="submit" style={styles.button}>
                        Submit Quiz
                    </button>
                </form>
            )}
        </div>
    );
}

const styles = {
    container: {
        maxWidth: '680px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '2px solid #ccc',
        paddingBottom: '10px',
    },
    timer: {
        fontSize: '1.1rem',
        padding: '6px 12px',
        backgroundColor: '#fff3cd',
        borderRadius: '4px',
        border: '1px solid #ffeeba',
    },
    progressContainer: {
        margin: '20px 0',
        backgroundColor: '#e0e0e0',
        borderRadius: '8px',
        overflow: 'hidden',
        position: 'relative',
        height: '24px',
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#4caf50',
        transition: 'width 0.3s ease',
    },
    progressText: {
        position: 'absolute',
        top: '3px',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: '0.85rem',
        fontWeight: 'bold',
    },
    questionCard: {
        marginBottom: '20px',
        padding: '16px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
    },
    optionsGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '10px',
        marginTop: '10px',
    },
    optionButton: {
        padding: '10px 14px',
        textAlign: 'left',
        fontSize: '0.95rem',
        cursor: 'pointer',
        border: '1px solid #ccc',
        borderRadius: '6px',
        backgroundColor: '#fff',
    },
    selectedOption: {
        backgroundColor: '#007bff',
        color: '#fff',
        borderColor: '#0056b3',
    },
    keyBadge: {
        display: 'inline-block',
        width: '20px',
        height: '20px',
        lineHeight: '20px',
        textAlign: 'center',
        borderRadius: '50%',
        backgroundColor: '#eee',
        color: '#333',
        fontSize: '0.8rem',
        marginRight: '8px',
    },
    button: {
        padding: '12px 24px',
        fontSize: '1rem',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        marginTop: '10px',
    },
    errorMessage: {
        color: '#d9534f',
        marginBottom: '10px',
        fontWeight: 'bold',
    },
    resultsContainer: {
        textAlign: 'center',
    },
    scoreText: {
        fontSize: '1.2rem',
    },
    reviewList: {
        textAlign: 'left',
        margin: '20px 0',
    },
    reviewCard: {
        padding: '12px',
        border: '1px solid #eee',
        borderRadius: '6px',
        marginBottom: '10px',
    },
};