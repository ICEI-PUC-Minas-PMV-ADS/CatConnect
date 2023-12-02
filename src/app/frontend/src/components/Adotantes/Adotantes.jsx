import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import "./Adotantes.css";
import { DataGrid, GridToolbar, ptBR } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Edit from "@mui/icons-material/Edit";
import { useModal } from "../../contexts/ModalContext";
import AdotantesModal from "./AdotantesModal/AdotantesModal";
import { MdVolunteerActivism } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";

const Adotantes = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterText, setFilterText] = useState("");
  const [adotantes, setAdotantes] = useState([]);
  const { openModal, closeModal } = useModal();

  useEffect(() => {
    getAdotantes();
  }, []);

  const getAdotantes = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/adotantes", {
        withCredentials: true,
      });
      if (!data) {
        toast.error(
          data.error ? data.error : "Houve um erro ao coletar os adotantes",
          {
            theme: "dark",
          }
        );
      } else {
        setAdotantes(data);
      }
    } catch {
      toast.error("Houve um erro ao adicionar um novo adotante", {
        theme: "dark",
      });
    }
  };

  const handleAddAdotante = async (newAdotante) => {
    delete newAdotante["_id"];
    try {
      const { data } = await axios.post(
        "http://localhost:4000/adotantes",
        newAdotante,
        {
          withCredentials: true,
        }
      );
      if (!data.created) {
        toast.error(
          data.error
            ? data.error
            : "Houve um erro ao adicionar um novo adotante",
          {
            theme: "dark",
          }
        );
        closeModal();
      } else {
        toast(`Adotante adicionado com sucesso!`, {
          theme: "dark",
        });
        getAdotantes();
        closeModal();
      }
    } catch {
      toast.error("Houve um erro ao adicionar um novo adotante", {
        theme: "dark",
      });
      closeModal();
    }
  };

  const handleEditAdotante = async (editedAdotante) => {
    try {
      const { data } = await axios.put(
        `http://localhost:4000/adotantes/${editedAdotante._id}`,
        editedAdotante,
        {
          withCredentials: true,
        }
      );
      if (!data.updated) {
        toast.error(
          data.error ? data.error : "Houve um erro ao editar um adotante",
          {
            theme: "dark",
          }
        );
        closeModal();
      } else {
        toast(`Adotante editado com sucesso!`, {
          theme: "dark",
        });
        getAdotantes();
        closeModal();
      }
    } catch {
      toast.error("Houve um erro ao editar um adotante", {
        theme: "dark",
      });
      closeModal();
    }
  };

  const handleViewAdotante = () => {
    closeModal();
  };

  const abrirAddAdotante = () => {
    openModal(
      "Adicionar adotante",
      <AdotantesModal handleSubmitFunction={handleAddAdotante} edit={true} />
    );
  };

  const openEditModal = (rowId, e) => {
    e.stopPropagation();
    let editedRow = adotantes.find((row) => row._id === rowId);
    openModal(
      "Editar adotante",
      <AdotantesModal
        handleSubmitFunction={handleEditAdotante}
        adotante={editedRow}
        edit={true}
      />
    );
  };

  const openViewModal = (rowId) => {
    let editedRow = adotantes.find((row) => row._id === rowId);
    openModal(
      "Visualizar adotante",
      <AdotantesModal
        handleSubmitFunction={handleViewAdotante}
        adotante={editedRow}
      />
    );
  };
  // Columns definition, including the "editar" column with a button
  const columns = [
    { field: "nome", headerName: "Nome", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "instagram", headerName: "Instagram", flex: 1 },
    { field: "telefone", headerName: "Telefone", flex: 1 },
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

  // Pagination logic
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Filter logic
  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  // Filtered rows based on quick filter text
  const filteredRows = adotantes.filter((row) => {
    return Object.values(row).some((value) =>
      String(value).toLowerCase().includes(filterText.toLowerCase())
    );
  });

  return (
    <div className="user-container">
      <div className="user-dados">
        <div className="user-linha space-between">
          <div className="user-linha">
            <MdVolunteerActivism />
            <h1 className="titulo">Adotantes</h1>
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
                  onClick={abrirAddAdotante}
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
                localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adotantes;
