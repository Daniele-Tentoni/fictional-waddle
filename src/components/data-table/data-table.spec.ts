import { render, screen } from '@testing-library/vue';
import { describe, expect, it } from 'vitest';
import type { ColumnDef } from '@tanstack/vue-table';
import BDataTable from './DataTable.vue';

type Row = {
    name: string;
    role: string;
};

describe('BDataTable', () => {
    const columns: ColumnDef<Row>[] = [
        {
            accessorKey: 'name',
            header: 'Name',
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'role',
            header: 'Role',
            cell: (info) => info.getValue(),
        },
    ];

    it('renders headers and rows', () => {
        render(BDataTable, {
            props: {
                columns,
                data: [{ name: 'Alice', role: 'Developer' }],
            },
        });

        expect(screen.getByText('Name')).toBeDefined();
        expect(screen.getByText('Role')).toBeDefined();
        expect(screen.getByText('Alice')).toBeDefined();
        expect(screen.getByText('Developer')).toBeDefined();
    });

    it('renders empty state when no rows are provided', () => {
        render(BDataTable, {
            props: {
                columns,
                data: [],
                emptyText: 'No rows yet',
            },
        });

        expect(screen.getByText('No rows yet')).toBeDefined();
    });
});
