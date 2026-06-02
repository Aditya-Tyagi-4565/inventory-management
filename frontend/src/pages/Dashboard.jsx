import { useEffect, useState } from "react";
import api from "../services/api";

export default function Dashboard() {

  const [stats, setStats] = useState(null);

  useEffect(() => {

    const loadStats = async () => {

      try {

        const response =
          await api.get("/dashboard/stats");

        console.log(response.data);

        setStats(response.data);

      } catch (error) {

        console.error(error);

      }
    };

    loadStats();

  }, []);

  if (!stats) {
    return <h2>Loading...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>

      <h1>Dashboard</h1>

      <h2>
        Products:
        {" "}
        {stats.total_products}
      </h2>

      <h2>
        Customers:
        {" "}
        {stats.total_customers}
      </h2>

      <h2>
        Orders:
        {" "}
        {stats.total_orders}
      </h2>

      <h2>
        Inventory Value:
        ₹{stats.inventory_value}
      </h2>

      <h2>
        Low Stock:
        {stats.low_stock}
      </h2>

    </div>
  );
}