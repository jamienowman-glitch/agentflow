import React from 'react';

export interface Multi21Item {
    id: string;
    title: string;
    meta?: string;
    imageUrl?: string;
    href?: string;
    badge?: string;
    secondaryLink?: {
        href: string;
        label?: string;
    };
}

export interface Multi21Props {
    items: Multi21Item[];
    colsDesktop?: number;
    colsMobile?: number;
    tileGap?: number;
    tileRadius?: number;
    align?: 'left' | 'center' | 'right';
    showTitle?: boolean;
    showMeta?: boolean;
    showBadge?: boolean;
    showCtaLabel?: boolean;
    showCtaArrow?: boolean;
}

export function Multi21({
    items,
    colsDesktop = 6,
    colsMobile = 2,
    tileGap = 16,
    tileRadius = 8,
    align = 'center',
    showTitle = true,
    showMeta = true,
    showBadge = true,
    showCtaLabel = true,
    showCtaArrow = true,
}: Multi21Props) {
    const alignmentClass = {
        left: 'justify-start',
        center: 'justify-center',
        right: 'justify-end',
    }[align];

    return (
        <div className={`flex w-full ${alignmentClass}`}>
            <div
                className="grid w-full"
                style={{
                    gridTemplateColumns: `repeat(var(--cols-mobile), minmax(0, 1fr))`,
                    gap: `${tileGap}px`,
                    ['--cols-mobile' as string]: colsMobile,
                    ['--cols-desktop' as string]: colsDesktop,
                    maxWidth: align === 'center' ? '100%' : 'auto', // Allow alignment to work if grid is narrower than container
                }}
            >
                <style jsx>{`
          @media (min-width: 768px) {
            .grid {
              grid-template-columns: repeat(var(--cols-desktop), minmax(0, 1fr)) !important;
            }
          }
        `}</style>

                {items.map((item) => (
                    <div key={item.id} className="flex flex-col group relative">
                        {/* Card Image */}
                        <div
                            className="relative aspect-video bg-gray-100 overflow-hidden"
                            style={{
                                borderRadius: `${tileRadius}px`,
                                marginBottom: tileGap > 0 ? '8px' : '0', // Only add margin if there is a gap
                                lineHeight: 0, // Prevent sub-pixel gaps
                            }}
                        >
                            {item.imageUrl ? (
                                <img
                                    src={item.imageUrl}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    <span className="text-xs">No Image</span>
                                </div>
                            )}

                            {showBadge && item.badge && (
                                <span className="absolute top-2 right-2 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded uppercase font-medium tracking-wide backdrop-blur-sm">
                                    {item.badge}
                                </span>
                            )}
                        </div>

                        {/* Content */}
                        <div
                            className="flex flex-col gap-0.5"
                            style={{ padding: tileGap > 0 ? '0 2px' : '0 4px' }} // Add slight padding if gap > 0, else more padding for text inside tile
                        >
                            {showTitle && (
                                <h3 className="font-medium text-sm leading-tight text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:underline decoration-1 underline-offset-2">
                                    <a href={item.href || '#'}>
                                        {item.title}
                                    </a>
                                </h3>
                            )}

                            {showMeta && item.meta && (
                                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                                    {item.meta}
                                </p>
                            )}

                            {(showCtaLabel || showCtaArrow) && item.secondaryLink && (
                                <a
                                    href={item.secondaryLink.href}
                                    className="mt-2 pb-1 text-[10px] text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 flex items-center gap-2 transition-colors w-fit"
                                >
                                    {showCtaLabel && (item.secondaryLink.label || 'More')}
                                    {showCtaArrow && (
                                        <svg width="20" height="10" viewBox="0 0 28 10" fill="none" stroke="var(--multi-cta-arrow-color, currentColor)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M0 5h26M22 1l4 4-4 4" />
                                        </svg>
                                    )}
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
