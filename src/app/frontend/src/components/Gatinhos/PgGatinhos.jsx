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
    getGatinhos();
  }, []);

  const getGatinhos = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/gatos", {
        withCredentials: true,
      });
      if (!data) {
        toast.error(
          data.error ? data.error : "Houve um erro ao coletar os gatinhos!",
          {
            theme: "dark",
          }
        );
      } else {
        setGatinhos(data);
      }
    } catch {
      toast.error("Houve um erro ao adicionar um novo gato", {
        theme: "dark",
      });
    }
  };

  const handleAddGatinho = async (newGato) => {
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
            : "Houve um erro ao adicionar um novo gatinho",
          {
            theme: "dark",
          }
        );
        closeModal();
      } else {
        toast(`Gatinho adicionado com sucesso!`, {
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

  const handleEditGatinho = async (editedGato) => {
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
          data.error ? data.error : "Houve um erro ao editar um gatinho",
          {
            theme: "dark",
          }
        );
        closeModal();
      } else {
        toast(`Gatinho editado com sucesso!`, {
          theme: "dark",
        });
        getGatinhos();
        closeModal();
      }
    } catch {
      toast.error("Houve um erro ao editar um gatinho", {
        theme: "dark",
      });
      closeModal();
    }
  };

  const handleViewGatinho = () => {
    closeModal();
  };

  const abrirAddGato = () => {
    openModal("Adicionar gato", <AddGato handleSubmitFunction={handleAddGatinho} edit={true} />);
  };

  const openEditModal = (rowId, e) => {
    e.stopPropagation();
    let editedRow = gatos.find((row) => row._id === rowId);
    openModal(
      "Editar gatinho",
      <EditGato
        handleSubmitFunction={handleEditGatinho}
        gato={editedRow}
        edit={true}
      />
    );
  };

  const openViewModal = (rowId) => {
    let editedRow = gatos.find((row) => row._id === rowId);
    console.log("editedRow", editedRow);
    openModal(
      "Visualizar gatinho",
      <EditGato
        handleSubmitFunction={handleViewGatinho}
        gato={editedRow}
      />
    );
  };

  const columns = [
    { field: "nome", headerName: "Nome", width: 150 },
    { field: "local", headerName: "Local", width: 150 },
    { field: "saude", headerName: "Saúde", width: 150 },
    { field: "status", headerName: "Status", width: 100 },
    {
      field: "editar",
      headerName: "Editar",
      width: 80,
      renderCell: (params) => (
        <IconButton
          color="primary"
          onClick={(event) => openEditModal(params.row._id, event)}
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
      <Button id="ModalGatos" onClick={() => abrirAddGato()}> 
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
            onRowClick={(params) => openViewModal(params.row._id)}
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
