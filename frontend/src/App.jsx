// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/LoginPage/login.jsx";
import Register from "./pages/RegisterPage/register.jsx";
import UserListPage from "./pages/UserManagerPage/userManager.jsx";
import Sidebar from "./components/Sidebar/Sidebar";
import UserList from "./components/UserManager/UserTable/UserList";
import UserProfile from "./components/UserManager/UserDetail/UserDetail";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Sidebar />} />
        <Route path="/users" element={<UserListPage />}>
          <Route path="" element={<UserList />} />
          <Route path=":id" element={<UserProfile />} />
        </Route>
        {/* các route khác */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
