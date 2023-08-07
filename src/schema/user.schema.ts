import { object, ref, string } from "yup";

export const createUserSchema = object({
    body: object({
        name: string().required("Name is required"),
        password: string().required("Password is required")
        .min(6, "Password should be minimum 6 characters")
        .matches(/^[a-zA-Z0-9_.-]*$/, "Password can only contain Latin characters"),
        passwordConfirmation: string().oneOf(
            [ref("password")],
            "password must match"
        ),
        email: string().email('Must be a valid email').required('Email is required')
    })
})