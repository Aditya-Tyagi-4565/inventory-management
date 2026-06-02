import { useEffect, useState } from "react";

import api from "../services/api";

import {
  Typography,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  TextField,
  Stack,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper
} from "@mui/material";

export default function Orders() {

  const [customers, setCustomers] =
    useState([]);

  const [products, setProducts] =
    useState([]);

  const [orders, setOrders] =
    useState([]);

  const [customerId, setCustomerId] =
    useState("");

  const [productId, setProductId] =
    useState("");

  const [quantity, setQuantity] =
    useState("");

  const loadData = async () => {

    const customersRes =
      await api.get("/customers/");

    const productsRes =
      await api.get("/products/");

    const ordersRes =
      await api.get("/orders/");

    setCustomers(
      customersRes.data
    );

    setProducts(
      productsRes.data
    );

    setOrders(
      ordersRes.data
    );
  };

  useEffect(() => {
    loadData();
  }, []);

  const createOrder =
    async () => {

      try {

        await api.post(
          "/orders/",
          {
            customer_id:
              Number(customerId),

            items: [
              {
                product_id:
                  Number(productId),

                quantity:
                  Number(quantity)
              }
            ]
          }
        );

        alert(
          "Order Created"
        );

        setCustomerId("");
        setProductId("");
        setQuantity("");

        loadData();

      } catch (error) {

        alert(
          error?.response?.data?.detail ||
          "Order Failed"
        );

      }
    };

  return (
    <>
      <Typography
        variant="h4"
        gutterBottom
      >
        Orders
      </Typography>

      <Stack
        spacing={2}
        sx={{
          maxWidth: 400,
          mb: 4
        }}
      >

        <FormControl>

          <InputLabel>
            Customer
          </InputLabel>

          <Select
            value={customerId}
            label="Customer"
            onChange={(e) =>
              setCustomerId(
                e.target.value
              )
            }
          >

            {
              customers.map(
                (customer) => (

                  <MenuItem
                    key={
                      customer.id
                    }
                    value={
                      customer.id
                    }
                  >
                    {
                      customer.name
                    }
                  </MenuItem>

                )
              )
            }

          </Select>

        </FormControl>

        <FormControl>

          <InputLabel>
            Product
          </InputLabel>

          <Select
            value={productId}
            label="Product"
            onChange={(e) =>
              setProductId(
                e.target.value
              )
            }
          >

            {
              products.map(
                (product) => (

                  <MenuItem
                    key={
                      product.id
                    }
                    value={
                      product.id
                    }
                  >
                    {
                      product.name
                    }
                  </MenuItem>

                )
              )
            }

          </Select>

        </FormControl>

        <TextField
          type="number"
          label="Quantity"
          value={quantity}
          onChange={(e) =>
            setQuantity(
              e.target.value
            )
          }
        />

        <Button
          variant="contained"
          onClick={
            createOrder
          }
        >
          Create Order
        </Button>

      </Stack>

      <TableContainer
        component={Paper}
      >

        <Table>

          <TableHead>

            <TableRow>

              <TableCell>
                Order ID
              </TableCell>

              <TableCell>
                Customer
              </TableCell>

              <TableCell>
                Total
              </TableCell>

            </TableRow>

          </TableHead>

          <TableBody>

            {
              orders.map(
                (order) => (

                  <TableRow
                    key={
                      order.id
                    }
                  >

                    <TableCell>
                      {
                        order.id
                      }
                    </TableCell>

                    <TableCell>
                      {
                        order.customer_name
                      }
                    </TableCell>

                    <TableCell>
                      ₹
                      {
                        order.total_amount
                      }
                    </TableCell>

                  </TableRow>

                )
              )
            }

          </TableBody>

        </Table>

      </TableContainer>
    </>
  );
}