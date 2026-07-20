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

        const button = screen.getByRole('button', { name: 'Click me' });

        expect(button).toBeDefined();
        expect(button.getAttribute('type')).toBe('button');
        expect(button.className).toContain('b-button--default');
        expect(button.className).toContain('b-button--size-big');
    });

    it('maps legacy small size to the small button size', () => {
        render(DsButton, {
            props: { size: 'sm' },
        });

        const button = screen.getByRole('button');

        expect(button.className).toContain('b-button--size-small');
    });

    it('supports the documented visual variants', () => {
        render(DsButton, {
            props: {
                variant: 'outline-white',
            },
            slots: {
                default: 'Secondary action',
            },
        });

        const button = screen.getByRole('button', { name: 'Secondary action' });

        expect(button.className).toContain('b-button--outline-white');
    });

    it('supports disabled buttons', () => {
        render(DsButton, {
            props: {
                disabled: true,
            },
            slots: {
                default: 'Disabled action',
            },
        });

        const button = screen.getByRole('button', { name: 'Disabled action' });

        expect(button.hasAttribute('disabled')).toBe(true);
        expect((button as HTMLButtonElement).disabled).toBe(true);
        expect(button.className).toContain('is-disabled');
    });

    it('renders icon content when provided', () => {
        render(DsButton, {
            props: {
                variant: 'icon',
            },
            slots: {
                icon: '<svg data-testid="button-icon" aria-hidden="true"></svg>',
                default: 'Open filters',
            },
        });

        const button = screen.getByRole('button', { name: 'Open filters' });

        expect(screen.getByTestId('button-icon')).toBeDefined();
        expect(button.className).toContain('b-button--icon');
    });

    it('supports native button types', () => {
        render(DsButton, {
            props: {
                type: 'submit',
            },
            slots: {
                default: 'Submit form',
            },
        });

        expect(screen.getByRole('button', { name: 'Submit form' }).getAttribute('type')).toBe(
            'submit',
        );
    });
});
