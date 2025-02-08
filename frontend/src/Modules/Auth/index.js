import React from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AuthComponent = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-light min-vh-100 d-flex justify-content-center align-items-center">
            <Container className="text-center">
                <Card className="shadow-lg p-4 rounded">
                    <h2 className="mb-4">Welcome to</h2>
                    <h1 className="display-3">
                        <span className="text-primary">T</span>
                        <span className="text-danger">e</span>
                        <span className="text-success">c</span>
                        <span className="text-warning">h</span>
                        <span className="text-info">e</span>
                        <span className="text-dark">r</span>
                        <span className="text-muted">u</span>
                        <span className="text-secondary">d</span>
                        <span className="text-info">i</span>
                        <span className="text-primary">t</span>
                        <span className="text-danger">e</span>
                    </h1>

                    <Row className="mt-5">
                        {/* Customer Buttons */}
                        <Col sm={6}>
                            <h4>Customer</h4>
                            <Button
                                variant="primary"
                                className="me-3"
                                onClick={() => navigate(`/sign-up/customer`)}
                            >
                                Sign Up
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={() => navigate(`/sign-in/customer`)}
                            >
                                Sign In
                            </Button>
                        </Col>

                        {/* Admin Buttons */}
                        <Col sm={6}>
                            <h4>Admin</h4>
                            <Button
                                variant="primary"
                                className="me-3"
                                onClick={() => navigate(`/sign-up/admin`)}
                            >
                                Sign Up
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={() => navigate(`/sign-in/admin`)}
                            >
                                Sign In
                            </Button>
                        </Col>
                    </Row>
                </Card>
            </Container>
        </div>
    );
};

export default AuthComponent;
