import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import "../Dashboard/Dashboard.css";

const columns = [
    { field: 'nome', headerName: 'Nome', flex: 1 },
    { field: 'local', headerName: 'Local', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
];

const rows = [
    { id: 1, nome: 'morgana', local: 'Parque', status: 'Em adoção' },
    { id: 2, nome: 'nina', local: 'Parque', status: 'Adotado' },
    { id: 3, nome: 'nero', local: 'Parque', status: 'Adotado' },
    { id: 4, nome: 'cat', local: 'Parque', status: 'Adotado' },

];

export default function TableRegistros() {
    const getRowId = (row) => row.id;
    return (
        <div className="boxGrid">
            <h2>Últimos registros</h2>
            <div className="grid">
                <DataGrid
                    rows={rows}
                    columns={columns}
                    getRowId={getRowId}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </div>
        </div>
    );

}