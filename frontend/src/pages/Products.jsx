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

  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    sku: "",
    name: "",
    price: "",
    stock_quantity: ""
  });

  const loadProducts = async () => {
    try {
      const response = await api.get("/products/");
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const createProduct = async () => {

    try {

      await api.post(
        "/products/",
        {
          sku: form.sku,
          name: form.name,
          price: Number(form.price),
          stock_quantity: Number(form.stock_quantity)
        }
      );

      setForm({
        sku: "",
        name: "",
        price: "",
        stock_quantity: ""
      });

      loadProducts();

    } catch (error) {

      alert(
        error?.response?.data?.detail ||
        "Failed to create product"
      );

    }
  };

  const updateProduct = async () => {

    try {

      await api.put(
        `/products/${editingId}`,
        {
          sku: form.sku,
          name: form.name,
          price: Number(form.price),
          stock_quantity: Number(form.stock_quantity)
        }
      );

      setEditingId(null);

      setForm({
        sku: "",
        name: "",
        price: "",
        stock_quantity: ""
      });

      loadProducts();

    } catch (error) {

      alert(
        error?.response?.data?.detail ||
        "Failed to update product"
      );

    }
  };

  const deleteProduct = async (id) => {

    if (
      !window.confirm(
        "Delete product?"
      )
    ) {
      return;
    }

    try {

      await api.delete(
        `/products/${id}`
      );

      loadProducts();

    } catch (error) {

      console.error(error);

    }
  };

  const editProduct = (product) => {

    setEditingId(product.id);

    setForm({
      sku: product.sku,
      name: product.name,
      price: product.price,
      stock_quantity:
        product.stock_quantity
    });

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
              sku: e.target.value
            })
          }
        />

        <TextField
          label="Name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value
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
              price: e.target.value
            })
          }
        />

        <TextField
          label="Stock Quantity"
          type="number"
          value={form.stock_quantity}
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
            editingId
              ? updateProduct
              : createProduct
          }
        >
          {
            editingId
              ? "Update Product"
              : "Add Product"
          }
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

              <TableCell>ID</TableCell>

              <TableCell>SKU</TableCell>

              <TableCell>Name</TableCell>

              <TableCell>Price</TableCell>

              <TableCell>Stock</TableCell>

              <TableCell>Actions</TableCell>

            </TableRow>

          </TableHead>

          <TableBody>

            {filteredProducts.map(
              (product) => (

                <TableRow
                  key={product.id}
                >

                  <TableCell>
                    {product.id}
                  </TableCell>

                  <TableCell>
                    {product.sku}
                  </TableCell>

                  <TableCell>
                    {product.name}
                  </TableCell>

                  <TableCell>
                    ₹{product.price}
                  </TableCell>

                  <TableCell>
                    {
                      product.stock_quantity
                    }
                  </TableCell>

                  <TableCell>

                    <Button
                      onClick={() =>
                        editProduct(
                          product
                        )
                      }
                    >
                      Edit
                    </Button>

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