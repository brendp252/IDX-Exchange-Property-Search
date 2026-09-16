import { 
    fetchProperties, 
    fetchPropertyOpenHouses, 
    fetchPropertyDetail 
} from './client';

beforeEach(() => {
    global.fetch = jest.fn();
});

afterEach(() => {
    jest.resetAllMocks();
});

describe('fetchProperties', () => {
    test("fetches properties with no filters", async () => {
        const mockData = {
            total: 2,
            results: [{ id: 1 }, { id: 2 }]
        };

        global.fetch.mockResolvedValue({
            ok: true,
            json: async () => mockData
        });

        const result = await fetchProperties();

        expect(global.fetch).toHaveBeenCalledWith(
            "http://localhost:5000/api/properties?"
        );

        expect(result).toEqual(mockData);
    });

    test("fetches properties with some filters", async () => {
        const mockData = {
            total: 2,
            results: [{ id: 1 }, { id: 2 }]
        };

        global.fetch.mockResolvedValue({
            ok: true,
            json: async () => mockData
        });

        const result = await fetchProperties({
            city: "Winchester",
            minPrice: 600000
        });

        expect(global.fetch).toHaveBeenCalledWith(
            "http://localhost:5000/api/properties?city=Winchester&minPrice=600000"
        );

        expect(result).toEqual(mockData);
    });

    test("throws error on bad request", async () => {
        const mockData = {
            total: 2,
            results: [{ id: 1 }, { id: 2 }]
        };

        global.fetch.mockResolvedValue({
            ok: false,
            json: async () => mockData
        });

        await expect(fetchProperties()).rejects.toThrow(
            "Failed to fetch properties"
        );
    });
});

describe('fetchPropertyOpenHouses', () => {
    test("fetches property open houses with id", async () => {
        const mockData = {
            total: 2,
            results: [{ id: 1 }, { id: 2 }]
        };

        global.fetch.mockResolvedValue({
            ok: true,
            json: async () => mockData
        });

        const result = await fetchPropertyOpenHouses("1");

        expect(global.fetch).toHaveBeenCalledWith(
            "http://localhost:5000/api/properties/1/openhouses"
        );

        expect(result).toEqual(mockData);
    });

    test("throws error on bad request", async () => {
        const mockData = {
            total: 2,
            results: [{ id: 1 }, { id: 2 }]
        };

        global.fetch.mockResolvedValue({
            ok: false,
            json: async () => mockData
        });

        await expect(fetchPropertyOpenHouses("1")).rejects.toThrow(
            "Failed to fetch property open houses"
        );
    });
});

describe('fetchPropertyDetail', () => {
    test("fetches property details with id", async () => {
        const mockData = {
            total: 2,
            results: [{ id: 1 }, { id: 2}]
        };

        global.fetch.mockResolvedValue({
            ok: true,
            json: async () => mockData
        });

        const result = await fetchPropertyDetail("1");

        expect(global.fetch).toHaveBeenCalledWith(
            "http://localhost:5000/api/properties/1"
        );

        expect(result).toEqual(mockData);
    });

    test("throws error on bad request", async () => {
        const mockData = {
            total: 2,
            results: [{ id: 1 }, { id: 2 }]
        };

        global.fetch.mockResolvedValue({
            ok: false,
            json: async () => mockData
        });

        await expect(fetchPropertyDetail("1")).rejects.toThrow(
            "Failed to fetch property details"
        );
    });
});