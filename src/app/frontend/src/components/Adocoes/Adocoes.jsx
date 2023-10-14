// Import necessary dependencies
import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { TextField } from '@mui/material';
import { styled } from '@mui/system';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import EditModal from './AdocoesModal/AdocoesModalEdicao';
import CreateModal from './AdocoesModal/CriarAdocaoModal';
import { Button } from '@mui/material';  // Import Button from MUI
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

const StyledDataGridContainer = styled('div')({
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  padding: '42px',
  width: '90%',  // Ajusta a largura para 100%
  height: '700px',  // Ajusta a altura conforme necessário
});

const Adocoes = () => {
    const [openModal, setOpenModal] = useState(false);
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [filterText, setFilterText] = useState('');
    const [adocoes, setAdocoes] = useState([]); // Alteração: Estado para armazenar dados da API

    useEffect(() => {
        // Função para buscar os dados da API e atualizar o estado
        const fetchData = async () => {
            try {
                const { data } = await axios.get("http://localhost:4000/adocoes", {
                    withCredentials: true,
                });
                setAdocoes(data); // Atualiza o estado com os dados da API
            } catch (error) {
                console.error('Erro ao buscar dados da API:', error);
            }
        };

        fetchData(); // Chama a função ao montar o componente
    }, []);

    const handleEdit = (rowData) => {
        setSelectedRow(rowData);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedRow(null);

    };


    const handleOpenCreateModal = () => {
        setOpenCreateModal(true);
    };
    const getRowId = (row) => row._id;

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'concluída':
                return 'green';
            case 'em andamento':
                return 'blue';
            case 'pendente':
                return 'red';
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
        { field: 'adotante', headerName: 'Adotante', flex: 1 },
        { field: 'gato', headerName: 'Gato', flex: 1 },
        { field: 'responsavel', headerName: 'Responsável', flex: 1 },
        { field: 'data_adocao', headerName: 'Data de Adoção', flex: 1 },
        {
            field: 'statusAdocao',
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
        {
            field: 'editar',
            headerName: 'Editar',
            flex: 1,
            renderCell: (params) => (
                <Button onClick={() => handleEdit(params.row)}>
                    <BorderColorIcon />
                </Button>
            ),
        },
    ];

    return (
        <>
            <StyledDataGridContainer>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
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
                        color="success"  // Assuming 'success' represents the green color
                        onClick={handleOpenCreateModal}
                        startIcon={<AddIcon style={{ color: 'white' }} />}
                    >
                        Adicionar
                    </Button>
                </div>

                <CreateModal open={openCreateModal} onClose={() => setOpenCreateModal(false)} />

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
                    getRowId={getRowId}  // Configuração do getRowId para usar a propriedade _id
                />
            </StyledDataGridContainer>

            <EditModal
                open={openModal}
                onClose={handleCloseModal}
                rowData={selectedRow}
            />
        </>
    );
};

export default Adocoes;
