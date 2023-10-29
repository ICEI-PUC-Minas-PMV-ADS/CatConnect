import { DataGrid } from '@mui/x-data-grid';
import "../Dashboard/Dashboard.css";
import { BsChevronDown } from "react-icons/bs";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";


const TableRegistrosAdocoes = () => {
    const [adocoes, setAdocoes] = useState([]);

    useEffect(() => {
        getAdocoes();
    }, []);

        const getAdocoes = async () => {
            try {
                const { data } = await axios.get(
                    "http://localhost:4000/adocao",
                    {
                        withCredentials: true,
                    }
                );
                if (!data) {
                    toast.error(
                        data.error ? data.error : "Houve um erro ao coletar as adoções",
                        {
                            theme: "dark",
                        }
                    );
                } else {
                    setAdocoes(data);
                }
            } catch {
                toast.error("Houve um erro ao carregar as adoções", {
                    theme: "dark",
                });
            }
          
        };

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'concluido':
                return 'green';
            case 'em andamento':
                return 'blue';
            case 'pendente':
                return 'red';
            default:
                return 'black';
        }
    };

    const filteredRows = adocoes.filter((row) => {
        return Object.values(row).some((value) =>
            String(value).toLowerCase().includes(filterText.toLowerCase())
        );
    });

    const getRowId = (row) => row._id;

    const columns = [
        { field: 'adotante', headerName: 'Adotante', flex: 1 },
        { field: 'gato', headerName: 'Gato', flex: 1 },

        //{ field: 'observacoes', headerName: 'Observações', flex: 1 },
        {
            field: 'data_adocao',
            headerName: 'Data de Adoção',
            flex: 1,
            renderCell: (params) => (
                <div>
                    {params.row.data_adocao &&
                        format(new Date(params.row.data_adocao), 'dd/MM/yyyy')}
                </div>
            ),
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 1,
            renderCell: (params) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div
                        className="status-circle"
                        style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            backgroundColor: getStatusColor(params.row.status),
                            marginRight: '8px',
                        }}
                    ></div>
                    {params.row.status}
                </div>
            ),
        },

    ];

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
                    rows={filteredRows}
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

};

export default TableRegistrosAdocoes;