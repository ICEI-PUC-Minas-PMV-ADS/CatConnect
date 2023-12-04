// Import necessary dependencies
import React, {useEffect, useState} from 'react';
import {DataGrid, GridToolbar, ptBR} from '@mui/x-data-grid';
import {TextField} from '@mui/material';
import {styled} from '@mui/system';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import Swal from 'sweetalert2';
import CreateModal from './AdocoesModal/AdocaoModal';
import {Button} from '@mui/material';  // Import Button from MUI
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import {format} from 'date-fns';
import {toast} from 'react-toastify';
import {routes} from "../../utils/api/ApiRoutes";
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import './Adocoes.css';
import {MdVolunteerActivism} from "react-icons/md";


const Adocoes = () => {
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [filterText, setFilterText] = useState('');
    const [adocoes, setAdocoes] = useState([]);
    const [dataChanged, setDataChanged] = useState(false);
    const [dadosAdocao, setDadosAdocao] = useState('')




    useEffect(() => {

        fetchData();
    }, [dataChanged]);
    const fetchData = async () => {
        try {
            const {data} = await axios.get(routes.getAdocoes, {
                withCredentials: true,
            });
            setAdocoes(data);
        } catch (error) {
            console.error('Erro ao buscar dados da API:', error);
        }
    };


    const handleEdit = (rowDataId) => {
        setOpenCreateModal(true);
        getAdotante(rowDataId)


    };

    const handleCloseCreateModal = () => {
        setOpenCreateModal(false);
        setDataChanged((prev) => !prev);
    };
    const handleOpenCreateModal = () => {
        setOpenCreateModal(true);
    };
    const getAdotante = async (rowDataId) => {
        try {
            if (rowDataId) {
                const {data} = await axios.get(routes.getDetalhesAdotanteAdocao(rowDataId), {
                    withCredentials: true,
                });
                if (!data) {
                    toast.error(
                        data.error ? data.error : "Houve um erro ao verifcar adoção",
                        {
                            theme: "dark",
                        }
                    );
                }
                setDadosAdocao(data)
            }

            rowDataId = null
        } catch (error) {
            console.error('Erro ao buscar dados da API:', error);
        }
    };
    const handleDelete = async (rowData) => {
        Swal.fire({
            title: 'Você tem certeza?',
            text: 'Essa ação não poderá ser desfeita!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#198d16',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, excluir!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.delete(routes.deleteAdocao(rowData._id), {
                        withCredentials: true,
                    });
                    if (response.status === 200) {
                        toast.success('Registro excluído com sucesso!');
                        setDataChanged((prev) => !prev);
                    } else {
                        toast.error('Ocorreu um erro ao excluir o registro.');
                    }
                } catch (error) {
                    console.error('Erro ao excluir:', error);
                    toast.error('Ocorreu um erro ao excluir o registro.');
                }
            }
        });
    };

    const getRowId = (row) => row._id;

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'concluido':
                return '#1A932E';
            case 'em andamento':
                return '#DFA510';
            case 'pendente':
                return '#EE201C';
            default:
                return 'black';
        }
    };

    // Filtered rows based on quick filter text
    const filteredRows = adocoes.filter((row) => {
        return Object.values(row).some((value) =>
            String(value).toLowerCase().includes(filterText.toLowerCase())
        );
    });


    const handleFilterChange = (event) => {
        setFilterText(event.target.value);
    };

    // Colunas do data table
    const columns = [
        {field: 'adotante', headerName: 'Adotante', flex: 1},
        {field: 'gato', headerName: 'Nome do Gato', flex: 1},
        {field: 'responsavel', headerName: 'Responsável', flex: 1},
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
            field: 'statusAdocao',
            headerName: 'Status',
            flex: 1,
            renderCell: (params) => (
                <div style={{display: 'flex', alignItems: 'center'}}>
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

        {
            field: 'editar',
            headerName: 'Editar',
            flex: 0,
            renderCell: (params) => (
                <Button  key={params.row._id} onClick={(event) => handleEdit(params.row._id)}>
                    <BorderColorIcon style={{color:'black'}}/>
                </Button>
            ),
        },
        {
            field: 'excluir',
            headerName: 'excluir',
            flex: 0,
            renderCell: (params) => (
                <Button onClick={() => handleDelete(params.row)}>
                    <DeleteForeverSharpIcon style={{color:'black'}}/>
                </Button>
            ),
        },
    ];

    return (
        <div className="user-container">
            <div className="user-dados">
                <div className="user-linha space-between">
                    <div className="user-linha">
                        <MdVolunteerActivism />
                        <h1 className="titulo">Adoções</h1>
                    </div>

                </div>
                <div className="user-linha">
                    <div className="user-table">
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <div style={{ margin: "10px" }}>
                                <TextField
                                    label="Filtro rápido"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    value={filterText}
                                    onChange={handleFilterChange}
                                />
                            </div>
                            <div style={{ marginLeft: "auto", marginRight: "10px" }}>
                                <Button
                                    variant="contained"
                                    color="success"
                                    onClick={handleOpenCreateModal}
                                    startIcon={<AddIcon style={{color: 'white'}}/>}
                                >
                                    Adicionar
                                </Button>
                                <CreateModal open={openCreateModal} dados={dadosAdocao} onClose={handleCloseCreateModal}
                                             dataChanged={dataChanged}/>
                            </div>
                        </div>
                        <div style={{ height: "calc(100vh - 170px)", width: "100%" }}>
                            <DataGrid
                                sx={{
                                    "& .MuiDataGrid-row:hover": {
                                        cursor: "pointer",
                                    },
                                }}
                                rows={filteredRows}
                                columns={columns}
                                pageSize={5}
                                rowsPerPageOptions={[5, 10, 25]}
                                getRowId={getRowId}
                                components={{
                                    Toolbar: GridToolbar,
                                }}
                                localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Adocoes;
