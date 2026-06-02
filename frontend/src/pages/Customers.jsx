import { useEffect, useState } from "react";
import api from "../services/api";

import {
  Typography,
  TextField,
  Button,
  Stack,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper
} from "@mui/material";

export default function Customers() {

  const [customers, setCustomers] =
    useState([]);

  const [form, setForm] =
    useState({
      name: "",
      email: "",
      phone: ""
    });

  const loadCustomers = async () => {

    const response =
      await api.get("/customers/");

    setCustomers(
      response.data
    );
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const createCustomer =
    async () => {

      try {

        await api.post(
          "/customers/",
          form
        );

        setForm({
          name: "",
          email: "",
          phone: ""
        });

        loadCustomers();

      } catch (error) {

        alert(
          error?.response?.data?.detail
        );

      }
    };

  const deleteCustomer =
    async (id) => {

      await api.delete(
        `/customers/${id}`
      );

      loadCustomers();
    };

  return (
    <>
      <Typography
        variant="h4"
        gutterBottom
      >
        Customers
      </Typography>

      <Stack
        spacing={2}
        sx={{
          maxWidth: 400,
          mb: 4
        }}
      >

        <TextField
          label="Name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name:
                e.target.value
            })
          }
        />

        <TextField
          label="Email"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email:
                e.target.value
            })
          }
        />

        <TextField
          label="Phone"
          value={form.phone}
          onChange={(e) =>
            setForm({
              ...form,
              phone:
                e.target.value
            })
          }
        />

        <Button
          variant="contained"
          onClick={
            createCustomer
          }
        >
          Add Customer
        </Button>

      </Stack>

      <TableContainer
        component={Paper}
      >

        <Table>

          <TableHead>

            <TableRow>

              <TableCell>
                Name
              </TableCell>

              <TableCell>
                Email
              </TableCell>

              <TableCell>
                Phone
              </TableCell>

              <TableCell>
                Action
              </TableCell>

            </TableRow>

          </TableHead>

          <TableBody>

            {customers.map(
              (customer) => (
                <TableRow
                  key={
                    customer.id
                  }
                >
                  <TableCell>
                    {
                      customer.name
                    }
                  </TableCell>

                  <TableCell>
                    {
                      customer.email
                    }
                  </TableCell>

                  <TableCell>
                    {
                      customer.phone
                    }
                  </TableCell>

                  <TableCell>

                    <Button
                      color="error"
                      onClick={() =>
                        deleteCustomer(
                          customer.id
                        )
                      }
                    >
                      Delete
                    </Button>

                  </TableCell>

                </TableRow>
              )
            )}

          </TableBody>

        </Table>

      </TableContainer>

    </>
  );
}