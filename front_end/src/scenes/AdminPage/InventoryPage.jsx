import { useSelector } from "react-redux";
import Inventory from "./Inventory";
import NavBar from "scenes/homePage/Navbar";

const InventoryPage = () => {
    const isAdmin = useSelector((state) => state.auth.isAdmin);

    if(!isAdmin) {
        return(
            <h1>Please login as admin to view this page.</h1>
        )
    }
  
    return (
        <>
            <NavBar />
            <div style={{ textAlign: "center"}}>
            <h1  style={{ color: "#1976d2"}}>Mini Inventory</h1>
            </div>
            <hr />

            {/* Render Inventory component for each ingredient */}
            <Inventory ingredient="base" />
            <Inventory ingredient="sauce" />
            <Inventory ingredient="cheese" />
            <Inventory ingredient="veggie" />
        </>
      
    )
}

export default InventoryPage;