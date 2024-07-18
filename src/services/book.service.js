import axios from "axios";

export const BookService = {
    async getAll() {
        const response = await axios.get("http://localhost:8000")

        return response.data
    },

    async getById(id) {
        const response = await axios.get(`http://localhost:8000/?id=${id}`)
        console.log(response.data)

        return response.data[0]
    }
}