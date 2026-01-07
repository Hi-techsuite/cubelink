import axios from "axios";
import {
  POST_BY_ID_ROUTE,
  RESOLVE_GROUP_ROUTE,
  RESOLVE_USERNAME_ROUTE,
} from "../routes/routes";
interface ResolverParams {
  username: string;
  isBusiness?: boolean; // true || false
}

interface PostByIdParams {
  id: string;
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
export const RESOLVE_GROUP = async (groupId: string) => {
  try {
    const response = await axios.get(`${RESOLVE_GROUP_ROUTE}/${groupId}`);

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
export const POST_BY_ID = async (payload: PostByIdParams) => {
  try {
    const response = await axios.get(`${POST_BY_ID_ROUTE}/${payload.id}`);
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
