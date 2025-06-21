import { Route, Routes } from "react-router-dom";
import Layout from "./components/main/Layout";
import Settings from "./pages/Settings/Settings";
import Login from "./pages/Auth/Login";
import Companylist from "./pages/Settings/Companies/Companylist";
import BlockList from "./pages/Settings/Blocks/Blocklist";
import ObjectList from "./pages/Settings/Objects/Objectlist";
import RoleList from "./pages/Settings/Roles/RoleList";
import UserList from "./pages/Settings/Users/UserList";

const App = () => {
    return (
        <Routes>
            {localStorage.getItem("token") ? (
                <Route path="/" element={<Layout />}>
                    <Route path="settings" element={<Settings />} />
                    <Route path="companies" element={<Companylist />} />
                    <Route path="objects" element={<ObjectList />} />
                    <Route path="blocks" element={<BlockList />} />
                    <Route path="roles" element={<RoleList />} />
                    <Route path="users" element={<UserList />} />
                </Route>
            ) : (
                <Route path="/" element={<Login />} />
            )}
        </Routes>
    );
};

export default App;
