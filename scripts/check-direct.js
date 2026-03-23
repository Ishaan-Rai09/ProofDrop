import { ethers } from "ethers";

async function main() {
  const rpcUrl = "https://eth-sepolia.g.alchemy.com/v2/tLgAiOQ21qki2z5Oz6W8528d-99baMwR"; // From screenshot
  const provider = new ethers.JsonRpcProvider(rpcUrl);

  const contractAddress = "0x7917aa2336E6d0333e05542e8f2164C1838D1Fe3";
  const abi = [
    "function getDelivery(string) view returns (string, address, address, address, string, uint256, bool)",
  ];

  const contract = new ethers.Contract(contractAddress, abi, provider);

  const testIds = ["PKG-2183", "PKG-1234"];
  for (const id of testIds) {
    try {
      console.log(`Checking ${id}...`);
      const val = await contract.getDelivery(id);
      console.log(val);
    } catch (e) {
      console.log(`Error checking ${id}:`, e.shortMessage || e.message);
    }
  }
}

main();