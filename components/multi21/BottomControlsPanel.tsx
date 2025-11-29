import React, { useState, useEffect } from 'react';

export type PanelState = 'collapsed' | 'compact' | 'full';

interface BottomControlsPanelProps {
    // Core control values and setters
    colsDesktop: number;
    setColsDesktop: (v: number) => void;
    colsMobile: number;
    setColsMobile: (v: number) => void;
    tileGap: number;
    setTileGap: (v: number) => void;
    tileRadius: number;
    setTileRadius: (v: number) => void;
    itemCount: number;
    setItemCount: (v: number) => void;
    // Layout & preview controls
    align: 'left' | 'center' | 'right';
    setAlign: (v: 'left' | 'center' | 'right') => void;
    previewMode: 'desktop' | 'mobile';
    setPreviewMode: (v: 'desktop' | 'mobile') => void;
    // Visibility toggles
    showTitle: boolean;
    setShowTitle: (v: boolean) => void;
    showMeta: boolean;
    setShowMeta: (v: boolean) => void;
    showBadge: boolean;
    setShowBadge: (v: boolean) => void;
    showCtaLabel: boolean;
    setShowCtaLabel: (v: boolean) => void;
    showCtaArrow: boolean;
    setShowCtaArrow: (v: boolean) => void;
}

/**
 * BottomControlsPanel – a 3‑state collapsible control panel.
 *
 * PanelState values are persisted in localStorage under the key
 * "multi2_panel_state". Valid values are "collapsed", "compact", "full".
 * On mount we read the stored value (defaulting to "compact").
 */
export const BottomControlsPanel: React.FC<BottomControlsPanelProps> = ({
    colsDesktop,
    setColsDesktop,
    colsMobile,
    setColsMobile,
    tileGap,
    setTileGap,
    tileRadius,
    setTileRadius,
    itemCount,
    setItemCount,
    align,
    setAlign,
    previewMode,
    setPreviewMode,
    showTitle,
    setShowTitle,
    showMeta,
    setShowMeta,
    showBadge,
    setShowBadge,
    showCtaLabel,
    setShowCtaLabel,
    showCtaArrow,
    setShowCtaArrow,
}) => {
    const [panelState, setPanelState] = useState<PanelState>('compact');
    const [lastNonCollapsed, setLastNonCollapsed] = useState<PanelState>('compact');

    // Load persisted state on mount
    useEffect(() => {
        const stored = localStorage.getItem('multi2_panel_state') as PanelState | null;
        if (stored && ['collapsed', 'compact', 'full'].includes(stored)) {
            setPanelState(stored);
            if (stored !== 'collapsed') setLastNonCollapsed(stored);
        } else {
            setPanelState('compact');
            setLastNonCollapsed('compact');
        }
    }, []);

    // Persist state on change
    useEffect(() => {
        localStorage.setItem('multi2_panel_state', panelState);
        if (panelState !== 'collapsed') setLastNonCollapsed(panelState);
    }, [panelState]);

    const expand = () => setPanelState(lastNonCollapsed);
    const collapse = () => setPanelState('collapsed');
    const goCompact = () => setPanelState('compact');
    const goFull = () => setPanelState('full');

    // Helper to render core sliders (used in compact & full)
    const renderCoreSliders = () => (
        <div className="flex flex-col gap-2">
            <span className="font-semibold text-xs uppercase tracking-wider text-neutral-500">Layout & Data</span>
            <div className="flex gap-4">
                {/* Desktop cols */}
                <label className="flex flex-col gap-1">
                    <span className="sr-only">Desktop columns</span>
                    <svg className="w-4 h-4 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="12" rx="2" ry="2" /><line x1="12" y1="16" x2="12" y2="20" /><line x1="8" y1="20" x2="16" y2="20" /></svg>
                    <span className="text-xs">{colsDesktop}</span>
                    <input
                        type="range"
                        min={1}
                        max={12}
                        step={1}
                        value={colsDesktop}
                        onChange={e => setColsDesktop(Number(e.target.value))}
                        className="w-20 accent-black dark:accent-white"
                    />
                </label>
                {/* Mobile cols */}
                <label className="flex flex-col gap-1">
                    <span className="sr-only">Mobile columns</span>
                    <svg className="w-4 h-4 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="7" y="2" width="10" height="20" rx="2" ry="2" /></svg>
                    <span className="text-xs">{colsMobile}</span>
                    <input
                        type="range"
                        min={1}
                        max={6}
                        step={1}
                        value={colsMobile}
                        onChange={e => setColsMobile(Number(e.target.value))}
                        className="w-20 accent-black dark:accent-white"
                    />
                </label>
                {/* Gap */}
                <label className="flex flex-col gap-1">
                    <span className="sr-only">Gap</span>
                    <svg className="w-4 h-4 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="12" x2="20" y2="12" /><polyline points="15 8 20 12 15 16" /></svg>
                    <span className="text-xs">{tileGap}px</span>
                    <input
                        type="range"
                        min={0}
                        max={24}
                        step={1}
                        value={tileGap}
                        onChange={e => setTileGap(Number(e.target.value))}
                        className="w-20 accent-black dark:accent-white"
                    />
                </label>
                {/* Radius */}
                <label className="flex flex-col gap-1">
                    <span className="sr-only">Radius</span>
                    <svg className="w-4 h-4 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="8" ry="8" /></svg>
                    <span className="text-xs">{tileRadius}px</span>
                    <input
                        type="range"
                        min={0}
                        max={32}
                        step={1}
                        value={tileRadius}
                        onChange={e => setTileRadius(Number(e.target.value))}
                        className="w-20 accent-black dark:accent-white"
                    />
                </label>
                {/* Items */}
                <label className="flex flex-col gap-1">
                    <span className="sr-only">Items</span>
                    <svg className="w-4 h-4 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>
                    <span className="text-xs">{itemCount}</span>
                    <input
                        type="range"
                        min={1}
                        max={48}
                        step={1}
                        value={itemCount}
                        onChange={e => setItemCount(Number(e.target.value))}
                        className="w-24 accent-black dark:accent-white"
                    />
                </label>
            </div>
        </div>
    );

    // Helper to render visibility toggles (full only)
    const renderVisibility = () => (
        <div className="flex flex-col gap-2">
            <span className="font-semibold text-xs uppercase tracking-wider text-neutral-500">Visibility</span>
            <div className="flex gap-3 items-center h-full">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input type="checkbox" checked={showTitle} onChange={e => setShowTitle(e.target.checked)} className="rounded border-gray-300" />
                    Title
                </label>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input type="checkbox" checked={showMeta} onChange={e => setShowMeta(e.target.checked)} className="rounded border-gray-300" />
                    Meta
                </label>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input type="checkbox" checked={showBadge} onChange={e => setShowBadge(e.target.checked)} className="rounded border-gray-300" />
                    Badge
                </label>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input type="checkbox" checked={showCtaLabel} onChange={e => setShowCtaLabel(e.target.checked)} className="rounded border-gray-300" />
                    CTA Label
                </label>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input type="checkbox" checked={showCtaArrow} onChange={e => setShowCtaArrow(e.target.checked)} className="rounded border-gray-300" />
                    CTA Arrow
                </label>
            </div>
        </div>
    );

    // Helper to render layout/preview controls (full only)
    const renderLayoutPreview = () => (
        <div className="flex flex-col gap-2">
            <span className="font-semibold text-xs uppercase tracking-wider text-neutral-500">Layout</span>
            <div className="flex gap-4 items-center h-full">
                {/* Align */}
                <div className="flex rounded-md bg-neutral-100 dark:bg-neutral-800 p-0.5">
                    {(['left', 'center', 'right'] as const).map(a => (
                        <button
                            key={a}
                            onClick={() => setAlign(a)}
                            className={`px-2 py-1 rounded text-xs capitalize ${align === a ? 'bg-white dark:bg-neutral-700 shadow-sm' : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'}`}
                        >
                            {a}
                        </button>
                    ))}
                </div>
                {/* Preview Mode */}
                <div className="flex rounded-md bg-neutral-100 dark:bg-neutral-800 p-0.5">
                    {(['desktop', 'mobile'] as const).map(m => (
                        <button
                            key={m}
                            onClick={() => setPreviewMode(m)}
                            className={`px-2 py-1 rounded text-xs capitalize ${previewMode === m ? 'bg-white dark:bg-neutral-700 shadow-sm' : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'}`}
                        >
                            {m}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );

    // Render based on panelState
    const renderContent = () => {
        if (panelState === 'collapsed') {
            return (
                <div className="flex items-center justify-between px-4 py-1 cursor-pointer" onClick={expand}>
                    <span className="text-sm font-medium">MULTI² controls</span>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                </div>
            );
        }
        // Determine height class based on state
        const heightClass = panelState === 'compact' ? 'h-48' : 'h-auto'; // compact ~12rem (48) ; full auto
        return (
            <div className={`flex flex-col transition-all duration-300 ease-in-out ${heightClass}`}>
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-200 dark:border-neutral-800">
                    <h2 className="text-sm font-medium">MULTI² Designer</h2>
                    <div className="flex gap-2">
                        {panelState === 'compact' && (
                            <button onClick={goFull} className="text-xs text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100">Expand</button>
                        )}
                        {panelState === 'full' && (
                            <button onClick={goCompact} className="text-xs text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100">Compact</button>
                        )}
                        <button onClick={collapse} className="text-xs text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100">Collapse</button>
                    </div>
                </div>
                <div className="p-4 overflow-y-auto max-h-[50vh]">
                    {renderCoreSliders()}
                    {panelState === 'full' && (
                        <>
                            {renderLayoutPreview()}
                            {renderVisibility()}
                        </>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div
            className={`fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border-t border-neutral-200 dark:border-neutral-800 z-50 shadow-lg transition-transform duration-300 ease-in-out`}
        >
            {renderContent()}
        </div>
    );
};
