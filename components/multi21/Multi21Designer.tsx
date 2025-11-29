"use client";

import React, { useState } from 'react';
import { Multi21, Multi21Item } from './Multi21';
import { BottomControlsPanel } from './BottomControlsPanel';

// Mock Data Generator
const generateItems = (count: number): Multi21Item[] => {
    return Array.from({ length: count }).map((_, i) => ({
        id: `item-${i}`,
        title: `Item Title ${i + 1} - A generic card title that might wrap`,
        meta: `Meta info • ${10 + i}k views • 2 days ago`,
        imageUrl: `https://picsum.photos/seed/${i + 100}/600/400`, // Random placeholder
        href: '#',
        badge: i % 3 === 0 ? 'New' : undefined,
        secondaryLink: i % 2 === 0 ? { href: '#', label: 'Watch now' } : undefined,
    }));
};

export function Multi21Designer() {
    // Controls State
    const [colsDesktop, setColsDesktop] = useState(6);
    const [colsMobile, setColsMobile] = useState(2);
    const [tileGap, setTileGap] = useState(16);
    const [tileRadius, setTileRadius] = useState(8);
    const [align, setAlign] = useState<'left' | 'center' | 'right'>('center');
    const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');

    const [itemCount, setItemCount] = useState(12);

    // Toggles State
    const [showTitle, setShowTitle] = useState(true);
    const [showMeta, setShowMeta] = useState(true);
    const [showBadge, setShowBadge] = useState(true);
    const [showCtaLabel, setShowCtaLabel] = useState(true);
    const [showCtaArrow, setShowCtaArrow] = useState(true);

    const items = generateItems(itemCount);

    return (
        <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans">
            {/* Control Panel */}
            <BottomControlsPanel
                colsDesktop={colsDesktop}
                setColsDesktop={setColsDesktop}
                colsMobile={colsMobile}
                setColsMobile={setColsMobile}
                tileGap={tileGap}
                setTileGap={setTileGap}
                tileRadius={tileRadius}
                setTileRadius={setTileRadius}
                itemCount={itemCount}
                setItemCount={setItemCount}
                align={align}
                setAlign={setAlign}
                previewMode={previewMode}
                setPreviewMode={setPreviewMode}
                showTitle={showTitle}
                setShowTitle={setShowTitle}
                showMeta={showMeta}
                setShowMeta={setShowMeta}
                showBadge={showBadge}
                setShowBadge={setShowBadge}
                showCtaLabel={showCtaLabel}
                setShowCtaLabel={setShowCtaLabel}
                showCtaArrow={showCtaArrow}
                setShowCtaArrow={setShowCtaArrow}
            />

            {/* Main Content Area */}
            <main className="p-4 pb-32 max-w-[1600px] mx-auto flex flex-col items-center">
                <div className="w-full mb-8 border-b border-neutral-200 dark:border-neutral-800 pb-4">
                    <h2 className="text-2xl font-light tracking-tight">Collection Demo</h2>
                </div>

                <div
                    className={`transition-all duration-300 ease-in-out border border-transparent ${previewMode === 'mobile'
                        ? 'w-[390px] border-neutral-200 dark:border-neutral-800 rounded-3xl overflow-hidden shadow-2xl bg-white dark:bg-black'
                        : 'w-full'
                        }`}
                >
                    <div className={previewMode === 'mobile' ? 'p-4 h-[844px] overflow-y-auto' : ''}>
                        <Multi21
                            items={items}
                            colsDesktop={previewMode === 'mobile' ? colsMobile : colsDesktop} // Force mobile cols in mobile preview
                            colsMobile={colsMobile}
                            tileGap={tileGap}
                            tileRadius={tileRadius}
                            align={align}
                            showTitle={showTitle}
                            showMeta={showMeta}
                            showBadge={showBadge}
                            showCtaLabel={showCtaLabel}
                            showCtaArrow={showCtaArrow}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}
