import { ethers } from "hardhat";

async function main() {
  const contractAddress = "0x7917aa2336E6d0333e05542e8f2164C1838D1Fe3";
  const contract = await ethers.getContractAt("DeliverySystem", contractAddress);

  const deliveryId = process.env.ID || "PKG-1234";

  console.log(`Checking ${deliveryId}...`);
  const data = await contract.getDelivery(deliveryId);
  console.log("Raw Blockchain Data Array:", data);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});