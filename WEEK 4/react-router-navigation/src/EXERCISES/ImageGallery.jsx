import React, { useState, useEffect } from 'react';

const sampleImages = [
    { id: 1, src: 'https://picsum.photos/id/10/800/600', title: 'Forest' },
    { id: 2, src: 'https://picsum.photos/id/20/800/600', title: 'Workstation' },
    { id: 3, src: 'https://picsum.photos/id/28/800/600', title: 'Forest Path' },
    { id: 4, src: 'https://picsum.photos/id/40/800/600', title: 'Cats' },
    { id: 5, src: 'https://picsum.photos/id/50/800/600', title: 'Coastline' }
];

export default function ImageGallery({ images = sampleImages }) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        const handleKeyDown = (event) => {
            switch (event.key) {
                case 'ArrowRight':
                case 'ArrowDown':
                    setSelectedIndex((prev) => (prev + 1) % images.length);
                    break;

                case 'ArrowLeft':
                case 'ArrowUp':
                    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
                    break;

                case ' ':
                    // Prevent page scrolling on spacebar press
                    event.preventDefault();
                    setIsFullscreen((prev) => !prev);
                    break;

                case 'Escape':
                    setIsFullscreen(false);
                    break;

                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [images.length]);

    const currentImage = images[selectedIndex];

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <h2>Image Gallery</h2>
            <p style={{ color: '#666', fontSize: '14px' }}>
                Controls: Use <strong>Left / Right Arrow keys</strong> to navigate, <strong>Spacebar</strong> to toggle fullscreen, and <strong>Escape</strong> to exit fullscreen.
            </p>

            {/* Main Preview Container */}
            <div
                style={{
                    width: '100%',
                    maxWidth: '600px',
                    height: '400px',
                    margin: '20px 0',
                    border: '2px solid #ccc',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#000',
                    cursor: 'pointer'
                }}
                onClick={() => setIsFullscreen(true)}
            >
                {currentImage && (
                    <img
                        src={currentImage.src}
                        alt={currentImage.title}
                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                    />
                )}
            </div>

            {/* Thumbnails */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {images.map((img, index) => (
                    <img
                        key={img.id}
                        src={img.src}
                        alt={img.title}
                        onClick={() => setSelectedIndex(index)}
                        style={{
                            width: '80px',
                            height: '60px',
                            objectFit: 'cover',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            border: index === selectedIndex ? '3px solid #007bff' : '2px solid transparent',
                            opacity: index === selectedIndex ? 1 : 0.6,
                            transition: 'all 0.2s'
                        }}
                    />
                ))}
            </div>

            {/* Fullscreen Overlay */}
            {isFullscreen && currentImage && (
                <div
                    onClick={() => setIsFullscreen(false)}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'rgba(0, 0, 0, 0.9)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1000
                    }}
                >
                    <img
                        src={currentImage.src}
                        alt={currentImage.title}
                        style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain' }}
                    />
                </div>
            )}
        </div>
    );
}