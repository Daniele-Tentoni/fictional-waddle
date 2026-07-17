<script setup lang="ts">
import { computed } from 'vue';

type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'fluid';
type ContainerPadding = 'none' | 'gutter' | 'gutter-md';
type Breakpoint = 'sm' | 'md' | 'lg' | 'xl';

type ResponsivePadding = Partial<Record<Breakpoint, ContainerPadding>>;

const props = withDefaults(
    defineProps<{
        size?: ContainerSize;
        paddingX?: ContainerPadding;
        paddingXSm?: ContainerPadding;
        paddingXMd?: ContainerPadding;
        paddingXLg?: ContainerPadding;
        paddingXXl?: ContainerPadding;
        paddingY?: ContainerPadding;
        paddingYSm?: ContainerPadding;
        paddingYMd?: ContainerPadding;
        paddingYLg?: ContainerPadding;
        paddingYXl?: ContainerPadding;
    }>(),
    {
        size: 'lg',
        paddingX: 'gutter-md',
        paddingY: 'none',
    },
);

const spacingClass = (utility: 'px' | 'py', token: ContainerPadding) => {
    const normalized = token === 'none' ? '0' : token;
    return `${utility}-${normalized}`;
};

const responsiveClasses = (utility: 'px' | 'py', base: ContainerPadding, values: ResponsivePadding) => {
    const classNames = [spacingClass(utility, base)];

    Object.entries(values).forEach(([breakpoint, token]) => {
        if (!token) {
            return;
        }

        classNames.push(`${breakpoint}:${spacingClass(utility, token)}`);
    });

    return classNames;
};

const paddingXResponsive = computed<ResponsivePadding>(() => ({
    sm: props.paddingXSm,
    md: props.paddingXMd,
    lg: props.paddingXLg,
    xl: props.paddingXXl,
}));

const paddingYResponsive = computed<ResponsivePadding>(() => ({
    sm: props.paddingYSm,
    md: props.paddingYMd,
    lg: props.paddingYLg,
    xl: props.paddingYXl,
}));

const classes = computed(() => {
    const sizeClasses: Record<ContainerSize, string> = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        fluid: 'max-w-none',
    };

    return [
        'mx-auto',
        'w-full',
        sizeClasses[props.size],
        ...responsiveClasses('px', props.paddingX, paddingXResponsive.value),
        ...responsiveClasses('py', props.paddingY, paddingYResponsive.value),
    ].join(' ');
});
</script>

<template>
    <div :class="classes">
        <slot />
    </div>
</template>
