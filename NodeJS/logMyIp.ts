import axios from "axios";
import { SocksProxyAgent } from "socks-proxy-agent";
import logger from "../utils/logger";

const logMyIp = async (proxy: string) => {
  const agent = new SocksProxyAgent(`socks5h://${proxy}`);
  const { data: currentProxy } = await axios.get("https://api.ipify.org", {
    httpsAgent: agent,
  });
  logger.debug(`Current Proxy is : ${currentProxy}`);
};

export { logMyIp };
