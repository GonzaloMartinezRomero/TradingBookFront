"use client";
import { initiateGoogleLogin } from "../services/auth.service";


export default function Forbidden() {
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8 text-center">
                    <div className="alert alert-danger" role="alert">
                        <h1 className="display-1">
                            <i className="bi bi-shield-lock"></i>
                        </h1>
                        <h2 className="alert-heading">Access Denied</h2>
                        <hr />
                        <p className="mb-3">
                            You don't have permission to access this resource. 
                            Please authenticate with your Google account to continue.
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
