import React, { useEffect, useState } from 'react';
import { DataGrid, ptBR } from '@mui/x-data-grid';
import "../Dashboard/Dashboard.css";
import axios from 'axios';
import { toast } from "react-toastify";


const TableRegistrosGatos = () => {
    const [gatos, setGatos] = useState([]);
    const [filterText, setFilterText] = useState("");

    useEffect(() => {
        getGatos();
    }, []);

    const getGatos = async () => {
        try {
            const { data } = await axios.get(
                "http://localhost:4000/gatos",
                {
                    withCredentials: true,
                }
            );
            if (!data) {
                toast.error(
                    data.error ? data.error : "Houve um erro ao coletar os gatos",
                    {
                        theme: "dark",
                    }
                );
            } else {
                setGatos(data);
            }
        } catch {
            toast.error("Houve um erro ao coletar os gatos", {
                theme: "dark",
            });
        }

    };

    const filteredRows = gatos.filter((row) => {
        return Object.values(row).some((value) =>
            String(value).toLowerCase().includes(filterText.toLowerCase())
        );
    });

    const getRowId = (row) => row._id;

    const columns = [
        { field: 'nome', headerName: 'Gato', flex: 1 },
        { field: 'local', headerName: 'Local', flex: 1 },
        { field: 'saude', headerName: 'Saúde', flex: 1},
    ];


    return (
        <div className="boxGrid">
            <div className="grid-gatos">
                <DataGrid
                    rows={filteredRows}
                    columns={columns}
                    getRowId={getRowId}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 3,
                            },
                        },
                    }}
                    pageSizeOptions={[3]}
                    disableRowSelectionOnClick
                    headerClassName="custom-header"
                    localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
                />
            </div>
        </div>
    );

};
export default TableRegistrosGatos;