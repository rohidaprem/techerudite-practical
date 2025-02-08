import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";  // Import useParams hook
import SignUpForm from "./SignUpForm";

const SignUpComponent = () => {
    const { role } = useParams();  // Get the role parameter from the URL

    return (
        <div>
            <header className="bg-secondary text-white p-3 text-center">
                <div className="container d-flex justify-content-between">
                    <h1>Sign Up</h1>
                </div>
            </header>

            {/* Main Content */}
            <main className="container my-5">
                <Row className="justify-content-center">
                    <Col md={6}>
                        <Card className="shadow-lg p-4 rounded">
                            <h4 className="text-center mb-4">Create Your Account</h4>
                            <SignUpForm role={role} /> {/* Pass role to SignUpForm */}
                        </Card>
                    </Col>
                </Row>
            </main>
        </div>
    );
};

export default SignUpComponent;
