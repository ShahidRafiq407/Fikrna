/**
 * Local Storage Helper Functions
 * Privacy-focused client-side storage
 */

const PREFIX = 'fikrna_';

export const storage = {
    /**
     * Save data to localStorage
     */
    set(key, value) {
        try {
            const serialized = JSON.stringify(value);
            localStorage.setItem(PREFIX + key, serialized);
            return true;
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            return false;
        }
    },

    /**
     * Get data from localStorage
     */
    get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(PREFIX + key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return defaultValue;
        }
    },

    /**
     * Remove data from localStorage
     */
    remove(key) {
        try {
            localStorage.removeItem(PREFIX + key);
            return true;
        } catch (error) {
            console.error('Error removing from localStorage:', error);
            return false;
        }
    },

    /**
     * Clear all FikrNa data
     */
    clear() {
        try {
            Object.keys(localStorage).forEach(key => {
                if (key.startsWith(PREFIX)) {
                    localStorage.removeItem(key);
                }
            });
            return true;
        } catch (error) {
            console.error('Error clearing localStorage:', error);
            return false;
        }
    }
};

/**
 * Dark Mode Management
 */
export const themeManager = {
    /**
     * Initialize theme from localStorage or default to dark
     */
    init() {
        const savedTheme = storage.get('theme', 'dark');
        this.setTheme(savedTheme);
    },

    /**
     * Set theme and save preference
     */
    setTheme(theme) {
        const body = document.body;
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            body.classList.remove('light-mode');
        } else {
            body.classList.add('light-mode');
            body.classList.remove('dark-mode');
        }
        storage.set('theme', theme);
    },

    /**
     * Toggle between dark and light mode
     */
    toggle() {
        const body = document.body;
        const newTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
        this.setTheme(newTheme);
        return newTheme;
    },

    /**
     * Get current theme
     */
    getTheme() {
        return document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    }
};
