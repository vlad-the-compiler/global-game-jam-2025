import os from "os";
import type { NextConfig } from "next";

function getLocalIPAddress() {
  const networkInterfaces = os.networkInterfaces();
  for (const interfaceName in networkInterfaces) {
    const addresses = networkInterfaces[interfaceName];
    for (const address of addresses!) {
      if (address.family === "IPv4" && !address.internal) {
        return address.address; // Return the first non-internal IPv4 address
      }
    }
  }
  return "127.0.0.1"; // Default to localhost if no address is found
}

const nextConfig: NextConfig = {
  env: {
    WS_HOST: process.env.WS_HOST,
    GAME_SERVER: getLocalIPAddress()
  }
};

export default nextConfig;
