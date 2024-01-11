import React from "react";
import NavBar from "scenes/homePage/Navbar";
import PizzaList from "scenes/PizzaComponent/PizzaList";
import PizzaBuilder from "scenes/CustomPizza/PizzaBuilder";

const Home = () => {
    return (
        <div>
            <NavBar />
            <PizzaList />
            <PizzaBuilder />
        </div>
  );
};

export default Home;
