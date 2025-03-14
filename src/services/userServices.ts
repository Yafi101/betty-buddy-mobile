import axios from "axios";
const baseUrl = "https://bet-trial.onrender.com/auth";

export async function getUser(chat_id) {
  try {
    if (!chat_id) throw new Error("chat_id is required");

    const response = await axios.get(`${baseUrl}/${chat_id}`);
    return response.data;
  } catch (error) {
    if (error.response.status === 404) {
      return null;
    } else if (error.response) {
      console.error("Error fetching user: ", error.response.data);
      throw new Error(error.response.data.error || "Failed to fetch user");
    } else if (error.request) {
      console.error("No response received from server");
      throw new Error("Server did not respond. Check the network.");
    } else {
      console.error("Request error: ", error.message);
      throw new Error("Error in request: " + error.message);
    }
  }
}
