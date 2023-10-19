import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useModal } from "../../contexts/ModalContext";
import AddGato from "./AddGato/AdicionarGato";
import EditGato from "./EditGato/EditarGato";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TextField from "@mui/material/TextField";
import "./PgGatinhos.css";

function Gatinhos() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const { openModal, closeModal } = useModal();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterText, setFilterText] = useState("");
  const [gatos, setGatinhos] = useState([]);

  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
      } else {
        const { data } = await axios.post(
          "http://localhost:4000/gatos",
          {},
          {
            withCredentials: true,
          }
        );
      }
    };
    verifyUser();

    getGatinhos();
  }, [cookies, navigate, removeCookie]);

  const logOut = () => {
    removeCookie("jwt");
    navigate("/login");
  };

  const abrirAddGato = () => {
    openModal("Adicionar gato", <AddGato closeModal={closeModal} />);
  };

  const openEditModal = (rowId) => {
    const editedRow = gatos.find((row) => row.id === rowId);
    openModal("Editar gato", EditGato({ closeModal }));
  };

  const getGatinhos = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/gatos", {
        withCredentials: true,
      });
      if (!data) {
        console.error("Failed to fetch gatinhos data");
      } else {
        setGatinhos(data);
      }
    } catch (error) {
      console.error("Error fetching gatinhos data:", error);
    }
  };

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
          style={{ backgroundColor: "#FFFFFF", borderRadius: "50%" }}
        >
          <MoreVertIcon style={{ color: "#292D32" }} />
        </IconButton>
      ),
    },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  const filteredRows = gatos.filter((row) => {
    return Object.values(row).some((value) =>
      String(value).toLowerCase().includes(filterText.toLowerCase())
    );
  });

  return (
    <>
      <h1>Gatinhos</h1>
      <Button id="ModalGatos" onClick={abrirAddGato}>
        <span style={{ fontSize: "24px", color: "white" }}>+</span>
      </Button>

      <div id="tableElements" style={{ padding: "20px" }}>
        <div style={{ margin: "10px" }}>
          <TextField
            label="Quick Filter"
            variant="outlined"
            size="small"
            fullWidth
            value={filterText}
            onChange={handleFilterChange}
          />
        </div>
        <div style={{ height: "calc(100vh - 250px)", width: "100%" }}>
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
    </>
  );
}

export default Gatinhos;
