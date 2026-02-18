// Auth configuration
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
const GOOGLE_REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI || `${window.location.origin}/auth/callback`;
const GOOGLE_AUTH_ENDPOINT = 'https://accounts.google.com/o/oauth2/v2/auth';
const TOKEN_STORAGE_KEY = 'id_token';

export interface AuthTokens {
    id_token: string;
    access_token?: string;
    expires_in: number;
    token_type: string;
    scope: string;
}

// Store ID token in localStorage
export function setAccessToken(token: string): void {
    if (typeof window !== 'undefined') {
        localStorage.setItem(TOKEN_STORAGE_KEY, token);
    }
}

// Get ID token from localStorage
export function getAccessToken(): string | null {
    if (typeof window !== 'undefined') {
        return localStorage.getItem(TOKEN_STORAGE_KEY);
    }
    return null;
}

// Remove token from localStorage
export function clearAccessToken(): void {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(TOKEN_STORAGE_KEY);
    }
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
    return getAccessToken() !== null;
}

// Initiate Google OAuth flow - request ID token
export function initiateGoogleLogin(): void {
    const params = new URLSearchParams({
        client_id: GOOGLE_CLIENT_ID!,
        redirect_uri: GOOGLE_REDIRECT_URI,
        response_type: 'id_token token', // Request BOTH id_token and access_token
        scope: 'openid email profile',
        nonce: generateNonce(), // Required for id_token
        include_granted_scopes: 'true',
    });

    window.location.href = `${GOOGLE_AUTH_ENDPOINT}?${params.toString()}`;
}

// Generate a random nonce for security (required for id_token)
function generateNonce(): string {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

// Parse tokens from URL hash - prioritize ID token
export function parseTokensFromHash(): AuthTokens | null {
    console.log("HASH");
    console.log(window.location.hash);
    if (typeof window === 'undefined') return null;

     const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);

    const id_token = params.get('id_token'); // This is the JWT token (ey...)
    const access_token = params.get('access_token');
    const expires_in = params.get('expires_in');
    const token_type = params.get('token_type');
    const scope = params.get('scope');

    if (id_token && expires_in) {
        return {
            id_token,
            access_token: access_token || undefined,
            expires_in: parseInt(expires_in),
            token_type: token_type || 'Bearer',
            scope: scope || '',
        };
    }

    return null;
}

// Logout user
export function logout(): void {
    clearAccessToken();
    window.location.href = '/';
}
