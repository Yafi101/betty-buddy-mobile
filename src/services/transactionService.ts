import axios from "axios";
const baseUrl = "https://bet-trial.onrender.com/wallet";

export async function deposit(
  amount,
  email,
  firstName,
  lastName,
  phone,
  chatid
) {
  try {
    console.log(amount, email, firstName, lastName, phone, chatid);
    const response = await axios.post(`${baseUrl}/deposit`, {
      amount,
      email,
      firstName,
      lastName,
      phone,
      chat_id: chatid, // now included in the request body
    });
    return response.data;
  } catch (error) {
    console.error("error depositing money: ", error);
    throw error;
  }
}
