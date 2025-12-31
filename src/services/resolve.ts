import axios from "axios";
import { RESOLVE_USERNAME_ROUTE } from "../routes/routes";
interface ResolverParams {
  username: string;
  isBusiness?: boolean; // true || false
}

export const RESOLVE_USERNAME = async (payload: ResolverParams) => {
  try {
    const response = await axios.post(RESOLVE_USERNAME_ROUTE, payload);
    console.log(response, "available response ");

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    return error?.message;
    // error?.response?.data || error.message;
  }
};
