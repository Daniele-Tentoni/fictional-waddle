<template>
    <button :class="classes" class="px-4">
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type Size = 'sm' | 'md' | 'lg';

const props = withDefaults(defineProps<{ size?: Size }>(), { size: 'md' });

const classes = computed(() => {
    const colorClasses = 'bg-primary hover:bg-primary-hover';

    const sizeClasses: Record<Size, string> = {
        sm: 'pa-2',
        md: 'pa-4',
        lg: 'pa-6',
    };

    return [colorClasses, sizeClasses[props.size]].join(' ');
});
</script>
