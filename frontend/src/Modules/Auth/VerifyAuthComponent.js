import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Spinner, Button } from "react-bootstrap";
import { VerifyAuthApi } from "../../Services/Auth";

const VerifyAuthComponent = () => {
    const { token } = useParams(); // Get token from the URL
    const navigate = useNavigate();
    const [status, setStatus] = useState("loading"); // 'loading', 'success', 'error'
    const [role, setRole] = useState(null); // 'loading', 'success', 'error'

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const { success, message, role } = await VerifyAuthApi({ token });

                if (success) {
                    setStatus("success");
                    setRole(role)
                } else {
                    setStatus("error");
                    setRole(null)
                }
            } catch (error) {
                console.error("Verification Error:", error);
                setStatus("error");
            }
        };

        verifyToken();
    }, [token]);

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card className="shadow-lg p-4 text-center">
                {status === "loading" && (
                    <>
                        <Spinner animation="border" variant="primary" />
                        <p className="mt-3">Verifying your email...</p>
                    </>
                )}

                {status === "success" && (
                    <>
                        <h2 className="text-success">Email Verified Successfully!</h2>
                        <p>Your email has been verified. You can now log in to your account.</p>
                        <Button variant="primary" onClick={() => navigate(`/sign-in/${role}`)}>
                            Go to Login
                        </Button>
                    </>
                )}

                {status === "error" && (
                    <>
                        <h2 className="text-danger">Verification Failed</h2>
                        <p>Invalid or expired verification link.</p>
                        <Button variant="secondary" onClick={() => navigate("/")}>
                            Go to Homepage
                        </Button>
                    </>
                )}
            </Card>
        </Container>
    );
};

export default VerifyAuthComponent;
