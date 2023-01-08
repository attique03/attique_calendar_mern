import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";

const AppLayout = () => {
    return <div style={{
        padding: '50px 20px 0px 280px'
    }}>
        <Sidebar />
        <Outlet />
    </div>;
};

export default AppLayout;
