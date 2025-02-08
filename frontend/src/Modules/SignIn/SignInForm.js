import { useFormik } from "formik";
import { Button, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { SignInAuthApi, SignUpAuthApi } from "../../Services/Auth";
import { ShowSwalToast } from "../../Components/Swal";
import * as Yup from "yup";

// Validation Schema using Yup
const validationSchema = Yup.object({
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

const SignInForm = ({ role }) => {
    // Formik for Customer and Admin
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            role: role, // Role will be set based on the active tab
        },
        validationSchema: validationSchema, // Add validation schema here
        onSubmit: async (values, { resetForm }) => {
            const { success, message } = await SignInAuthApi({ details: values });
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
                    Sign In
                </Button>
            </div>
        </Form>
    );
};

export default SignInForm;
