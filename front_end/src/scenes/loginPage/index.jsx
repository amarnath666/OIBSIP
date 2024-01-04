import { Box, Typography, useTheme, useMediaQuery} from "@mui/material";
import Form from "./Form";

const LoginPage = () => {
    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    
    return (
        <Box>
            <Box
                width="100%"
                backgroundColor="#FFFFFF"
                textAlign="center"
            >
                <Typography fontWeight="bold" fontSize="32px" color="#14D974">
                    Pizzify
                </Typography>
            </Box>

            <Box
                width={isNonMobileScreens ? "50%" : "93%"}
                p="2rem"
                m="2rem auto"
                borderRadius="1.5rem"
                backgroundColor="#FFFFFF"
            >
                <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem"}}>
                    Step into the world of Pizzify – your pizza paradise awaits!
                </Typography>
                <Form />
            </Box>
        </Box>
    );
};

export default LoginPage;
