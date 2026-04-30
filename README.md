# Design system

Implementazione del design system in Vue.js.

### Changelog

Look at the changes at [CHANGELOG.md](./CHANGELOG.md).

### Structure

[![Structure for categories](image.png)](https://styledictionary.com/info/tokens/#category--type--item)

Use [configuration](https://styledictionary.com/reference/config/) in config.json.

Foundation tokens: what is the color
Semantic tokens: what is the use

### Use the library

```
// main.ts

import DesignSystem from "@daniele-tentoni/design-system";

import "@daniele-tentoni/design-system/variables.css";
import "@daniele-tentoni/design-system/style.css";

createApp(App).use(DesignSystem).mount("#app");
```

Use "Inter" and "Playfair Display" fonts:

```
// index.html

<head>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet">
</head>
<body>
<div id="app" class="ds-root"></div>
</body>
```

### Build

Use `npm run build` to build the library.

### Development

Use `npm pack` and `npm install @daniele-tentoni/...` in your local project.

### TODO

"letterSpacing" can't be defined in typography design token. Find a better suite for that option.

C'è un margine sopra a h1 che sposta in basso tutto il body. Questo dovrebbe comunque rimanere interno al body, non esterno.
