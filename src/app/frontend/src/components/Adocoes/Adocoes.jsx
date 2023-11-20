import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Edit from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import axios from 'axios';
import { toast } from 'react-toastify';
import { LiaCatSolid } from 'react-icons/lia';
import { routes } from '../../utils/api/ApiRoutes';
import AdocaoModal from './AdocoesModal/AdocaoModal';
import CreateModal from './AdocoesModal/AdocaoModal'; // Import CreateModal from your first version
import './Adocoes.css';

const Adocoes = () => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [filterText, setFilterText] = useState('');
  const [adocoes, setAdocoes] = useState([]);
  const [dataChanged, setDataChanged] = useState(false);
  const [dadosAdocao, setDadosAdocao] = useState('');
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, [dataChanged]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(routes.getAdocoes, {
        withCredentials: true,
      });
      setAdocoes(data);
    } catch (error) {
      console.error('Erro ao buscar dados da API:', error);
    }
  };

  const openViewModal = (rowId) => {
    let editedRow = adocoes.find((row) => row._id === rowId);
    setDadosAdocao(editedRow);
    setIsViewModalOpen(true);
  };

  const handleEditModal = (rowId, event) => {
    event.stopPropagation();
    let editedRow = adocoes.find((row) => row._id === rowId);
    setDadosAdocao(editedRow);
    setIsEditModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleDeleteAdocao = async (adocaoId) => {
    try {
      const { data } = await axios.delete(`${routes.deleteAdocao}/${adocaoId}`, {
        withCredentials: true,
      });
      if (data.deleted) {
        toast.success('Adoção excluída com sucesso!');
        fetchData();
      } else {
        toast.error('Houve um erro ao excluir a adoção', {
          theme: 'dark',
        });
      }
    } catch (error) {
      console.error('Houve um erro ao excluir uma adoção:', error);
      toast.error('Houve um erro ao excluir a adoção', {
        theme: 'dark',
      });
    }
  };

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  const columns = [
    { field: 'adotante', headerName: 'Adotante', flex: 1 },
    { field: 'gato', headerName: 'Gato', flex: 1 },
    { field: 'data_adocao', headerName: 'Data da adoção', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
    {
      field: 'editar',
      headerName: 'Editar',
      width: 60,
      renderCell: (params) => (
        <IconButton
          color="primary"
          onClick={(event) => handleEditModal(params.row._id, event)}
          style={{ borderRadius: '50%' }}
        >
          <Edit style={{ color: '#292D32' }} />
        </IconButton>
      ),
    },
  ];

  const filteredRows = adocoes.filter((row) => {
    return Object.values(row).some((value) =>
      String(value).toLowerCase().includes(filterText.toLowerCase())
    );
  });

  return (
    <div className="user-container">
      <div className="user-dados">
        <div className="user-linha space-between">
          <div className="user-linha">
            <LiaCatSolid />
            <h1 className="titulo">Adoções</h1>
          </div>
        </div>
        <div className="user-linha">
          <div className="user-table">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ margin: '10px' }}>
                <TextField
                  label="Filtro rápido"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={filterText}
                  onChange={handleFilterChange}
                />
              </div>
              <div style={{ marginLeft: 'auto', marginRight: '10px' }}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => setIsEditModalOpen(true)}
                  startIcon={<AddIcon style={{ color: 'white' }} />}
                >
                  Adicionar
                </Button>
              </div>
            </div>
            <div style={{ height: 'calc(100vh - 170px)', width: '100%' }}>
              <DataGrid
                sx={{
                  '& .MuiDataGrid-row:hover': {
                    cursor: 'pointer',
                  },
                }}
                getRowId={(row) => row?._id}
                rows={filteredRows}
                columns={columns}
                pageSize={rowsPerPage}
                page={page}
                onPageChange={(event, newPage) => setPage(newPage)}
                rowsPerPageOptions={[5, 10, 25]}
                onPageSizeChange={(pageSize) => {
                  setRowsPerPage(pageSize);
                  setPage(0);
                }}
                onRowClick={(params) => openViewModal(params.row._id)}
                components={{
                  Toolbar: GridToolbar,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {isViewModalOpen && (
        <CreateModal
          open={isViewModalOpen}
          dados={dadosAdocao}
          onClose={handleCloseViewModal}
          dataChanged={dataChanged}
        />
      )}

      {isEditModalOpen && (
        <CreateModal
          open={isEditModalOpen}
          dados={dadosAdocao}
          onClose={handleCloseEditModal}
          dataChanged={dataChanged}
        />
      )}
    </div>
  );
};

export default Adocoes;
