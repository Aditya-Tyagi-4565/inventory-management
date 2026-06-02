import { useEffect, useState } from "react";

import api from "../services/api";

import {
  Typography,
  Button,
  TextField,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack
} from "@mui/material";

export default function Products() {

  const [products, setProducts] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [form, setForm] =
    useState({
      sku: "",
      name: "",
      price: "",
      stock_quantity: ""
    });

  const loadProducts = async () => {

    const response =
      await api.get("/products/");

    setProducts(
      response.data
    );
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const createProduct = async () => {

    await api.post(
      "/products/",
      {
        sku: form.sku,
        name: form.name,
        price: Number(form.price),
        stock_quantity:
          Number(form.stock_quantity)
      }
    );

    setForm({
      sku: "",
      name: "",
      price: "",
      stock_quantity: ""
    });

    loadProducts();
  };

  const deleteProduct =
    async (id) => {

      if (
        !window.confirm(
          "Delete product?"
        )
      )
        return;

      await api.delete(
        `/products/${id}`
      );

      loadProducts();
    };

  const filteredProducts =
    products.filter((p) =>
      p.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (
    <>
      <Typography
        variant="h4"
        gutterBottom
      >
        Products
      </Typography>

      <Stack
        spacing={2}
        sx={{
          maxWidth: 400,
          mb: 4
        }}
      >
        <TextField
          label="SKU"
          value={form.sku}
          onChange={(e) =>
            setForm({
              ...form,
              sku:
                e.target.value
            })
          }
        />

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
          label="Price"
          type="number"
          value={form.price}
          onChange={(e) =>
            setForm({
              ...form,
              price:
                e.target.value
            })
          }
        />

        <TextField
          label="Stock"
          type="number"
          value={
            form.stock_quantity
          }
          onChange={(e) =>
            setForm({
              ...form,
              stock_quantity:
                e.target.value
            })
          }
        />

        <Button
          variant="contained"
          onClick={
            createProduct
          }
        >
          Add Product
        </Button>
      </Stack>

      <TextField
        fullWidth
        label="Search Product"
        sx={{ mb: 3 }}
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
      />

      <TableContainer
        component={Paper}
      >
        <Table>

          <TableHead>
            <TableRow>
              <TableCell>
                SKU
              </TableCell>

              <TableCell>
                Name
              </TableCell>

              <TableCell>
                Price
              </TableCell>

              <TableCell>
                Stock
              </TableCell>

              <TableCell>
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>

            {filteredProducts.map(
              (
                product
              ) => (
                <TableRow
                  key={
                    product.id
                  }
                >
                  <TableCell>
                    {
                      product.sku
                    }
                  </TableCell>

                  <TableCell>
                    {
                      product.name
                    }
                  </TableCell>

                  <TableCell>
                    ₹
                    {
                      product.price
                    }
                  </TableCell>

                  <TableCell>
                    {
                      product.stock_quantity
                    }
                  </TableCell>

                  <TableCell>

                    <Button
                      color="error"
                      onClick={() =>
                        deleteProduct(
                          product.id
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