export const login = async (request) => {
    const config = useRuntimeConfig();
    const apiUrl = config.public.API_URL;

    const { data, error } = await useFetch(`${apiUrl}/api/auth`, {
        method: "POST",
        body: { email: email.value, password: password.value },
        headers: { "Content-Type": "application/json" }
    });

    return { data, error };
};

export const me = async (token) => {
    const config = useRuntimeConfig();
    const apiUrl = config.public.API_URL;

    const { data, error } = await useFetch(`${apiUrl}/api/auth/me`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });
    return { data, error };
};