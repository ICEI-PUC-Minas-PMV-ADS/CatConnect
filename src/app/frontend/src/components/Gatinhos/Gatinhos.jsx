import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import "./Gatinhos.css";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Edit from "@mui/icons-material/Edit";
import { useModal } from "../../contexts/ModalContext";
import GatinhosModal from "./GatinhosModal/GatinhosModal";
import { MdPets } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";

const Gatinhos = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterText, setFilterText] = useState("");
  const [gatinhos, setGatinhos] = useState([]);
  const { openModal, closeModal } = useModal();

  useEffect(() => {
    getGatinhos();
  }, []);

  const getGatinhos = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/gatos", {
        withCredentials: true,
      });
      if (!data) {
        toast.error(
          data.error ? data.error : "Houve um erro ao coletar os gatinhos 😿",
          {
            theme: "dark",
          }
        );
      } else {
        setGatinhos(data);
      }
    } catch {
      toast.error("Houve um erro ao adicionar um novo gatinho 😿", {
        theme: "dark",
      });
    }
  };

  const handleAddGato = async (newGato) => {
    delete newGato["_id"];
    try {
      const { data } = await axios.post(
        "http://localhost:4000/gatos",
        newGato,
        {
          withCredentials: true,
        }
      );
      if (!data.created) {
        toast.error(
          data.error
            ? data.error
            : "Houve um erro ao adicionar um novo gato 😿",
          {
            theme: "dark",
          }
        );
        closeModal();
      } else {
        toast(`Gatinho adicionado com sucesso! 😽`, {
          theme: "dark",
        });
        getGatinhos();
        closeModal();
      }
    } catch {
      toast.error("Houve um erro ao adicionar um novo gato", {
        theme: "dark",
      });
      closeModal();
    }
  };

  const handleEditGato = async (editedGato) => {
    try {
      const { data } = await axios.put(
        `http://localhost:4000/gatos/${editedGato._id}`,
        editedGato,
        {
          withCredentials: true,
        }
      );
      if (!data.updated) {
        toast.error(
          data.error ? data.error : "Houve um erro ao editar um gato 😿",
          {
            theme: "dark",
          }
        );
        closeModal();
      } else {
        toast(`Gato editado com sucesso! 😽`, {
          theme: "dark",
        });
        getGatinhos();
        closeModal();
      }
    } catch {
      toast.error("Houve um erro ao editar um gato 😿", {
        theme: "dark",
      });
      closeModal();
    }
  };

  const handleViewGato = () => {
    closeModal();
  };

  const abrirAddGato = () => {
    openModal(
      "Adicionar gato",
      <GatinhosModal handleSubmitFunction={handleAddGato} edit={true} />
    );
  };

  const openEditModal = (rowId, e) => {
    e.stopPropagation();
    let editedRow = gatinhos.find((row) => row._id === rowId);
    openModal(
      "Editar gato",
      <GatinhosModal
        handleSubmitFunction={handleEditGato}
        gatinho={editedRow}
        edit={true}
      />
    );
  };

  const openViewModal = (rowId) => {
    let editedRow = gatinhos.find((row) => row._id === rowId);
    openModal(
      "Visualizar gato",
      <GatinhosModal
        handleSubmitFunction={handleViewGato}
        gatinho={editedRow}
      />
    );
  };
  // Columns definition, including the "editar" column with a button
  const columns = [
    { field: "nome", headerName: "Nome", flex: 1 },
    { field: "local", headerName: "Local", flex: 1 },
    { field: "saude", headerName: "Saúde", flex: 1 },
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
  const filteredRows = gatinhos.filter((row) => {
    return Object.values(row).some((value) =>
      String(value).toLowerCase().includes(filterText.toLowerCase())
    );
  });

  return (
    <div className="user-container">
      <div className="user-dados">
        <div className="user-linha space-between">
          <div className="user-linha">
            <MdPets />
            <h1 className="titulo">Gatinhos</h1>
          </div>
          <Button id="add-user" onClick={() => abrirAddGato()}>
            <span style={{ fontSize: "24px", color: "white" }}>+</span>
          </Button>
        </div>
        <div className="user-linha">
          <div id="user-table">
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

export default Gatinhos;
