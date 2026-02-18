import { getAccessToken, clearAccessToken } from './auth.service';

// Remove trailing slash to prevent double slashes
const urlBase = process.env.TRADING_BOOK_API_ENDPOINT?.replace(/\/$/, '');

// Helper to get headers with authorization
function getHeaders(): HeadersInit {
    const token = getAccessToken();
    const headers: HeadersInit = {
        'Content-type': 'application/json; charset=UTF-8',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
        console.log('Adding Bearer token to request'); // Debug log
    } else {
        console.warn('No token available for API request'); // Debug log
    }

    return headers;
}

// Helper to handle authentication errors
function handleAuthError(response: Response): void {
    if (response.status === 401 || response.status === 403) {
        clearAccessToken();
        window.location.href = '/forbidden';
    }
}

export async function get<T>(resourceEndpoint: string): Promise<T> {
    const url: string = `${urlBase}/${resourceEndpoint}`;
    console.log('GET request to:', url); // Debug log

    const response = await fetch(url, {
        method:'GET',
        headers: getHeaders(),
    });

    if (!response.ok) {
        
        handleAuthError(response);
        let errorMsg: string = response.statusText;
        throw new Error(errorMsg);
    }

    const value: T = await response.json();

    return value;
}

export async function post<T>(resourceEndpoint: string, body: any | null): Promise<T> {
    const url: string = `${urlBase}/${resourceEndpoint}`;
    const bodyParsed: string = (body == null) ? "" : JSON.stringify(body);

    const response = await fetch(url, {
        method: 'POST',
        body: bodyParsed,
        headers: getHeaders(),
    });

    if (!response.ok) {
        handleAuthError(response);
        let errorMsg: string = response.statusText;
        throw new Error(errorMsg);
    }

    const value: T = await response.json();

    return value;
}

export async function remove(resourceEndpoint: string): Promise<boolean> {
    const url: string = `${urlBase}${resourceEndpoint}`;

    const response = await fetch(url, {
        method: 'DELETE',
        headers: getHeaders(),
    });

    if (!response.ok) {
        handleAuthError(response);
        let errorMsg: string = response.statusText;
        throw new Error(errorMsg);
    }

    return true;
}

export async function patch<T>(resourceEndpoint: string, body: any | null): Promise<T> {
    const url: string = `${urlBase}${resourceEndpoint}`;
    const bodyParsed: string = (body == null) ? "" : JSON.stringify(body);

    const response = await fetch(url, {
        method: 'PATCH',
        body: bodyParsed,
        headers: getHeaders(),
    });

    if (!response.ok) {
        handleAuthError(response);
        let errorMsg: string = response.statusText;
        throw new Error(errorMsg);
    }

    const value: T = await response.json();

    return value;
}
