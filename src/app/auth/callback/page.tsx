"use client";
import { getAccessToken, parseTokensFromHash, setAccessToken } from '@/app/services/auth.service';
import { useEffect } from 'react';


export default function AuthCallback() {
    useEffect(() => {
      
       if(getAccessToken() === null){
            const tokens = parseTokensFromHash();

            if (tokens && tokens.id_token) {
                console.log('ID token received (first 20 chars):', tokens.id_token.substring(0, 20) + '...');
                
                // Store the ID token (JWT format: ey...)
                setAccessToken(tokens.id_token);

                // Clean the URL hash
                window.history.replaceState(null, '', window.location.pathname);

                // Redirect to home page
                window.location.href = '/';
            } else {
                console.error('No ID token found in callback');
                // If no tokens found, redirect to forbidden page
                window.location.href = '/forbidden';
            }
        }

        window.location.href = '/';
      
    }, []);

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <h3 className="mt-3">Authenticating...</h3>
                    <p>Please wait while we log you in.</p>
                </div>
            </div>
        </div>
    );
}
