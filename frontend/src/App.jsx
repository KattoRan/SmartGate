import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/LoginPage/login.jsx";
import Register from "./pages/RegisterPage/register.jsx";
import UserListPage from "./pages/UserManagerPage/userManager.jsx";
import UserList from "./components/UserManager/UserTable/UserList";
import UserProfile from "./components/UserManager/UserDetail/UserDetail";
import RequireAuth from "./components/Auth/RequireAuth.jsx";
import RequireRole from "./components/Auth/RequireRole.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route
          path="/home"
          element={
            <RequireAuth>
              <UserListPage />
            </RequireAuth>
          }
        >
          <Route path="" element={<UserList />} />
          <Route path=":id" element={<UserProfile />} />
        </Route>

        <Route
          path="/admin/home"
          element={
            <RequireAuth>
              <RequireRole role="admin">
                <UserListPage />
              </RequireRole>
            </RequireAuth>
          }
        >
          <Route path="" element={<UserList />} />
          <Route path=":id" element={<UserProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
