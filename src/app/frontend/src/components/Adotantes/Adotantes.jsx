import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import "./Adotantes.css";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Edit from "@mui/icons-material/Edit";
import { useModal } from "../../contexts/ModalContext";
import AdotantesModal from "./AdotantesModal/AdotantesModal";
import { MdVolunteerActivism } from "react-icons/md";

const Adotantes = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterText, setFilterText] = useState("");
  const { openModal, closeModal } = useModal();

  const handleAddAdotante = (newAdotante) => {
    //TODO: Salvar adotante no banco
    alert("Adotante salvado com sucesso!", newAdotante);
    console.log("Adotante salvado com sucesso!", newAdotante);
    mockData.push(newAdotante);
    closeModal();
  };

  const handleEditAdotante = (editedAdotante) => {
    //TODO: Editar adotante no banco
    alert("Adotante alterado com sucesso!", editedAdotante);
    console.log("Adotante alterado com sucesso!", editedAdotante);
    let adotanteIndex = mockData.findIndex(
      (adotante) => adotante.id == editedAdotante.id
    );
    mockData[adotanteIndex] = editedAdotante;
    closeModal();
  };

  const handleViewAdotante = () => {
    closeModal();
  };

  // Open Modal Function
  const abrirAddAdotante = () => {
    openModal(
      "Adicionar adotante",
      <AdotantesModal handleSubmitFunction={handleAddAdotante} edit={true} />
    );
  };

  const openEditModal = (rowId, e) => {
    e.stopPropagation();
    let editedRow = mockData.find((row) => row.id === rowId);
    //TODO: Pegar o adotante com dados completos
    editedRow = {
      ...editedRow,
      rg: "MG-11.111.111",
      cpf: "111.111.111-11",
      cep: "11.111-111",
      rua: `Rua do adotante ${editedRow.id}`,
    };

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
    let editedRow = mockData.find((row) => row.id === rowId);
    //TODO: Pegar o adotante com dados completos
    editedRow = {
      ...editedRow,
      rg: "MG-11.111.111",
      cpf: "111.111.111-11",
      cep: "11.111-111",
      rua: `Rua do adotante ${editedRow.id}`,
    };
    console.log("editedRow", editedRow);
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
    { field: "instagram", headerName: "Instagram", flex: 1 },
    { field: "telefone", headerName: "Telefone", flex: 1 },
    { field: "cidade", headerName: "Cidade", flex: 1 },
    { field: "bairro", headerName: "Bairro", flex: 1 },
    {
      field: "editar",
      headerName: "Editar",
      width: 60,
      renderCell: (params) => (
        <IconButton
          color="primary"
          onClick={(event) => openEditModal(params.row.id, event)}
          style={{ borderRadius: "50%" }}
        >
          <Edit style={{ color: "#292D32" }} />
        </IconButton>
      ),
    },
  ];

  let mockData = [
    {
      id: 1,
      nome: "Adotante legal 1",
      instagram: "@adontante1",
      telefone: "(31) 99999-9999",
      cidade: "Belo Horizonte",
      bairro: "Santa Tereza",
    },
    {
      id: 2,
      nome: "Adotante legal 2",
      instagram: "@adontante2",
      telefone: "(31) 99999-9999",
      cidade: "Belo Horizonte",
      bairro: "Santa Tereza",
    },
    {
      id: 3,
      nome: "Adotante legal 3",
      instagram: "@adontante3",
      telefone: "(31) 99999-9999",
      cidade: "Belo Horizonte",
      bairro: "Santa Tereza",
    },
    {
      id: 4,
      nome: "Adotante legal 4",
      instagram: "@adontante4",
      telefone: "(31) 99999-9999",
      cidade: "Belo Horizonte",
      bairro: "Santa Tereza",
    },
    {
      id: 5,
      nome: "Adotante legal 5",
      instagram: "@adontante5",
      telefone: "(31) 99999-9999",
      cidade: "Belo Horizonte",
      bairro: "Santa Tereza",
    },
    {
      id: 6,
      nome: "Adotante legal 6",
      instagram: "@adontante6",
      telefone: "(31) 99999-9999",
      cidade: "Belo Horizonte",
      bairro: "Santa Tereza",
    },
    {
      id: 7,
      nome: "Adotante legal 7",
      instagram: "@adontante7",
      telefone: "(31) 99999-9999",
      cidade: "Belo Horizonte",
      bairro: "Santa Tereza",
    },
    {
      id: 8,
      nome: "Adotante legal 8",
      instagram: "@adontante8",
      telefone: "(31) 99999-9999",
      cidade: "Belo Horizonte",
      bairro: "Santa Tereza",
    },
    {
      id: 9,
      nome: "Adotante legal 9",
      instagram: "@adontante9",
      telefone: "(31) 99999-9999",
      cidade: "Belo Horizonte",
      bairro: "Santa Tereza",
    },
    {
      id: 10,
      nome: "Adotante legal 10",
      instagram: "@adontante10",
      telefone: "(31) 99999-9999",
      cidade: "Belo Horizonte",
      bairro: "Santa Tereza",
    },
    {
      id: 11,
      nome: "Adotante legal 11",
      instagram: "@adontante11",
      telefone: "(31) 99999-9999",
      cidade: "Belo Horizonte",
      bairro: "Santa Tereza",
    },
    {
      id: 12,
      nome: "Adotante legal 12",
      instagram: "@adontante12",
      telefone: "(31) 99999-9999",
      cidade: "Belo Horizonte",
      bairro: "Santa Tereza",
    },
    {
      id: 13,
      nome: "Adotante legal 13",
      instagram: "@adontante13",
      telefone: "(31) 99999-9999",
      cidade: "Belo Horizonte",
      bairro: "Santa Tereza",
    },
    {
      id: 14,
      nome: "Adotante legal 14",
      instagram: "@adontante14",
      telefone: "(31) 99999-9999",
      cidade: "Belo Horizonte",
      bairro: "Santa Tereza",
    },
    {
      id: 15,
      nome: "Adotante legal 15",
      instagram: "@adontante15",
      telefone: "(31) 99999-9999",
      cidade: "Belo Horizonte",
      bairro: "Santa Tereza",
    },
    {
      id: 16,
      nome: "Adotante legal 16",
      instagram: "@adontante16",
      telefone: "(31) 99999-9999",
      cidade: "Belo Horizonte",
      bairro: "Santa Tereza",
    },
    {
      id: 17,
      nome: "Adotante legal 17",
      instagram: "@adontante17",
      telefone: "(31) 99999-9999",
      cidade: "Belo Horizonte",
      bairro: "Santa Tereza",
    },
    {
      id: 18,
      nome: "Adotante legal 18",
      instagram: "@adontante18",
      telefone: "(31) 99999-9999",
      cidade: "Belo Horizonte",
      bairro: "Santa Tereza",
    },
    {
      id: 19,
      nome: "Adotante legal 19",
      instagram: "@adontante19",
      telefone: "(31) 99999-9999",
      cidade: "Belo Horizonte",
      bairro: "Santa Tereza",
    },
    {
      id: 20,
      nome: "Adotante legal 20",
      instagram: "@adontante20",
      telefone: "(31) 99999-9999",
      cidade: "Belo Horizonte",
      bairro: "Santa Tereza",
    },
    {
      id: 21,
      nome: "Adotante legal 21",
      instagram: "@adontante21",
      telefone: "(31) 99999-9999",
      cidade: "Belo Horizonte",
      bairro: "Santa Tereza",
    },
    {
      id: 22,
      nome: "Adotante legal 22",
      instagram: "@adontante22",
      telefone: "(31) 99999-9999",
      cidade: "Belo Horizonte",
      bairro: "Santa Tereza",
    },
    {
      id: 23,
      nome: "Adotante legal 23",
      instagram: "@adontante23",
      telefone: "(31) 99999-9999",
      cidade: "Belo Horizonte",
      bairro: "Santa Tereza",
    },
    {
      id: 24,
      nome: "Adotante legal 24",
      instagram: "@adontante24",
      telefone: "(31) 99999-9999",
      cidade: "Belo Horizonte",
      bairro: "Santa Tereza",
    },
    {
      id: 25,
      nome: "Adotante legal 25",
      instagram: "@adontante25",
      telefone: "(31) 99999-9999",
      cidade: "Belo Horizonte",
      bairro: "Santa Tereza",
    },
    {
      id: 26,
      nome: "Adotante legal 26",
      instagram: "@adontante26",
      telefone: "(31) 99999-9999",
      cidade: "Belo Horizonte",
      bairro: "Santa Tereza",
    },
    {
      id: 27,
      nome: "Adotante legal 27",
      instagram: "@adontante27",
      telefone: "(31) 99999-9999",
      cidade: "Belo Horizonte",
      bairro: "Santa Tereza",
    },
    {
      id: 28,
      nome: "Adotante legal 28",
      instagram: "@adontante28",
      telefone: "(31) 99999-9999",
      cidade: "Belo Horizonte",
      bairro: "Santa Tereza",
    },
    {
      id: 29,
      nome: "Adotante legal 29",
      instagram: "@adontante29",
      telefone: "(31) 99999-9999",
      cidade: "Belo Horizonte",
      bairro: "Santa Tereza",
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
  const filteredRows = mockData.filter((row) => {
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
          <Button id="add-user" onClick={() => abrirAddAdotante()}>
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
                onRowClick={(params) => openViewModal(params.row.id)}
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

export default Adotantes;
