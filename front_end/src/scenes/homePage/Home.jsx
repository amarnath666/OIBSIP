import React from "react";
import NavBar from "scenes/homePage/Navbar";
import PizzaList from "scenes/PizzaComponent/PizzaList";
import PizzaOptionsPage from "./PizzaOptionsPage";

const Home = () => {
    return (
        <div>
            <NavBar />
            <PizzaList />
            <PizzaOptionsPage />
        </div>
  );
};

export default Home;
