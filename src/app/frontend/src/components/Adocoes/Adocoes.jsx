// Import necessary dependencies
import React, {useEffect, useState} from 'react';
import {DataGrid, GridToolbar} from '@mui/x-data-grid';
import TextField from "@mui/material/TextField";
import {styled} from '@mui/system';
import Edit from "@mui/icons-material/Edit";
import Swal from 'sweetalert2';
import CreateModal from './AdocoesModal/AdocaoModal';
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import {format} from 'date-fns';
import {toast} from 'react-toastify';
import {routes} from "../../utils/api/ApiRoutes";
import { LiaCatSolid } from "react-icons/lia";
import "./Adocoes.css";


const Adocoes = () => {
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [page, setPage] = useState(0);
    const [filterText, setFilterText] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);
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

    // Pagination logic
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
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

      // Columns definition, including the "editar" column with a button
  const columns = [
    { field: "adotante", headerName: "Adotante", flex: 1 },
    { field: "gato", headerName: "Gato", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    { field: "data_adocao", headerName: "Data da adoção", flex: 1 },
    {
      field: "editar",
      headerName: "Editar",
      width: 60,
      renderCell: (params) => (
        <IconButton
          color="primary"
          onClick={(event) => openEditModal(params.row._id, event)}
          style={{ borderRadius: "50%" }}
        >
          <Edit style={{ color: "#292D32" }} />
        </IconButton>
        ),
        },
    ];

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
};

    // Filtered rows based on quick filter text
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
                      startIcon={<AddIcon style={{ color: 'white' }} />}
                    >
                      Adicionar
                    </Button>
                  </div>
                </div>
                <div style={{ height: "calc(100vh - 170px)", width: "100%" }}>
                  <DataGrid
                    sx={{
                      // pointer cursor on ALL rows
                      "& .MuiDataGrid-row:hover": {
                        cursor: "pointer",
                      },
                    }}
                    getRowId={(row) => row?._id}
                    rows={filteredRows}
                    columns={columns}
                    pageSize={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
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
        </div>
      );

};

export default Adocoes;
