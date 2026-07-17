<template>
    <div class="w-full overflow-x-auto rounded-lg border border-slate-200">
        <table class="w-full min-w-full border-collapse text-left text-sm">
            <thead class="bg-slate-50 text-slate-700">
                <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
                    <th
                        v-for="header in headerGroup.headers"
                        :key="header.id"
                        class="border-b border-slate-200 px-4 py-3 font-semibold"
                    >
                        <template v-if="!header.isPlaceholder">
                            <FlexRender
                                :render="header.column.columnDef.header"
                                :props="header.getContext()"
                            />
                        </template>
                    </th>
                </tr>
            </thead>

            <tbody class="bg-white text-slate-900">
                <tr
                    v-for="row in table.getRowModel().rows"
                    :key="row.id"
                    class="transition-colors hover:bg-slate-50"
                >
                    <td
                        v-for="cell in row.getVisibleCells()"
                        :key="cell.id"
                        class="border-b border-slate-100 px-4 py-3"
                    >
                        <FlexRender
                            :render="cell.column.columnDef.cell"
                            :props="cell.getContext()"
                        />
                    </td>
                </tr>
            </tbody>
        </table>

        <p
            v-if="table.getRowModel().rows.length === 0"
            class="border-t border-slate-100 px-4 py-6 text-center text-sm text-slate-500"
        >
            {{ emptyText }}
        </p>
    </div>
</template>

<script setup lang="ts">
import { FlexRender, getCoreRowModel, type ColumnDef, useVueTable } from '@tanstack/vue-table';

const props = withDefaults(
    defineProps<{
        columns: ColumnDef<any, any>[];
        data: any[];
        emptyText?: string;
    }>(),
    {
        emptyText: 'No data available',
    },
);

const table = useVueTable<any>({
    get data() {
        return props.data;
    },
    get columns() {
        return props.columns;
    },
    getCoreRowModel: getCoreRowModel(),
});
</script>
