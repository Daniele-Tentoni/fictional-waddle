<script setup lang="ts">
import { computed } from 'vue';

type GridSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type GridStart = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
type GridOrder = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type Breakpoint = 'sm' | 'md' | 'lg' | 'xl';

type ResponsiveSpanProps = Partial<Record<Breakpoint, GridSpan>>;
type ResponsiveStartProps = Partial<Record<Breakpoint, GridStart>>;
type ResponsiveOrderProps = Partial<Record<Breakpoint, GridOrder>>;

const props = defineProps<{
    span?: GridSpan;
    sm?: GridSpan;
    md?: GridSpan;
    lg?: GridSpan;
    xl?: GridSpan;
    offset?: GridSpan;
    offsetSm?: GridSpan;
    offsetMd?: GridSpan;
    offsetLg?: GridSpan;
    offsetXl?: GridSpan;
    start?: GridStart;
    startSm?: GridStart;
    startMd?: GridStart;
    startLg?: GridStart;
    startXl?: GridStart;
    order?: GridOrder;
    orderSm?: GridOrder;
    orderMd?: GridOrder;
    orderLg?: GridOrder;
    orderXl?: GridOrder;
}>();

const normalizeGridValue = (value: number | undefined, min: number, max: number) => {
    if (value === undefined) {
        return undefined;
    }

    if (!Number.isInteger(value) || value < min || value > max) {
        return undefined;
    }

    return value;
};

const createResponsiveClasses = (
    values: Record<string, number | undefined>,
    utility: string,
    min: number,
    max: number,
) => {
    return Object.entries(values)
        .map(([breakpoint, value]) => {
            const normalizedValue = normalizeGridValue(value, min, max);

            if (normalizedValue === undefined) {
                return null;
            }

            return breakpoint === 'base'
                ? `${utility}-${normalizedValue}`
                : `${breakpoint}:${utility}-${normalizedValue}`;
        })
        .filter((value): value is string => value !== null);
};

const responsiveSpanProps = computed<ResponsiveSpanProps>(() => ({
    sm: props.sm,
    md: props.md,
    lg: props.lg,
    xl: props.xl,
}));

const responsiveOffsetProps = computed<ResponsiveSpanProps>(() => ({
    sm: props.offsetSm,
    md: props.offsetMd,
    lg: props.offsetLg,
    xl: props.offsetXl,
}));

const responsiveStartProps = computed<ResponsiveStartProps>(() => ({
    sm: props.startSm,
    md: props.startMd,
    lg: props.startLg,
    xl: props.startXl,
}));

const responsiveOrderProps = computed<ResponsiveOrderProps>(() => ({
    sm: props.orderSm,
    md: props.orderMd,
    lg: props.orderLg,
    xl: props.orderXl,
}));

const classes = computed(() => {
    const classNames = createResponsiveClasses(
        { base: props.span ?? 12, ...responsiveSpanProps.value },
        'col-span',
        1,
        12,
    );

    const startValues = { base: props.start, ...responsiveStartProps.value };

    classNames.push(
        ...createResponsiveClasses(
            {
                base:
                    startValues.base === undefined && props.offset !== undefined
                        ? props.offset + 1
                        : undefined,
                sm:
                    startValues.sm === undefined && responsiveOffsetProps.value.sm !== undefined
                        ? responsiveOffsetProps.value.sm + 1
                        : undefined,
                md:
                    startValues.md === undefined && responsiveOffsetProps.value.md !== undefined
                        ? responsiveOffsetProps.value.md + 1
                        : undefined,
                lg:
                    startValues.lg === undefined && responsiveOffsetProps.value.lg !== undefined
                        ? responsiveOffsetProps.value.lg + 1
                        : undefined,
                xl:
                    startValues.xl === undefined && responsiveOffsetProps.value.xl !== undefined
                        ? responsiveOffsetProps.value.xl + 1
                        : undefined,
            },
            'col-start',
            1,
            13,
        ),
    );

    classNames.push(...createResponsiveClasses(startValues, 'col-start', 1, 13));

    classNames.push(
        ...createResponsiveClasses(
            { base: props.order, ...responsiveOrderProps.value },
            'order',
            1,
            12,
        ),
    );

    return classNames;
});
</script>

<template>
    <div :class="classes">
        <slot />
    </div>
</template>
