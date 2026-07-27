"use client";

import { useState } from "react";
import Image from "next/image";

interface Photo {
    src: string;
    thumbSrc: string;
    alt: string;
    width: number;
    height: number;
}

export default function GalleryGrid({ photos }: { photos: Photo[] }) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const showPrev = () => {
        setSelectedIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length));
    };

    const showNext = () => {
        setSelectedIndex((i) => (i === null ? null : (i + 1) % photos.length));
    };

    const selected = selectedIndex !== null ? photos[selectedIndex] : null;

    return (
        <>
            <div className="gallery-grid">
                
                {photos.map((photo, index) => (
                    <figure key={photo.src} onClick={() =>setSelectedIndex(index)}>
                        <Image
                            src={photo.thumbSrc}
                            alt={photo.alt}
                            width={photo.width}
                            height={photo.height}
                            priority={index === 0}
                            sizes="(max-width: 700px) 50vw, 175px"
                        />
                    </figure>
                ))}
            </div> 

            {selected && (
                <div className="lightbox-overlay" onClick={() => setSelectedIndex(null)}>
                    <button
                        className="lightbox-close"
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedIndex(null);
                        }}
                        aria-label="close"
                    >
                            ×
                        </button>

                    <button
                        className="lightbox-prev"
                        onClick={(e) => {
                            e.stopPropagation();
                            showPrev();
                        }}
                        aria-label="previous"
                    >
                        ‹
                    </button>
                    <Image
                        src={selected.src}
                        alt={selected.alt} 
                        width={selected.width}
                        height={selected.height}
                        className="lightbox-image"
                        onClick={(e) => e.stopPropagation()}
                    />
    
                    <button
                        className="lightbox-next"
                        onClick={(e) => {
                            e.stopPropagation();
                            showNext();
                        }}
                        aria-label="next"
                    >
                        ›
                    </button>
                </div>
            )}
        </>
    )
}
