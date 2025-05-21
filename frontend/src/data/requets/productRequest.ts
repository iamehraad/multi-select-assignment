export const fetchProductsList = async (): Promise<string[]> => {
    try {
        const response = await fetch("http://localhost:8080/api/products")
        const json = await response.json()
        return json.data
    } catch (e) {
        console.log(e)
        return Promise.reject(e)
    }
};
