// import { setSelectedOptions } from "scenes/state/authSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import OptionCategory from "./OptionCategory";

// const PizzaBuilder = () => {
//     const dispatch = useDispatch();
//     const selectedOptions = useSelector((state) => state.auth.selectedOptions);

//     const handleOptionSelect = (variety, category) => {
//         dispatch(setSelectedOptions({ category, variety }));
//     };

//     useEffect(() => {
//         const fetchData = async () => {    
//             try {
//                 const response = await fetch("http://localhost:3001/custom-pizza");

//                 if (!response.ok) {
//                     throw new Error("Failed to fetch pizza options");
//                 }

//                 const data = await response.json();
//                 dispatch(setSelectedOptions(data));          
//             } catch (error) {
//                 console.error("Error fetching pizza options:", error.message);
//             }
//         };

//         fetchData();
//     }, [dispatch]);

//     return (
//         <div>
//             {/* ... other code */}
//             <OptionCategory 
//                 category="Base"
//                 options={selectedOptions.baseOptions.map(option => ({ ...option, category: "base" }))}
//                 onSelect={(variety) => handleOptionSelect(variety, "base")}
//             />
//             <OptionCategory
//                 category="Sauce"
//                 options={selectedOptions.sauceOptions.map(option => ({ ...option, category: "sauce" }))}
//                 onSelect={(variety) => handleOptionSelect(variety, "sauce")}
//             />
//             <OptionCategory
//                 category="Cheese"
//                 options={selectedOptions.cheeseOptions.map(option => ({ ...option, category: "cheese" }))}
//                 onSelect={(variety) => handleOptionSelect(variety, "cheese")}
//             />
//             <OptionCategory
//                 category="Veggies"
//                 options={selectedOptions.veggieOptions.map(option => ({ ...option, category: "veggie" }))}
//                 onSelect={(variety) => handleOptionSelect(variety, "veggie")}
//             />
//         </div>
//     );
// };

// export default PizzaBuilder;
