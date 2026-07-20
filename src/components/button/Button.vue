<script setup lang="ts">
import { computed, useSlots } from 'vue';

type ButtonVariant = 'default' | 'white' | 'outline-blue' | 'outline-white' | 'icon';
type ButtonSize = 'small' | 'big' | 'sm' | 'md' | 'lg';
type ButtonType = 'button' | 'submit' | 'reset';

const props = withDefaults(
    defineProps<{
        variant?: ButtonVariant;
        size?: ButtonSize;
        type?: ButtonType;
        disabled?: boolean;
    }>(),
    {
        variant: 'default',
        size: 'big',
        type: 'button',
        disabled: false,
    },
);

const slots = useSlots();

const normalizedSize = computed<'small' | 'big'>(() => {
    // Temporary compatibility for legacy size aliases; remove before the next major release.
    if (props.size === 'small' || props.size === 'sm') {
        return 'small';
    }

    return 'big';
});

const hasIcon = computed(() => Boolean(slots.icon));

const classes = computed(() => {
    return [
        'b-button',
        `b-button--${props.variant}`,
        `b-button--size-${normalizedSize.value}`,
        hasIcon.value ? 'has-icon' : '',
        props.disabled ? 'is-disabled' : '',
    ]
        .filter(Boolean)
        .join(' ');
});
</script>

<template>
    <button :class="classes" :type="type" :disabled="disabled">
        <span v-if="hasIcon" class="b-button__icon" aria-hidden="true">
            <slot name="icon" />
        </span>

        <span v-if="$slots.default" class="b-button__label">
            <slot />
        </span>
    </button>
</template>

<style scoped>
.b-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    min-height: 3rem;
    padding: 0.875rem 1.5rem;
    border: 1px solid transparent;
    border-radius: 9999px;
    background-color: var(--semantic-action-primary-background);
    color: var(--semantic-action-primary-text);
    font: var(--typography-content-small-md);
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    transition:
        background-color 160ms ease,
        border-color 160ms ease,
        color 160ms ease,
        opacity 160ms ease;
    appearance: none;
}

.b-button:hover:not(:disabled) {
    background-color: var(--semantic-action-primary-hover);
}

.b-button:active:not(:disabled) {
    background-color: var(--semantic-action-primary-active);
    color: var(--semantic-text-primary);
}

.b-button:focus-visible {
    outline: 2px solid var(--semantic-action-primary-hover);
    outline-offset: 2px;
}

.b-button:disabled,
.b-button.is-disabled {
    opacity: 0.56;
    cursor: not-allowed;
}

.b-button--size-small {
    min-height: 2.25rem;
    padding: 0.625rem 1rem;
}

.b-button--size-big {
    min-height: 3rem;
    padding: 0.875rem 1.5rem;
}

.b-button--white {
    background-color: var(--color-palette-neutral-0);
    color: var(--semantic-action-primary-background);
}

.b-button--white:hover:not(:disabled) {
    background-color: var(--color-palette-main-50);
}

.b-button--white:active:not(:disabled) {
    background-color: var(--color-palette-main-100);
    color: var(--semantic-text-primary);
}

.b-button--outline-blue {
    background-color: transparent;
    border-color: var(--semantic-action-primary-background);
    color: var(--semantic-action-primary-background);
}

.b-button--outline-blue:hover:not(:disabled) {
    border-color: var(--semantic-action-primary-hover);
    color: var(--semantic-action-primary-hover);
}

.b-button--outline-blue:active:not(:disabled) {
    background-color: var(--color-palette-main-50);
    border-color: var(--semantic-action-primary-active);
    color: var(--semantic-text-primary);
}

.b-button--outline-white {
    background-color: transparent;
    border-color: var(--color-palette-neutral-0);
    color: var(--color-palette-neutral-0);
}

.b-button--outline-white:hover:not(:disabled) {
    background-color: rgb(255 255 255 / 0.12);
}

.b-button--outline-white:active:not(:disabled) {
    background-color: rgb(255 255 255 / 0.2);
}

.b-button--icon {
    padding-inline: 1rem;
}

.b-button__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.b-button__icon :deep(svg) {
    width: 1em;
    height: 1em;
    display: block;
}

.b-button__label {
    display: inline-flex;
    align-items: center;
}
</style>
