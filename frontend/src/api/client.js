export async function fetchPropertyDetail(id) {
    try {
        const url = `http://localhost:5000/api/properties/${id}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch property details");
        }
        return response.json();
    }
    catch (error) {
        throw new Error("Failed to fetch property details");
    }
}

export async function fetchPropertyOpenHouses(id) {
    try {
        const url = `http://localhost:5000/api/properties/${id}/openhouses`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch property open houses");
        }
        return response.json();
    }
    catch (error) {
        throw new Error("Failed to fetch property open houses");
    }
}

export async function fetchProperties(params = {}) {
    try {
        const query = new URLSearchParams(params).toString();
        const url = `http://localhost:5000/api/properties?${query}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch properties");
        }
        return response.json();
    }
    catch (error) {
        throw new Error("Failed to fetch properties");
    }
}
