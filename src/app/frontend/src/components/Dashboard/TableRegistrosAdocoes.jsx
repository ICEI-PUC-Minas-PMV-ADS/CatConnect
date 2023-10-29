import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import "../Dashboard/Dashboard.css";
import { BsChevronDown } from "react-icons/bs";


const columns = [
    { field: 'nome', headerName: 'Nome', flex: 1 },
    { field: 'observacoes', headerName: 'Observações', flex: 1 },
    { field: 'data_adocao', headerName: 'Data de Adoção', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
];

const rows = [
    { id: 1, nome: 'morgana', observacoes: 'Filhote', data_adocao: '10/01/2023', status: 'Em adoção' },
    { id: 2, nome: 'nina', observacoes: 'Filhote', data_adocao: '10/01/2023', status: 'Adotado' },
    { id: 3, nome: 'nero', observacoes: 'Adulto', data_adocao: '10/01/2023', status: 'Adotado' },
    { id: 4, nome: 'cat', observacoes: 'Adulto FIV', data_adocao: '10/01/2023', status: 'Adotado' },

];

export default function TableRegistros() {
    const getRowId = (row) => row.id;
    return (
        <div className="boxGrid">
            <div className="user-linha space-between">
                <h2>Adoções</h2>
                <div className="btn">
                    <button className="btnFiltro" >
                        <p>Nome</p>
                        <BsChevronDown
                            size={12}
                            style={{
                                color: "black",
                            }}
                        />
                    </button>
                    <button className="btnFiltro" >
                        <p>Data de adoção</p>
                        <BsChevronDown
                            size={12}
                            style={{
                                color: "black",
                            }}
                        />
                    </button>
                    <button className="btnFiltro" >
                        <p>Status</p>
                        <BsChevronDown
                            size={12}
                            style={{
                                color: "black",
                            }}
                        />
                    </button>
                </div>
            </div>
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
                    disableRowSelectionOnClick
                />
            </div>
        </div>
    );

}