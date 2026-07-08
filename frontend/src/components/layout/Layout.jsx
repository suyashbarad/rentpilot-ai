import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "./Layout.css";

export default function Layout({ children }) {
  return (
    <div className="layout">

      <Sidebar />

      <div className="main">

        <Navbar />

        <div className="content">
          {children}
        </div>

      </div>

    </div>
  );
}