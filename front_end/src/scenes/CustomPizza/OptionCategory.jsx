// import React from "react";
// import { FormControl, InputLabel, Select, MenuItem, Grid } from "@mui/material";
// import styled from "@emotion/styled";

// const StyledFormControl = styled(FormControl)`
//   margin: ${({ theme }) => theme.spacing(1)};
//   min-width: 120px;
//   width: 100%;
// `;

// const OptionCategory = ({ category, options, onSelect }) => {
//   const handleChange = (event) => {
//     onSelect(event.target.value, category);
//   };

//   return (
//     <Grid item xs={12} sm={6} md={4} lg={3}>
//       <StyledFormControl>
//         <InputLabel>{category}</InputLabel>
//         <Select value="" onChange={handleChange}>
//           <MenuItem value="" disabled>
//             Select {category}
//           </MenuItem>
//           {options.map((option) => (
//             <MenuItem key={option.id} value={option.name}>
//               {option.name}
//             </MenuItem>
//           ))}
//         </Select>
//       </StyledFormControl>
//     </Grid>
//   );
// };

// export default OptionCategory;
