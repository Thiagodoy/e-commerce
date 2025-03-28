export const productById = async (id) => {
    const config = useRuntimeConfig();
    const apiUrl = config.public.API_URL;
    const token = localStorage.getItem('token');

    const { data, error } = await useFetch(`${apiUrl}/api/product/${id}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });
    return { data, error };
};

export const updateProduct = async (request) => {
    const config = useRuntimeConfig();
    const apiUrl = config.public.API_URL;
    const token = localStorage.getItem('token');

    const { data, error } = await useFetch(`${apiUrl}/api/product/${request.value.id}`, {
        method: "PUT",
        body: request.value,
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });
    return { data, error };
};

export const createProduct = async (request) => {
    const config = useRuntimeConfig();
    const apiUrl = config.public.API_URL;
    const token = localStorage.getItem('token');

    console.log(request,"TEST");
    const { data, error } = await useFetch(`${apiUrl}/api/product`, {
        method: "POST",
        body: request.value,
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });
    return { data, error };
};


export const deleteProduct = async (request) => {
    const config = useRuntimeConfig();
    const apiUrl = config.public.API_URL;
    const token = localStorage.getItem('token');

    const { data, error } = await useFetch(`${apiUrl}/api/product/${request.id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });
    return { data, error };
};


export const seachP = async (request, page) => {
    const config = useRuntimeConfig();
    const apiUrl = config.public.API_URL;
    const token = localStorage.getItem('token');

    const queryParam = objectToQueryParams({...request.value, ...page})

    const { data, error } = await useFetch(`${apiUrl}/api/product${queryParam}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });
    return { data, error };
};

function objectToQueryParams(obj) {
    return '?' + Object.keys(obj)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
      .join('&');
  }





