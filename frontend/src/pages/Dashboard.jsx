import {
  Card,
  CardContent,
  Grid,
  Typography
} from "@mui/material";

import {
  useEffect,
  useState
} from "react";

import api from "../services/api";

export default function Dashboard() {

  const [
    products,
    setProducts
  ] = useState(0);

  const [
    customers,
    setCustomers
  ] = useState(0);

  useEffect(() => {

    loadStats();

  }, []);

  const loadStats =
    async () => {

      const p =
        await api.get(
          "/products/"
        );

      const c =
        await api.get(
          "/customers/"
        );

      setProducts(
        p.data.length
      );

      setCustomers(
        c.data.length
      );
    };

  return (
    <>
      <Typography
        variant="h4"
        gutterBottom
      >
        Dashboard
      </Typography>

      <Grid
        container
        spacing={3}
      >

        <Grid size={4}>
          <Card>
            <CardContent>

              <Typography>
                Products
              </Typography>

              <Typography
                variant="h4"
              >
                {products}
              </Typography>

            </CardContent>
          </Card>
        </Grid>

        <Grid size={4}>
          <Card>
            <CardContent>

              <Typography>
                Customers
              </Typography>

              <Typography
                variant="h4"
              >
                {customers}
              </Typography>

            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </>
  );
}