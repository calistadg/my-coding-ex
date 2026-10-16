import React from 'react';

function Layout({ header, sidebar, children }) {
    return (
        <div style={styles.container}>
            {/* Top Header */}
            <header style={styles.header}>
                {header}
            </header>

            <div style={styles.body}>
                {/* Left Sidebar */}
                <aside style={styles.sidebar}>
                    {sidebar}
                </aside>

                {/* Center Main Content Area */}
                <main style={styles.main}>
                    {children}
                </main>
            </div>
        </div>
    );
}

// Layout styling using Flexbox
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        fontFamily: 'sans-serif'
    },
    header: {
        backgroundColor: '#1e293b',
        color: '#fff',
        padding: '16px 24px'
    },
    body: {
        display: 'flex',
        flex: 1
    },
    sidebar: {
        width: '240px',
        backgroundColor: '#334155',
        color: '#fff',
        padding: '24px'
    },
    main: {
        flex: 1,
        backgroundColor: '#0f172a',
        color: '#fff',
        padding: '24px'
    }
};

export default Layout;