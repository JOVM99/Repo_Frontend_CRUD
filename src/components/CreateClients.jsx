//Componente para crear un cliente

import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { useForm } from "../hooks/useForm";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Validaciones a realizar en el useForm
const formValidations = {
  name: [(value) => value.length >= 1, "El nombre es obligatorio"],
  address: [(value) => value.length >= 1, "La dirección es obligatoria"],
  email: [(value) => value.length >= 1, "El email es obligatorio"],
  phone: [
    (value) => value.length >= 1 && value.length < 9,
    "El teléfono es obligatorio y debe tener 8 dígitos",
  ],
};

export const CreateClients = () => {

  // Declaración de las variables para la validación en el use Form
  const {
    name,
    address,
    phone,
    email,
    formState,
    isFormValid,
    onInputChange,
    onResetForm,
  } = useForm(
    {
      name: "",
      address: "",
      phone: "",
      email: "",
    },
    formValidations
  );
  const navigate = useNavigate();

  //Función cuando le se da cancelar
  const noRegister = () => {
    onResetForm();
    navigate("/");
  };

// Función pra registrar un cliente
  const register = async () => {
    if (isFormValid) {
      try {
        const newClient = {
          name,
          address,
          phone,
          email,
        };
        await axios.post("http://localhost:3000/clientes", newClient);
        Swal.fire(
          "¡Bien Hecho!",
          "Usuario registrado correctamente",
          "success"
        );
        navigate("/");
      } catch (error) {
        Swal.fire(
          "¡Error!",
          "Hubo un error al realizar la acción, intentelo de nuevo",
          "error"
        );
        console.log(error);
      }
    } else {
      Swal.fire(
        "¡Error!",
        "Todos los campos deben ser rellenados y el teléfono solo debe tener 8 dígitos",
        "error"
      );
    }
  };

  return (
    <>
      <Typography variant="h3" align="center" sx={{ mb: 1, mt: 5 }}>
        Registrar Cliente
      </Typography>
      <Box>
        <Container maxWidth="lg">
          <Grid container marginTop={10}>
            <Grid item xs={12} sm={6}>
              <Stack direction="row" spacing={1} padding={4}>
                <Typography
                  variant="h6"
                  alignItems="center"
                  sx={{ mb: 1, padding: 1, mr: 2 }}
                >
                  Nombre:
                </Typography>
                <TextField
                  fullWidth
                  label="Nombre"
                  name="name"
                  value={name}
                  onChange={onInputChange}
                />
              </Stack>
              <Stack direction="row" spacing={1} padding={4}>
                <Typography variant="h6" alignItems="center" sx={{ mb: 1 }}>
                  Dirección:
                </Typography>
                <TextareaAutosize
                  aria-label="minimum height"
                  minRows={5}
                  name="address"
                  value={address}
                  onChange={onInputChange}
                  style={{ width: 400, fontFamily: "Arial", fontSize: "1rem" }}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack direction="row" spacing={1} padding={4}>
                <Typography
                  variant="h6"
                  alignItems="center"
                  sx={{ mb: 1, padding: 1, mr: 2 }}
                >
                  Teléfono:
                </Typography>
                <TextField
                  fullWidth
                  label="Teléfono"
                  type="number"
                  name="phone"
                  inputProps={{ maxLength: 9 }}
                  value={phone}
                  onChange={onInputChange}
                />
              </Stack>
              <Stack direction="row" spacing={1} padding={4}>
                <Typography variant="h6" alignItems="center" sx={{ mb: 1 }}>
                  Email:
                </Typography>
                <TextField
                  fullWidth
                  label="Correo"
                  name="email"
                  value={email}
                  onChange={onInputChange}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack direction="row" spacing={12} padding={2}>
                <Button
                  variant="contained"
                  sx={{ width: 150, height: 50 }}
                  color="secondary"
                  onClick={register}
                >
                  Registrar
                </Button>
                <Button
                  variant="contained"
                  color="info"
                  sx={{ width: 150, height: 50 }}
                  onClick={noRegister}
                >
                  Cancelar
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
