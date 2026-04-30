import { render, screen } from '@testing-library/vue';
import DsButton from './Button.vue';
import { describe, expect, it } from 'vitest';

describe('DsButton', () => {
    it('renders text', () => {
        render(DsButton, {
            slots: {
                default: 'Click me',
            },
        });

        expect(screen.getByText('Click me')).toBeDefined();
    });

    it('applies primary class', () => {
        render(DsButton, {
            props: { size: 'sm' },
        });

        const button = screen.getByRole('button');
        expect(button.className).toContain('pa-2');
    });
});
