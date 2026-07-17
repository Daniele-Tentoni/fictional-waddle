import { render, screen } from '@testing-library/vue';
import { describe, expect, it } from 'vitest';
import BContainer from './Container.vue';
import BGrid from './Grid.vue';
import BItem from './Item.vue';

describe('BContainer', () => {
    it('uses lg as the default size', () => {
        const { container } = render(BContainer, {
            slots: {
                default: 'Content',
            },
        });

        expect(container.firstElementChild?.className).toContain('max-w-lg');
        expect(container.firstElementChild?.className).toContain('px-gutter-md');
        expect(container.firstElementChild?.className).toContain('py-0');
        expect(screen.getByText('Content')).toBeDefined();
    });

    it('supports fluid containers', () => {
        const { container } = render(BContainer, {
            props: {
                size: 'fluid',
            },
        });

        expect(container.firstElementChild?.className).toContain('max-w-none');
    });

    it('supports responsive horizontal and vertical padding', () => {
        const { container } = render(BContainer, {
            props: {
                paddingX: 'gutter',
                paddingXMd: 'gutter-md',
                paddingY: 'none',
                paddingYLg: 'gutter',
            },
        });

        const className = container.firstElementChild?.className ?? '';

        expect(className).toContain('px-gutter');
        expect(className).toContain('md:px-gutter-md');
        expect(className).toContain('py-0');
        expect(className).toContain('lg:py-gutter');
    });
});

describe('BGrid', () => {
    it('uses default gutter values', () => {
        const { container } = render(BGrid, {
            slots: {
                default: 'Grid',
            },
        });

        const className = container.firstElementChild?.className ?? '';

        expect(className).toContain('grid-cols-12');
        expect(className).toContain('gap-gutter');
    });

    it('supports responsive gutter and axis-specific gutter', () => {
        const { container } = render(BGrid, {
            props: {
                gutter: 'gutter',
                gutterMd: 'gutter-md',
                gutterX: 'gutter-md',
                gutterXLg: 'gutter',
                gutterY: 'none',
                gutterYMd: 'gutter',
            },
        });

        const className = container.firstElementChild?.className ?? '';

        expect(className).toContain('gap-gutter');
        expect(className).toContain('md:gap-gutter-md');
        expect(className).toContain('gap-x-gutter-md');
        expect(className).toContain('lg:gap-x-gutter');
        expect(className).toContain('gap-y-0');
        expect(className).toContain('md:gap-y-gutter');
    });
});

describe('BItem', () => {
    it('uses a 12-column span by default', () => {
        const { container } = render(BItem, {
            slots: {
                default: 'Item',
            },
        });

        expect(container.firstElementChild?.className).toContain('col-span-12');
    });

    it('builds responsive span, offset and order classes', () => {
        const { container } = render(BItem, {
            props: {
                span: 12,
                md: 6,
                lg: 4,
                offsetLg: 1,
                order: 2,
                orderLg: 1,
            },
        });

        const className = container.firstElementChild?.className ?? '';

        expect(className).toContain('col-span-12');
        expect(className).toContain('md:col-span-6');
        expect(className).toContain('lg:col-span-4');
        expect(className).toContain('lg:col-start-2');
        expect(className).toContain('order-2');
        expect(className).toContain('lg:order-1');
    });

    it('prefers explicit start values over offset values for the same breakpoint', () => {
        const { container } = render(BItem, {
            props: {
                offsetLg: 2,
                startLg: 5,
            },
        });

        const className = container.firstElementChild?.className ?? '';

        expect(className).toContain('lg:col-start-5');
        expect(className).not.toContain('lg:col-start-3');
    });

    it('ignores out-of-range values at runtime', () => {
        const { container } = render(BItem, {
            props: {
                span: 12,
                md: 99 as never,
                offset: 20 as never,
            },
        });

        const className = container.firstElementChild?.className ?? '';

        expect(className).toContain('col-span-12');
        expect(className).not.toContain('md:col-span-99');
        expect(className).not.toContain('col-start-21');
    });
});
