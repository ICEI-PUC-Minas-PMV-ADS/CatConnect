import React, {useState} from "react";
import Button from "@mui/material/Button";
import "./User.css";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Edit from "@mui/icons-material/Edit";
import { useModal } from "../../contexts/ModalContext";
import AddGato from '../Gatinhos/AddGato/AdicionarGato';
import EditGato from '../Gatinhos/EditGato/EditarGato';

const Users = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterText, setFilterText] = useState("");
  const { openModal, closeModal } = useModal();

  // Open Modal Function
  const abrirAddGato = () => {
    openModal("Adicionar gato", AddGato({ closeModal }));
  };

  const openEditModal = (rowId) => {
    const editedRow = mockData.find((row) => row.id === rowId);
    openModal("Editar gato", EditGato({ closeModal }));
  };

  // Columns definition, including the "editar" column with a button
  const columns = [
    { field: "nome", headerName: "Nome", width: 150 },
    { field: "local", headerName: "Local", width: 150 },
    { field: "saude", headerName: "Saúde", width: 150 },
    { field: "status", headerName: "Status", width: 100 },
    {
      field: "editar",
      headerName: "Editar",
      width: 100,
      renderCell: (params) => (
        <IconButton
          color="primary"
          onClick={() => openEditModal(params.row.id)}
          style={{ borderRadius: "50%" }}
        >
          <Edit style={{ color: "#292D32" }} />
        </IconButton>
      ),
    },    
  ];

  const mockData = [
    { id: 1, nome: "Cupcake", local: "Coreto", saude: 3.7, status: 67 },
    { id: 2, nome: "Donut", local: "Palácio das Artes", saude: 25.0, status: 51},
    { id: 3, nome: "Eclair", local: "Mata", saude: 16.0, status: 24 },
    { id: 4, nome: "Frozen yoghurt", local: "Coreto", saude: 6.0, status: 24 },
    { id: 5, nome: "Gingerbread", local: "Palácio das Artes", saude: 16.0, status: 49 },
    { id: 6, nome: "Gingerbread", local: "Palácio das Artes", saude: 16.0, status: 49 },
    { id: 7, nome: "Gingerbread", local: "Palácio das Artes", saude: 16.0, status: 49 },
    { id: 8, nome: "Gingerbread", local: "Palácio das Artes", saude: 16.0, status: 49 },
    { id: 9, nome: "Gingerbread", local: "Palácio das Artes", saude: 16.0, status: 49 },
    { id: 10, nome: "Gingerbread", local: "Palácio das Artes", saude: 16.0, status: 49 },
    { id: 11, nome: "Gingerbread", local: "Palácio das Artes", saude: 16.0, status: 49 },
    { id: 12, nome: "Gingerbread", local: "Palácio das Artes", saude: 16.0, status: 49 },
    { id: 13, nome: "Gingerbread", local: "Palácio das Artes", saude: 16.0, status: 49 },
    { id: 14, nome: "Gingerbread", local: "Palácio das Artes", saude: 16.0, status: 49 },
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
          <h1 className="titulo">Visualizar usuários</h1>
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

export default Users;
