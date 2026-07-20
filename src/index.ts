import type { App } from 'vue';
import './styles/tailwind.css';
import { BButton, BContainer, BDataTable, BGrid, BItem } from './components/index';

export * from './components/index';

const componentRegistry = {
    BButton,
    BContainer,
    BGrid,
    BItem,
    BDataTable,
} as const;

export type DesignSystemComponentName = keyof typeof componentRegistry;

export type DesignSystemPluginOptions = {
    components?: DesignSystemComponentName[];
};

export const createDesignSystemPlugin = (options: DesignSystemPluginOptions = {}) => ({
    install(app: App) {
        const selectedComponents =
            options.components ?? (Object.keys(componentRegistry) as DesignSystemComponentName[]);

        selectedComponents.forEach((name) => {
            app.component(name, componentRegistry[name]);
        });
    },
});

export default createDesignSystemPlugin();
