import React from "react";
import NavBar from "scenes/homePage/Navbar";
import PizzaList from "scenes/PizzaComponent/PizzaList";
const Home = () => {
    return (
        <div>
            <NavBar />
            <PizzaList />
        </div>
  );
};

export default Home;
