import axios from "axios";
import { instance } from "./axios";

export const sendMessage = async (to_id, message) => {
  try {
    const { data } = await instance.post("messages", { message, to_id });
    return data;
  } catch (error) {
    return error;
  }
};

export const getThreads = async () => {
  try {
    const { data } = await instance.get("messages");
    return data;
  } catch (error) {
    return error;
  }
};

export const getThread = async (friend_id, pageParam) => {
  try {
    const { data } = await instance.get(
      `messages/${friend_id}?cursor=${pageParam}`
    );
    return data;
  } catch (error) {
    return error;
  }
};
