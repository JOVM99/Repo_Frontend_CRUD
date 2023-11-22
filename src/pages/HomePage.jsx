//Página de Inicio

import { useState, useEffect } from "react";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import Swal from "sweetalert2";
import { getClientesPorNombre } from "../helpers/getClientesPorNombre";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const [clientes, setClientes] = useState([]);
  const [clientes2, setClientes2] = useState([]);
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Cargar clientes al montar el componente
    obtenerClientes();
  }, []);
  useEffect(() => {
    setClientes2(getClientesPorNombre(clientes, value));
  }, [clientes, value]);

  //Función para obtener clientes
  const obtenerClientes = async () => {
    try {
      const response = await axios.get("http://localhost:3000/clientes");
      setClientes(response.data.data);
    } catch (error) {
      console.error("Error al obtener clientes:", error);
    }
  };

  //Función para eliminar clientes
  const eliminarCliente = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/clientes/${id}`);
      obtenerClientes();
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Hubo un error al eliminar, intentelo de nuevo",
        icon: "error",
      });
      console.error("Error al eliminar cliente:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center m-5">Gestión de Clientes</h1>
      <Grid container spacing={3} marginTop={5} marginBottom={5}>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            id="free-solo-demo"
            freeSolo
            value={value}
            onChange={(event, newValue = "") => {
              setValue(newValue);
            }}
            options={clientes.map((option) => option.nombre)}
            renderInput={(params) => <TextField {...params} label="Search" />}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "50px",
              },
              width: "350px",
              padding: 1,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate("/clientes")}
          >
            <ControlPointIcon className="m-2" />
            Agregar Cliente
          </button>
        </Grid>
      </Grid>

      <h2>Listado de Clientes</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Dirección</th>
            <th scope="col">Teléfono</th>
            <th scope="col">Correo</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes2.map((cliente) => (
            <tr key={cliente.id}>
              <td scope="row">{cliente.id}</td>
              <td>{cliente.nombre}</td>
              <td>{cliente.direccion}</td>
              <td>{cliente.telefono}</td>
              <td>{cliente.correo}</td>
              <td>
                <Button>
                  <EditIcon
                    style={{ color: "yellow", fontSize: 35 }}
                    onClick={() =>
                      navigate(`/clientes/${cliente.id}`, { state: cliente })
                    }
                  />
                </Button>
                <Button>
                  <DeleteIcon
                    style={{ color: "red", fontSize: 35 }}
                    onClick={() => eliminarCliente(cliente.id)}
                  />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
