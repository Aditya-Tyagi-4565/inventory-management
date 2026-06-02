import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Customers from "./pages/Customers";
import Orders from "./pages/Orders";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/"
        element={<Layout />}
      >
        <Route
          index
          element={<Dashboard />}
        />

        <Route
          path="products"
          element={<Products />}
        />

        <Route
          path="customers"
          element={<Customers />}
        />

        <Route
          path="orders"
          element={<Orders />}
        />

      </Route>

    </Routes>
  );
}

export default App;