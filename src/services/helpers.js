import { Base64 } from "js-base64";

class HelpersService {
  decodeToken(token) {
    const tokenDecoded = token ? Base64.decode(token) : "{}";

    return JSON.parse(tokenDecoded);
  }
}

export default new HelpersService();
