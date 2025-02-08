import { useFormik } from "formik";
import { Button, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { SignUpAuthApi } from "../../Services/Auth";
import { ShowSwalToast } from "../../Components/Swal";
import * as Yup from "yup";

// Validation Schema using Yup
const validationSchema = Yup.object({
    firstName: Yup.string()
        .matches(/^[A-Za-z]+$/, "First name must only contain alphabets") // Regex for alphabets
        .max(50, "First name must be less than or equal to 50 characters")
        .required("First name is required"),

    lastName: Yup.string()
        .matches(/^[A-Za-z]+$/, "Last name must only contain alphabets") // Regex for alphabets
        .max(50, "Last name must be less than or equal to 50 characters")
        .required("Last name is required"),

    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),

    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .max(16, "Password cannot be more than 16 characters")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/,
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        )
        .required("Password is required"),
});

const SignUpForm = ({ role }) => {
    // Formik for Customer and Admin
    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            role: role, // Role will be set based on the active tab
        },
        validationSchema: validationSchema, // Add validation schema here
        onSubmit: async (values, { resetForm }) => {
            const { success, message } = await SignUpAuthApi({ details: values });
            if (success) {
                ShowSwalToast({ icon: "success", title: message });
                resetForm()
            } else {
                ShowSwalToast({ icon: "error", title: message });
            }
        },
    });

    return (
        <Form onSubmit={formik.handleSubmit}>
            <FormGroup>
                <FormLabel htmlFor="firstName">First Name</FormLabel>
                <FormControl
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="Enter First Name"
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                    maxLength={50}
                    isInvalid={formik.touched.firstName && formik.errors.firstName}
                />
                <FormControl.Feedback type="invalid">
                    {formik.errors.firstName}
                </FormControl.Feedback>
            </FormGroup>

            <FormGroup>
                <FormLabel htmlFor="lastName">Last Name</FormLabel>
                <FormControl
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Enter Last Name"
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                    maxLength={50}
                    isInvalid={formik.touched.lastName && formik.errors.lastName}
                />
                <FormControl.Feedback type="invalid">
                    {formik.errors.lastName}
                </FormControl.Feedback>
            </FormGroup>

            <FormGroup>
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter Email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    maxLength={255}
                    isInvalid={formik.touched.email && formik.errors.email}
                />
                <FormControl.Feedback type="invalid">
                    {formik.errors.email}
                </FormControl.Feedback>
            </FormGroup>

            <FormGroup>
                <FormLabel htmlFor="password">Password</FormLabel>
                <FormControl
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter Password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    maxLength={16}
                    isInvalid={formik.touched.password && formik.errors.password}
                />
                <FormControl.Feedback type="invalid">
                    {formik.errors.password}
                </FormControl.Feedback>
            </FormGroup>

            <div className="d-flex justify-content-between mt-4">
                <Button variant="danger" type="reset" onClick={() => formik.resetForm()}>
                    Reset
                </Button>
                <Button variant="primary" type="submit">
                    Sign Up
                </Button>
            </div>
        </Form>
    );
};

export default SignUpForm;
