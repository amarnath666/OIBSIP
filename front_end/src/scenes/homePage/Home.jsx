import React from "react";
import NavBar from "scenes/homePage/Navbar";
import PizzaList from "scenes/PizzaComponent/PizzaList";
import PizzaOptions from "scenes/CustomPizza/PizzaOptions";

const Home = () => {
    return (
        <div>
            <NavBar />
            <PizzaList />
            <PizzaOptions />
        </div>
  );
};

export default Home;
