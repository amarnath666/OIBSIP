import { useState } from "react";
import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "../../components/FlexBetween";

const registerSchema = yup.object().shape({
    name: yup.string().required("required"),
    email: yup.string().required("required"),
    location: yup.string().required.apply("required"),
    password: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
    email: yup.string().required("required"),
    password: yup.string().required("required"),
});

const initialValuesRegister = {
    name: "",
    email: "",
    location: "",
    password: "",
};

const initialValuesLogin = {
    email: "",
    password: "",
};

const login = async(values, onSubmitProps) => {
    const loggedInResponse = await fetch ("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if(loggedIn) {
        dispatchEvent(
            setLogin({
                user: loggedIn.user,
                token: loggedIn.token,
            })
        );
    }
}