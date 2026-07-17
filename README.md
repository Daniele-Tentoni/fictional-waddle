# @daniele-tentoni/design-system

Vue 3 component library and styling foundation for the client projects maintained in this repository. The package provides reusable UI components, generated design tokens, and shared base styles so multiple applications can stay visually consistent while consuming only the parts they need.

This README is the primary documentation for the library and must be updated whenever the public API, styling API, setup flow, or development workflow changes.

## Table of Contents

- [1. Library Purpose](#1-library-purpose)
- [2. Installation and Basic Usage](#2-installation-and-basic-usage)
    - [Requirements](#requirements)
    - [Install the package](#install-the-package)
    - [Simplest setup: global plugin](#simplest-setup-global-plugin)
    - [Recommended setup for tree-shaking: named imports](#recommended-setup-for-tree-shaking-named-imports)
    - [Optional selective plugin registration](#optional-selective-plugin-registration)
- [3. Public Components and Styling API](#3-public-components-and-styling-api)
    - [Component exports](#component-exports)
    - [Responsive prop notation](#responsive-prop-notation)
    - [BButton](#bbutton)
    - [BContainer](#bcontainer)
    - [BGrid](#bgrid)
    - [BItem](#bitem)
    - [BDataTable](#bdatatable)
    - [Styling assets exposed by the package](#styling-assets-exposed-by-the-package)
        - [variables.css](#variablescss)
        - [style.css](#stylecss)
        - [Public CSS class](#public-css-class)
- [4. Library Development](#4-library-development)
    - [Install dependencies](#install-dependencies)
    - [Available scripts](#available-scripts)
    - [Development expectations](#development-expectations)
    - [Local package testing](#local-package-testing)

## 1. Library Purpose

This library is built to:

- provide reusable Vue UI components for client applications;
- distribute shared design tokens as CSS custom properties;
- ship base styles that align typography, colors, spacing, and layout conventions;
- support selective component usage through named exports so consuming applications can rely on tree-shaking.

For release history, see [CHANGELOG.md](./CHANGELOG.md).

## 2. Installation and Basic Usage

### Requirements

- Node.js 22 or newer for working on the library locally;
- Vue 3.5+ in the consuming application;
- `@tanstack/vue-table` when using `BDataTable`.

### Install the package

Install the library in the consuming project:

```bash
npm install @daniele-tentoni/design-system
```

If the project does not already include the required peers, install them as well:

```bash
npm install vue
```

Install TanStack Table only if the project uses the data table component:

```bash
npm install @tanstack/vue-table
```

### Simplest setup: global plugin

Import the library once in the application entry point, then load the generated CSS assets.

```ts
// main.ts

import { createApp } from 'vue';
import App from './App.vue';
import DesignSystem from '@daniele-tentoni/design-system';

import '@daniele-tentoni/design-system/variables.css';
import '@daniele-tentoni/design-system/style.css';

createApp(App).use(DesignSystem).mount('#app');
```

Apply the root class on the application container so the shared typography and colors become the default baseline:

```html
<div id="app" class="ds-root"></div>
```

If the application uses the font stack defined by the design tokens, load the fonts in the host HTML:

```html
<head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
        href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
        rel="stylesheet"
    />
</head>
```

### Recommended setup for tree-shaking: named imports

The plugin is optional. If a project wants to register only the components it actually uses, import them directly:

```vue
<script setup lang="ts">
import { BButton, BDataTable } from '@daniele-tentoni/design-system';
</script>
```

### Optional selective plugin registration

If a project prefers plugin-based global registration but still wants a restricted set of components, use `createDesignSystemPlugin`:

```ts
// main.ts

import { createApp } from 'vue';
import App from './App.vue';
import { createDesignSystemPlugin } from '@daniele-tentoni/design-system';

import '@daniele-tentoni/design-system/variables.css';
import '@daniele-tentoni/design-system/style.css';

createApp(App)
    .use(
        createDesignSystemPlugin({
            components: ['BButton', 'BDataTable'],
        }),
    )
    .mount('#app');
```

## 3. Public Components and Styling API

### Component exports

The library currently exposes the following Vue components:

- `BButton`
- `BContainer`
- `BGrid`
- `BItem`
- `BDataTable`

It also exports:

- the default plugin for global registration;
- `createDesignSystemPlugin` for selective registration;
- the CSS assets `@daniele-tentoni/design-system/variables.css` and `@daniele-tentoni/design-system/style.css`.

### Responsive prop notation

Grid-related components use the same responsive suffix convention:

- base prop: `propName`
- breakpoint variants: `propNameSm`, `propNameMd`, `propNameLg`, `propNameXl`

Examples: `paddingXMd`, `gutterLg`, `startXl`.

### BButton

Basic button component with design-system color classes and size variants.

Props:

- `size?: 'sm' | 'md' | 'lg'` with default `md`

Slots:

- default slot for button content

Example:

```vue
<template>
    <BButton size="lg">Save changes</BButton>
</template>
```

### BContainer

Centered content wrapper with horizontal padding and a constrained maximum width.

Props:

- `size?: 'sm' | 'md' | 'lg' | 'xl' | 'fluid'` with default `lg`
- `paddingX*?: 'none' | 'gutter' | 'gutter-md'`
  : default `paddingX='gutter-md'`; responsive variants: `paddingXSm|paddingXMd|paddingXLg|paddingXXl`
- `paddingY*?: 'none' | 'gutter' | 'gutter-md'`
  : default `paddingY='none'`; responsive variants: `paddingYSm|paddingYMd|paddingYLg|paddingYXl`

Slots:

- default slot for wrapped content

Example:

```vue
<template>
    <BContainer size="xl" padding-x="gutter" :padding-x-md="'gutter-md'" :padding-y-lg="'gutter'">
        <p>Page content</p>
    </BContainer>
</template>
```

### BGrid

12-column layout container with token-based gutter spacing.

Props:

- `gutter*?: 'none' | 'gutter' | 'gutter-md'`
  : default `gutter='gutter'`; responsive variants: `gutterSm|gutterMd|gutterLg|gutterXl`
- `gutterX*?: 'none' | 'gutter' | 'gutter-md'`
  : axis-specific horizontal gutter (`gutterXSm|gutterXMd|gutterXLg|gutterXXl`)
- `gutterY*?: 'none' | 'gutter' | 'gutter-md'`
  : axis-specific vertical gutter (`gutterYSm|gutterYMd|gutterYLg|gutterYXl`)

Slots:

- default slot for grid items

Example:

```vue
<template>
    <BGrid gutter="gutter" :gutter-md="'gutter-md'" gutter-y="none" :gutter-y-md="'gutter'">
        <BItem :span="12" :md="6" :lg="4">Sidebar</BItem>
        <BItem :span="12" :md="6" :lg="8">Main content</BItem>
    </BGrid>
</template>
```

### BItem

Grid item component for `BGrid`.

Props:

- `span*?: 1..12`
  : default `span=12`; responsive aliases for span are short: `sm|md|lg|xl`
- `offset*?: 1..12`
  : responsive variants `offsetSm|offsetMd|offsetLg|offsetXl`
- `start*?: 1..13`
  : responsive variants `startSm|startMd|startLg|startXl`
- `order*?: 1..12`
  : responsive variants `orderSm|orderMd|orderLg|orderXl`

Slots:

- default slot for the item content

Notes:

- `start` takes precedence over `offset` on the same breakpoint.
- Out-of-range values are ignored at runtime and fall back to safe defaults.

Example:

```vue
<template>
    <BItem :span="12" :md="6" :lg="4" :offsetLg="1" :order="2">Sidebar</BItem>
</template>
```

### BDataTable

Table component built on top of `@tanstack/vue-table`. It renders table headers, rows, and an empty state while leaving column definitions and cell rendering to TanStack Table.

Props:

- `columns: ColumnDef<any, any>[]`
- `data: any[]`
- `emptyText?: string` with default `No data available`

Example:

```vue
<script setup lang="ts">
import { h } from 'vue';
import { BDataTable } from '@daniele-tentoni/design-system';
import type { ColumnDef } from '@tanstack/vue-table';

type User = {
    name: string;
    role: string;
};

const data: User[] = [
    { name: 'Alice', role: 'Developer' },
    { name: 'Bob', role: 'Designer' },
];

const columns: ColumnDef<User>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
        cell: (info) => info.getValue() as string,
    },
    {
        accessorKey: 'role',
        header: 'Role',
        cell: (info) => h('span', { class: 'font-medium' }, info.getValue() as string),
    },
];
</script>

<template>
    <BDataTable :columns="columns" :data="data" empty-text="No results" />
</template>
```

### Styling assets exposed by the package

#### variables.css

`@daniele-tentoni/design-system/variables.css` exposes the generated CSS custom properties under `:root`.

Examples of token groups currently available:

- color palette tokens such as `--color-palette-main-500`;
- semantic tokens such as `--semantic-text-primary`;
- layout tokens such as `--layout-grid-gutter-base`;
- font and typography tokens such as `--font-body` and `--typography-heading-h1`.

Use this file when an application needs direct access to the design tokens in custom CSS.

#### style.css

`@daniele-tentoni/design-system/style.css` contains the generated base styles and component-level utility output needed by the library.

It currently provides:

- base margin reset for `html` and `body`;
- default sans-serif typography for body text;
- serif typography for headings;
- the `.ds-root` class, which applies the design-system text and surface defaults to the application root.

#### Public CSS class

The currently documented public class is:

- `.ds-root`: applies the shared root-level typography and color baseline for the host application.

## 4. Library Development

### Install dependencies

```bash
npm install
```

### Available scripts

- `npm run typecheck` runs `vue-tsc --noEmit`
- `npm run test:unit` runs the unit test suite with Vitest
- `npm run build:tokens` generates design tokens
- `npm run build:css` builds the distributed stylesheet
- `npm run build:lib` builds the library bundle with Vite
- `npm run build` runs the full build pipeline
- `npm run format` formats the repository with Prettier
- `npm run format:check` checks formatting

### Development expectations

- keep this README aligned with every public change to the library;
- update [CHANGELOG.md](./CHANGELOG.md) for every release-facing change;
- prefer documenting new components, props, CSS assets, and setup steps here as soon as they become public;
- validate library changes with the narrowest relevant checks before merging.

### Local package testing

To test the package in a separate local application, build or pack the library and install it in the consumer project.

```bash
npm pack
```

Then install the generated tarball in the consuming project.
