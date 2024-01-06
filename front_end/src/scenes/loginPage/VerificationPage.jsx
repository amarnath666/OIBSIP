import React, { useEffect } from 'react';
import { Typography } from '@mui/material';
import axios from 'axios';

const VerificationPage = ({ match }) => {
  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/auth/confirm/${match.params.token}`);
        console.log(response.data);
      } catch (error) {
        console.error('Email verification error:', error);
      }
    };

    verifyEmail();
  }, [match.params.token]);

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Email Verification
      </Typography>
      <Typography>
        Verifying your email, please wait...
      </Typography>
    </div>
  );
};

export default VerificationPage;


// import { useNavigate } from "react-router";
// import { useDispatch, useSelector} from "react-redux";
// import { Typography, Button, Box } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import { setVerificationSuccess, setVerificationError } from "state";


// const VerificationPage = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const verificationSuccess = useSelector(
//       (state) => state.verification?.success
//     );
//     const verificationError = useSelector((state) => state.verification?.error);
//     const [loading, setLoading] = useState(true);
  
//     useEffect(() => {
//       const simulateVerification = async () => {
//         try {
//           await new Promise((resolve) => setTimeout(resolve, 1000));
//           dispatch(setVerificationSuccess(true));
//         } catch (error) {
//           dispatch(setVerificationError(false));
//           console.error("Error during verification:", error);
//         } finally {
//           setLoading(false);
//         }
//       };
//       simulateVerification();
//     }, [dispatch]);
  
//     return (
//       <Box>
//         <h2>Verification Page</h2>
//         {loading && <p>Loading...</p>}
//         {!loading && verificationSuccess && (
//           <Box>
//             <Typography>
//               Verification Successful! You can now log in.
//             </Typography>
//             <Button onClick={() => navigate("/login")}>Go to Login</Button>
//           </Box>
//         )}
//         {!loading && verificationError && (
//           <Typography>Verification failed. Please try again.</Typography>
//         )}
//       </Box>
//     );
//   };

//   export default VerificationPage;