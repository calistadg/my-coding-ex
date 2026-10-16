import { useState, useEffect } from 'react';

function WindowTracker() {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    const [scrollPosition, setScrollPosition] = useState({
        x: window.scrollX,
        y: window.scrollY
    });

    const [isOnline, setIsOnline] = useState(navigator.onLine);

    // Window resize effect
    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Scroll tracking effect
    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition({
                x: window.scrollX,
                y: window.scrollY
            });
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Online/offline status effect
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

    // Local storage effect
    useEffect(() => {
        const data = {
            windowSize,
            scrollPosition,
            timestamp: new Date().toISOString()
        };

        localStorage.setItem('windowTracker', JSON.stringify(data));
    }, [windowSize, scrollPosition]);

    // Page visibility effect
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                console.log('Page is hidden');
            } else {
                console.log('Page is visible');
            }
        };

        document.addEventListener(
            'visibilitychange',
            handleVisibilityChange
        );

        return () => {
            document.removeEventListener(
                'visibilitychange',
                handleVisibilityChange
            );
        };
    }, []);

    return (
        <div className="window-tracker">
            <h3>Window & Scroll Tracker</h3>

            <div className="info-grid">

                <div className="info-card">
                    <h4>Window Size</h4>
                    <p>Width: {windowSize.width}px</p>
                    <p>Height: {windowSize.height}px</p>
                    <p>
                        Aspect Ratio:{' '}
                        {(windowSize.width / windowSize.height).toFixed(2)}
                    </p>
                </div>

                <div className="info-card">
                    <h4>Scroll Position</h4>
                    <p>X: {scrollPosition.x}px</p>
                    <p>Y: {scrollPosition.y}px</p>
                    <p>
                        Total Scrolled:{' '}
                        {Math.round(
                            Math.sqrt(
                                scrollPosition.x ** 2 +
                                scrollPosition.y ** 2
                            )
                        )}px
                    </p>
                </div>

                <div className="info-card">
                    <h4>Connection Status</h4>
                    <p className={isOnline ? 'online' : 'offline'}>
                        {isOnline ? '🟢 Online' : '🔴 Offline'}
                    </p>
                </div>

                <div className="info-card">
                    <h4>Viewport Classification</h4>
                    <p>
                        {windowSize.width < 768
                            ? 'Mobile'
                            : windowSize.width < 1024
                                ? 'Tablet'
                                : 'Desktop'}
                    </p>
                </div>

            </div>

            {/* Add some content to enable scrolling */}
            <div
                style={{
                    height: '200vh',
                    background:
                        'linear-gradient(to bottom, #f0f0f0, #e0e0e0)'
                }}
            >
                <p>Scroll down to see the scroll position change...</p>
            </div>
        </div>
    );
}

export default WindowTracker;