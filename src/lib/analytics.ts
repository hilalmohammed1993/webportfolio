export const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // TODO: Replace with your actual Measurement ID

declare global {
    interface Window {
        gtag: (...args: any[]) => void;
        dataLayer: any[];
    }
}

/**
 * Track a custom event with GA4
 */
export const trackEvent = (eventName: string, params: Record<string, any> = {}) => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        // Collect some automatic details
        const activeParams = {
            ...params,
            timestamp: new Date().toISOString(),
            page_path: window.location.pathname,
            page_title: document.title,
            screen_resolution: `${window.screen.width}x${window.screen.height}`,
            viewport_size: `${window.innerWidth}x${window.innerHeight}`,
        };

        window.gtag('event', eventName, activeParams);

        // Log in development for verification
        if (process.env.NODE_ENV === 'development') {
            console.log(`[Analytics Event] ${eventName}:`, activeParams);
        }
    }
};
