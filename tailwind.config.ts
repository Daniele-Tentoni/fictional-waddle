export default {
    content: ['./src/**/*.{vue,ts,css}'],
    corePlugins: {
        preflight: false,
    },
    safelist: [
        {
            pattern: /^(bg|text|border)-primary(-hover|-disabled)?$/,
        },

        {
            pattern: /^font-(sans|serif)$/,
        },

        {
            pattern: /^text-display-/,
        },

        {
            pattern: /^text-heading-/,
        },

        {
            pattern: /^col-span-(1[0-2]|[1-9])$/,
            variants: ['sm', 'md', 'lg', 'xl'],
        },
        {
            pattern: /^col-start-(1[0-3]|[1-9])$/,
            variants: ['sm', 'md', 'lg', 'xl'],
        },
        {
            pattern: /^order-(1[0-2]|[1-9])$/,
            variants: ['sm', 'md', 'lg', 'xl'],
        },
        {
            pattern: /^gap-(0|gutter|gutter-md)$/,
            variants: ['sm', 'md', 'lg', 'xl'],
        },
        {
            pattern: /^gap-x-(0|gutter|gutter-md)$/,
            variants: ['sm', 'md', 'lg', 'xl'],
        },
        {
            pattern: /^gap-y-(0|gutter|gutter-md)$/,
            variants: ['sm', 'md', 'lg', 'xl'],
        },
        {
            pattern: /^px-(0|gutter|gutter-md)$/,
            variants: ['sm', 'md', 'lg', 'xl'],
        },
        {
            pattern: /^py-(0|gutter|gutter-md)$/,
            variants: ['sm', 'md', 'lg', 'xl'],
        },
    ],
    theme: {
        extend: {
            colors: {
                primary: 'var(--semantic-action-primary-background)',
                'primary-hover': 'var(--semantic-action-primary-hover)',
                'primary-disabled': 'var(--semantic-action-primary-disabled)',
            },

            fontFamily: {
                sans: ['var(--font-body)'],
                serif: ['var(--font-heading)'],
            },
            gridTemplateColumns: {
                12: 'repeat(12, minmax(0, 1fr))',
            },
            spacing: {
                gutter: 'var(--layout-grid-gutter-base)',
                'gutter-md': 'var(--layout-grid-gutter-md)',
            },
            maxWidth: {
                sm: 'var(--layout-grid-container-sm)',
                md: 'var(--layout-grid-container-md)',
                lg: 'var(--layout-grid-container-lg)',
                xl: 'var(--layout-grid-container-xl)',
            },
        },
    },
} satisfies import('tailwindcss').Config;
