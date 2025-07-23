import instance from "@/lib/axios";



export const getThreeCardBoards = async () => {
    try {
        const response = await instance.get("/cardboards/three");
        return response.data;
    } catch (error) {
        console.error("Error fetching three cardboards:", error);
        throw error;
    }
}