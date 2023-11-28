import User from "../models/User.js";
import { getFileStream, uploadFile, uploadFiles } from "../middleware/s3.js";
import fs from "fs";
import util from "util";
import axios from "axios";

export const authenticateChat = async (req, res) => {
  const { username } = req.body;

  try {
    const r = await axios.put(
      "https://api.chatengine.io/users",
      { username: username, secret: username, first_name: username },
      {
        headers: {
          "private-key": process.env.REACT_APP_CHAT_ENGINE_PRIVATE_KEY,
        },
      }
    );
    return res.status(r.status).json(r.data)
  } catch (e) {
    return res.status(e.response.status).json(e.response.data)
  }
};
