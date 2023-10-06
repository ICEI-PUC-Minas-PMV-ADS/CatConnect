import React, { useState } from "react";
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
      (adotante) => adotante.id === editedAdotante.id
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
      email: "adotante1@gmail.com",
      telefone: "(31) 99999-9999",
      cidade: "Belo Horizonte",
      bairro: "Santa Tereza",
      cpf: "111.111.111-11",
      cep: "11.111-111",
      rg: "12.123.123",
      rua: `Rua do adotante`,
    },
    {
      id: 2,
      nome: "Adotante legal 2",
      instagram: "@adontante2",
      email: "adotante2@gmail.com",
      telefone: "(31) 99999-9999",
      cidade: "Belo Horizonte",
      bairro: "Santa Tereza",
      cpf: "111.111.111-11",
      cep: "11.111-111",
      rg: "12.123.123",
      rua: `Rua do adotante`,
    },
    {
      id: 3,
      nome: "Adotante legal 3",
      instagram: "@adontante3",
      email: "adotante3@gmail.com",
      telefone: "(31) 99999-9999",
      cidade: "Belo Horizonte",
      bairro: "Santa Tereza",
      cpf: "111.111.111-11",
      cep: "11.111-111",
      rg: "12.123.123",
      rua: `Rua do adotante`,
    },
    {
      id: 4,
      nome: "Adotante legal 4",
      instagram: "@adontante4",
      email: "adotante4@gmail.com",
      telefone: "(31) 99999-9999",
      cidade: "Belo Horizonte",
      bairro: "Santa Tereza",
      cpf: "111.111.111-11",
      cep: "11.111-111",
      rg: "12.123.123",
      rua: `Rua do adotante`,
    },
    {
      id: 5,
      nome: "Adotante legal 5",
      instagram: "@adontante5",
      email: "adotante5@gmail.com",
      telefone: "(31) 99999-9999",
      cidade: "Belo Horizonte",
      bairro: "Santa Tereza",
      cpf: "111.111.111-11",
      cep: "11.111-111",
      rg: "12.123.123",
      rua: `Rua do adotante`,
    },
    {
      id: 6,
      nome: "Adotante legal 6",
      instagram: "@adontante6",
      email: "adotante6@gmail.com",
      telefone: "(31) 99999-9999",
      cidade: "Belo Horizonte",
      bairro: "Santa Tereza",
      cpf: "111.111.111-11",
      cep: "11.111-111",
      rg: "12.123.123",
      rua: `Rua do adotante`,
    },
    {
      id: 7,
      nome: "Adotante legal 7",
      instagram: "@adontante7",
      email: "adotante7@gmail.com",
      telefone: "(31) 99999-9999",
      cidade: "Belo Horizonte",
      bairro: "Santa Tereza",
      cpf: "111.111.111-11",
      cep: "11.111-111",
      rg: "12.123.123",
      rua: `Rua do adotante`,
    },
    {
      id: 8,
      nome: "Adotante legal 8",
      instagram: "@adontante8",
      email: "adotante8@gmail.com",
      telefone: "(31) 99999-9999",
      cidade: "Belo Horizonte",
      bairro: "Santa Tereza",
      cpf: "111.111.111-11",
      cep: "11.111-111",
      rg: "12.123.123",
      rua: `Rua do adotante`,
    },
    {
      id: 9,
      nome: "Adotante legal 9",
      instagram: "@adontante9",
      email: "adotante9@gmail.com",
      telefone: "(31) 99999-9999",
      cidade: "Belo Horizonte",
      bairro: "Santa Tereza",
      cpf: "111.111.111-11",
      cep: "11.111-111",
      rg: "12.123.123",
      rua: `Rua do adotante`,
    },
    {
      id: 10,
      nome: "Adotante legal 10",
      instagram: "@adontante10",
      email: "adotante10@gmail.com",
      telefone: "(31) 99999-9999",
      cidade: "Belo Horizonte",
      bairro: "Santa Tereza",
      cpf: "111.111.111-11",
      cep: "11.111-111",
      rg: "12.123.123",
      rua: `Rua do adotante`,
    },
    {
      id: 11,
      nome: "Adotante legal 11",
      instagram: "@adontante11",
      email: "adotante11@gmail.com",
      telefone: "(31) 99999-9999",
      cidade: "Belo Horizonte",
      bairro: "Santa Tereza",
      cpf: "111.111.111-11",
      cep: "11.111-111",
      rg: "12.123.123",
      rua: `Rua do adotante`,
    },
    {
      id: 12,
      nome: "Adotante legal 12",
      instagram: "@adontante12",
      email: "adotante12@gmail.com",
      telefone: "(31) 99999-9999",
      cidade: "Belo Horizonte",
      bairro: "Santa Tereza",
      cpf: "111.111.111-11",
      cep: "11.111-111",
      rg: "12.123.123",
      rua: `Rua do adotante`,
    },
    {
      id: 13,
      nome: "Adotante legal 13",
      instagram: "@adontante13",
      email: "adotante13@gmail.com",
      telefone: "(31) 99999-9999",
      cidade: "Belo Horizonte",
      bairro: "Santa Tereza",
      cpf: "111.111.111-11",
      cep: "11.111-111",
      rg: "12.123.123",
      rua: `Rua do adotante`,
    },
    {
      id: 14,
      nome: "Adotante legal 14",
      instagram: "@adontante14",
      email: "adotante14@gmail.com",
      telefone: "(31) 99999-9999",
      cidade: "Belo Horizonte",
      bairro: "Santa Tereza",
      cpf: "111.111.111-11",
      cep: "11.111-111",
      rg: "12.123.123",
      rua: `Rua do adotante`,
    },
    {
      id: 15,
      nome: "Adotante legal 15",
      instagram: "@adontante15",
      email: "adotante15@gmail.com",
      telefone: "(31) 99999-9999",
      cidade: "Belo Horizonte",
      bairro: "Santa Tereza",
      cpf: "111.111.111-11",
      cep: "11.111-111",
      rg: "12.123.123",
      rua: `Rua do adotante`,
    },
    {
      id: 16,
      nome: "Adotante legal 16",
      instagram: "@adontante16",
      email: "adotante16@gmail.com",
      telefone: "(31) 99999-9999",
      cidade: "Belo Horizonte",
      bairro: "Santa Tereza",
      cpf: "111.111.111-11",
      cep: "11.111-111",
      rg: "12.123.123",
      rua: `Rua do adotante`,
    },
    {
      id: 17,
      nome: "Adotante legal 17",
      instagram: "@adontante17",
      email: "adotante17@gmail.com",
      telefone: "(31) 99999-9999",
      cidade: "Belo Horizonte",
      bairro: "Santa Tereza",
      cpf: "111.111.111-11",
      cep: "11.111-111",
      rg: "12.123.123",
      rua: `Rua do adotante`,
    },
    {
      id: 18,
      nome: "Adotante legal 18",
      instagram: "@adontante18",
      email: "adotante18@gmail.com",
      telefone: "(31) 99999-9999",
      cidade: "Belo Horizonte",
      bairro: "Santa Tereza",
      cpf: "111.111.111-11",
      cep: "11.111-111",
      rg: "12.123.123",
      rua: `Rua do adotante`,
    },
    {
      id: 19,
      nome: "Adotante legal 19",
      instagram: "@adontante19",
      email: "adotante19@gmail.com",
      telefone: "(31) 99999-9999",
      cidade: "Belo Horizonte",
      bairro: "Santa Tereza",
      cpf: "111.111.111-11",
      cep: "11.111-111",
      rg: "12.123.123",
      rua: `Rua do adotante`,
    },
    {
      id: 20,
      nome: "Adotante legal 20",
      instagram: "@adontante20",
      email: "adotante20@gmail.com",
      telefone: "(31) 99999-9999",
      cidade: "Belo Horizonte",
      bairro: "Santa Tereza",
      cpf: "111.111.111-11",
      cep: "11.111-111",
      rg: "12.123.123",
      rua: `Rua do adotante`,
    },
    {
      id: 21,
      nome: "Adotante legal 21",
      instagram: "@adontante21",
      email: "adotante21@gmail.com",
      telefone: "(31) 99999-9999",
      cidade: "Belo Horizonte",
      bairro: "Santa Tereza",
      cpf: "111.111.111-11",
      cep: "11.111-111",
      rg: "12.123.123",
      rua: `Rua do adotante`,
    },
    {
      id: 22,
      nome: "Adotante legal 22",
      instagram: "@adontante22",
      email: "adotante22@gmail.com",
      telefone: "(31) 99999-9999",
      cidade: "Belo Horizonte",
      bairro: "Santa Tereza",
      cpf: "111.111.111-11",
      cep: "11.111-111",
      rg: "12.123.123",
      rua: `Rua do adotante`,
    },
    {
      id: 23,
      nome: "Adotante legal 23",
      instagram: "@adontante23",
      email: "adotante23@gmail.com",
      telefone: "(31) 99999-9999",
      cidade: "Belo Horizonte",
      bairro: "Santa Tereza",
      cpf: "111.111.111-11",
      cep: "11.111-111",
      rg: "12.123.123",
      rua: `Rua do adotante`,
    },
    {
      id: 24,
      nome: "Adotante legal 24",
      instagram: "@adontante24",
      email: "adotante24@gmail.com",
      telefone: "(31) 99999-9999",
      cidade: "Belo Horizonte",
      bairro: "Santa Tereza",
      cpf: "111.111.111-11",
      cep: "11.111-111",
      rg: "12.123.123",
      rua: `Rua do adotante`,
    },
    {
      id: 25,
      nome: "Adotante legal 25",
      instagram: "@adontante25",
      email: "adotante25@gmail.com",
      telefone: "(31) 99999-9999",
      cidade: "Belo Horizonte",
      bairro: "Santa Tereza",
      cpf: "111.111.111-11",
      cep: "11.111-111",
      rg: "12.123.123",
      rua: `Rua do adotante`,
    },
    {
      id: 26,
      nome: "Adotante legal 26",
      instagram: "@adontante26",
      email: "adotante26@gmail.com",
      telefone: "(31) 99999-9999",
      cidade: "Belo Horizonte",
      bairro: "Santa Tereza",
      cpf: "111.111.111-11",
      cep: "11.111-111",
      rg: "12.123.123",
      rua: `Rua do adotante`,
    },
    {
      id: 27,
      nome: "Adotante legal 27",
      instagram: "@adontante27",
      email: "adotante27@gmail.com",
      telefone: "(31) 99999-9999",
      cidade: "Belo Horizonte",
      bairro: "Santa Tereza",
      cpf: "111.111.111-11",
      cep: "11.111-111",
      rg: "12.123.123",
      rua: `Rua do adotante`,
    },
    {
      id: 28,
      nome: "Adotante legal 28",
      instagram: "@adontante28",
      email: "adotante28@gmail.com",
      telefone: "(31) 99999-9999",
      cidade: "Belo Horizonte",
      bairro: "Santa Tereza",
      cpf: "111.111.111-11",
      cep: "11.111-111",
      rg: "12.123.123",
      rua: `Rua do adotante`,
    },
    {
      id: 29,
      nome: "Adotante legal 29",
      instagram: "@adontante29",
      email: "adotante29@gmail.com",
      telefone: "(31) 99999-9999",
      cidade: "Belo Horizonte",
      bairro: "Santa Tereza",
      cpf: "111.111.111-11",
      cep: "11.111-111",
      rg: "12.123.123",
      rua: `Rua do adotante`,
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
