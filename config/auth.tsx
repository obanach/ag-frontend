
const endpointDomain = process.env.NEXT_PUBLIC_API_ENDPOINT_DOMAIN ?? 'https://api.autogrow.pl';

export const authConfig  = {
    domain: endpointDomain,
    cookies: {
        token: 'accessToken',
        username: 'username',
        user: 'userData'
    },
    endpoint: {
        login: endpointDomain + '/auth/login',
        register: endpointDomain + '/auth/register',
        user: endpointDomain + '/auth/user',
    }
}