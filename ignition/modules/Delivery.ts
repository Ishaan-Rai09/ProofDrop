import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const DeliveryModule = buildModule("DeliveryModule", (m) => {
  const delivery = m.contract("DeliverySystem", []);
  return { delivery };
});

export default DeliveryModule;
