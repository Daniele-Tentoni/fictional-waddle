<script setup lang="ts">
import { computed } from 'vue';

type SpacingToken = 'none' | 'gutter' | 'gutter-md';
type Breakpoint = 'sm' | 'md' | 'lg' | 'xl';

type ResponsiveSpacing = Partial<Record<Breakpoint, SpacingToken>>;

const props = withDefaults(
    defineProps<{
        gutter?: SpacingToken;
        gutterSm?: SpacingToken;
        gutterMd?: SpacingToken;
        gutterLg?: SpacingToken;
        gutterXl?: SpacingToken;
        gutterX?: SpacingToken;
        gutterXSm?: SpacingToken;
        gutterXMd?: SpacingToken;
        gutterXLg?: SpacingToken;
        gutterXXl?: SpacingToken;
        gutterY?: SpacingToken;
        gutterYSm?: SpacingToken;
        gutterYMd?: SpacingToken;
        gutterYLg?: SpacingToken;
        gutterYXl?: SpacingToken;
    }>(),
    {
        gutter: 'gutter',
    },
);

const spacingClass = (utility: 'gap' | 'gap-x' | 'gap-y', token: SpacingToken) => {
    const normalized = token === 'none' ? '0' : token;
    return `${utility}-${normalized}`;
};

const responsiveClasses = (
    utility: 'gap' | 'gap-x' | 'gap-y',
    base: SpacingToken | undefined,
    values: ResponsiveSpacing,
) => {
    const classNames: string[] = [];

    if (base !== undefined) {
        classNames.push(spacingClass(utility, base));
    }

    Object.entries(values).forEach(([breakpoint, token]) => {
        if (!token) {
            return;
        }

        classNames.push(`${breakpoint}:${spacingClass(utility, token)}`);
    });

    return classNames;
};

const gutterResponsive = computed<ResponsiveSpacing>(() => ({
    sm: props.gutterSm,
    md: props.gutterMd,
    lg: props.gutterLg,
    xl: props.gutterXl,
}));

const gutterXResponsive = computed<ResponsiveSpacing>(() => ({
    sm: props.gutterXSm,
    md: props.gutterXMd,
    lg: props.gutterXLg,
    xl: props.gutterXXl,
}));

const gutterYResponsive = computed<ResponsiveSpacing>(() => ({
    sm: props.gutterYSm,
    md: props.gutterYMd,
    lg: props.gutterYLg,
    xl: props.gutterYXl,
}));

const classes = computed(() => {
    return [
        'grid',
        'grid-cols-12',
        ...responsiveClasses('gap', props.gutter, gutterResponsive.value),
        ...responsiveClasses('gap-x', props.gutterX, gutterXResponsive.value),
        ...responsiveClasses('gap-y', props.gutterY, gutterYResponsive.value),
    ].join(' ');
});
</script>

<template>
    <div :class="classes">
        <slot />
    </div>
</template>
