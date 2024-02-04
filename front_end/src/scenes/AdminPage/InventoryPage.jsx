import Inventory from "./Inventory";
import NavBar from "scenes/homePage/Navbar";

const InventoryPage = () => {
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
            <Inventory ingredient="meat" />
        </>
      
    )
}

export default InventoryPage;