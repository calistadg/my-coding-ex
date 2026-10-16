import React, { useState, useEffect } from 'react';

const THRESHOLDS = {
    cpu: 85,      // %
    memory: 80,   // %
    network: 900  // KB/s
};

export default function SystemMonitor() {
    // Initialize state with localStorage values or defaults
    const [cpu, setCpu] = useState(() => {
        const saved = localStorage.getItem('sys_cpu');
        return saved !== null ? JSON.parse(saved) : 45;
    });

    const [memory, setMemory] = useState(() => {
        const saved = localStorage.getItem('sys_memory');
        return saved !== null ? JSON.parse(saved) : 60;
    });

    const [network, setNetwork] = useState(() => {
        const saved = localStorage.getItem('sys_network');
        return saved !== null ? JSON.parse(saved) : 320;
    });

    const [alerts, setAlerts] = useState([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // 1. Separate useEffect for CPU Metric Simulation & Persistence
    useEffect(() => {
        const cpuInterval = setInterval(() => {
            // Simulate random CPU fluctuation (10% - 100%)
            const nextCpu = Math.floor(Math.random() * 90) + 10;
            setCpu(nextCpu);
            localStorage.setItem('sys_cpu', JSON.stringify(nextCpu));
        }, 2000);

        // Cleanup interval on unmount
        return () => clearInterval(cpuInterval);
    }, []);

    // 2. Separate useEffect for Memory Metric Simulation & Persistence
    useEffect(() => {
        const memoryInterval = setInterval(() => {
            // Simulate random Memory usage fluctuation (30% - 95%)
            const nextMemory = Math.floor(Math.random() * 65) + 30;
            setMemory(nextMemory);
            localStorage.setItem('sys_memory', JSON.stringify(nextMemory));
        }, 3000);

        // Cleanup interval on unmount
        return () => clearInterval(memoryInterval);
    }, []);

    // 3. Separate useEffect for Network Metric Simulation & Persistence
    useEffect(() => {
        const networkInterval = setInterval(() => {
            // Simulate random Network traffic in KB/s (100 - 1000 KB/s)
            const nextNetwork = Math.floor(Math.random() * 900) + 100;
            setNetwork(nextNetwork);
            localStorage.setItem('sys_network', JSON.stringify(nextNetwork));
        }, 2500);

        // Cleanup interval on unmount
        return () => clearInterval(networkInterval);
    }, []);

    // 4. useEffect for Window Resize Event Listener (Cleanup demonstration)
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);

        // Cleanup listener on unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // 5. useEffect for Alert System (Triggers when threshold values are violated)
    useEffect(() => {
        const newAlerts = [];
        const timestamp = new Date().toLocaleTimeString();

        if (cpu > THRESHOLDS.cpu) {
            newAlerts.push(`[${timestamp}] HIGH CPU ALERT: Usage reached ${cpu}% (Threshold: ${THRESHOLDS.cpu}%)`);
        }
        if (memory > THRESHOLDS.memory) {
            newAlerts.push(`[${timestamp}] HIGH MEMORY ALERT: Usage reached ${memory}% (Threshold: ${THRESHOLDS.memory}%)`);
        }
        if (network > THRESHOLDS.network) {
            newAlerts.push(`[${timestamp}] HIGH NETWORK TRAFFIC: Speed reached ${network} KB/s (Threshold: ${THRESHOLDS.network} KB/s)`);
        }

        if (newAlerts.length > 0) {
            setAlerts((prev) => [...newAlerts, ...prev].slice(0, 10)); // Keep last 10 alerts
        }
    }, [cpu, memory, network]);

    return (
        <div style={{ padding: '24px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
            <h2>System Monitor Dashboard</h2>
            <p style={{ color: '#666', fontSize: '14px' }}>
                Viewport Width: <strong>{windowWidth}px</strong>
            </p>

            {/* Metrics Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                {/* CPU Metric Card */}
                <div style={cardStyle(cpu > THRESHOLDS.cpu)}>
                    <h3>CPU Usage</h3>
                    <p style={{ fontSize: '28px', fontWeight: 'bold', margin: '8px 0' }}>{cpu}%</p>
                    <div style={progressBgStyle}>
                        <div style={progressFillStyle(cpu, THRESHOLDS.cpu)}></div>
                    </div>
                </div>

                {/* Memory Metric Card */}
                <div style={cardStyle(memory > THRESHOLDS.memory)}>
                    <h3>Memory Usage</h3>
                    <p style={{ fontSize: '28px', fontWeight: 'bold', margin: '8px 0' }}>{memory}%</p>
                    <div style={progressBgStyle}>
                        <div style={progressFillStyle(memory, THRESHOLDS.memory)}></div>
                    </div>
                </div>

                {/* Network Metric Card */}
                <div style={cardStyle(network > THRESHOLDS.network)}>
                    <h3>Network Traffic</h3>
                    <p style={{ fontSize: '28px', fontWeight: 'bold', margin: '8px 0' }}>{network} KB/s</p>
                    <div style={progressBgStyle}>
                        <div style={progressFillStyle((network / 1000) * 100, (THRESHOLDS.network / 1000) * 100)}></div>
                    </div>
                </div>
            </div>

            {/* Threshold Violation Alerts */}
            <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '16px', backgroundColor: '#fafafa' }}>
                <h3 style={{ marginTop: 0 }}>Threshold Violation Logs</h3>
                {alerts.length === 0 ? (
                    <p style={{ color: '#888' }}>All metrics are within normal ranges.</p>
                ) : (
                    <ul style={{ paddingLeft: '20px', color: '#d9534f', margin: 0 }}>
                        {alerts.map((alert, idx) => (
                            <li key={idx} style={{ marginBottom: '6px' }}>{alert}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

// Inline styling helpers
const cardStyle = (isViolated) => ({
    border: `2px solid ${isViolated ? '#d9534f' : '#ccc'}`,
    borderRadius: '8px',
    padding: '16px',
    backgroundColor: isViolated ? '#fff0f0' : '#ffffff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
});

const progressBgStyle = {
    width: '100%',
    height: '10px',
    backgroundColor: '#e0e0e0',
    borderRadius: '5px',
    overflow: 'hidden'
};

const progressFillStyle = (value, threshold) => ({
    width: `${Math.min(value, 100)}%`,
    height: '100%',
    backgroundColor: value > threshold ? '#d9534f' : '#4caf50',
    transition: 'width 0.4s ease'
});