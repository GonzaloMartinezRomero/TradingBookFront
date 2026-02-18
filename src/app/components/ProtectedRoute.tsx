"use client";
import { useEffect, useState } from 'react';
import { isAuthenticated, initiateGoogleLogin } from '../services/auth.service';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const [isChecking, setIsChecking] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            const authStatus = isAuthenticated();
            setAuthenticated(authStatus);
            setIsChecking(false);

            if (!authStatus) {
                // Show login page or redirect
                setTimeout(() => {
                    initiateGoogleLogin();
                }, 2000);
            }
        };

        checkAuth();
    }, []);

    if (isChecking) {
        return (
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6 text-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <h3 className="mt-3">Checking authentication...</h3>
                    </div>
                </div>
            </div>
        );
    }

    if (!authenticated) {
        return (
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 text-center">
                        <div className="alert alert-info" role="alert">
                            <h2>
                                <i className="bi bi-shield-lock"></i> Authentication Required
                            </h2>
                            <p className="mt-3 mb-4">
                                Please sign in with your Google account to access this application.
                            </p>
                            <button 
                                className="btn btn-primary btn-lg"
                                onClick={() => initiateGoogleLogin()}
                            >
                                <i className="bi bi-google me-2"></i>
                                Sign in with Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
