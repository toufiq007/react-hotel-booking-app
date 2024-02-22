import "./App.css";
import Layout from "./layout/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <p>Home page</p>
              </Layout>
            }
          />

          <Route
            path="/sign-in"
            element={
              <Layout>
                <p>sign in</p>
              </Layout>
            }
          />
          <Route
            path="/"
            element={
              <Layout>
                <p>Home page</p>
              </Layout>
            }
          />

          <Route
            path="/register"
            element={
              <Layout>
                <Register />
              </Layout>
            }
          />
          <Route path="*" element={`page not found`} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
