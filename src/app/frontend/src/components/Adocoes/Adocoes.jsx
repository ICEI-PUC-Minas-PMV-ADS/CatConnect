// Import necessary dependencies
import React, {useEffect, useState} from 'react';
import {DataGrid, GridToolbar} from '@mui/x-data-grid';
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

const StyledDataGridContainer = styled('div')({
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    padding: '42px',
    width: '80%',  // Ajusta a largura para 100%
    height: '60%',  // Ajusta a altura conforme necessário
});

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
                    <BorderColorIcon/>
                </Button>
            ),
        },
        {
            field: 'excluir',
            headerName: 'excluir',
            flex: 0,
            renderCell: (params) => (
                <Button onClick={() => handleDelete(params.row)}>
                    <DeleteForeverSharpIcon/>
                </Button>
            ),
        },
    ];

    return (
        <>
            <StyledDataGridContainer>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
                    <h1>Lista de adoções</h1>
                    <TextField
                        label="Filtro Rápido"
                        variant="outlined"
                        size="small"
                        value={filterText}
                        onChange={handleFilterChange}
                    />

                    <Button
                        variant="contained"
                        color="success"
                        onClick={handleOpenCreateModal}
                        startIcon={<AddIcon style={{color: 'white'}}/>}
                    >
                        Adicionar
                    </Button>
                </div>

                <CreateModal open={openCreateModal} dados={dadosAdocao} onClose={handleCloseCreateModal}
                             dataChanged={dataChanged}/>

                <DataGrid
                    rows={filteredRows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20]}
                    checkboxSelection
                    disableSelectionOnClick
                    components={{
                        Toolbar: GridToolbar,
                    }}
                    getRowId={getRowId}
                />
            </StyledDataGridContainer>


        </>
    );
};

export default Adocoes;
