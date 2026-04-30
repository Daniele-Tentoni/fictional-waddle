<script setup lang="ts">
defineProps<{
    span?: number;
}>();
</script>

<template>
    <div :class="`col-span-${span ?? 12}`">
        <slot />
    </div>
</template>
