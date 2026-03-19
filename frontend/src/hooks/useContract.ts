import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import DeliverySystemABI from "@/utils/DeliverySystem.json";

// For development, replace with deployed address or keep empty
export const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export function useDeliveryContract() {
  const { writeContractAsync } = useWriteContract();

  const createDelivery = async (deliveryId: string, receiver: string, agent: string) => {
    return await writeContractAsync({
      address: CONTRACT_ADDRESS,
      abi: DeliverySystemABI.abi,
      functionName: "createDelivery",
      args: [deliveryId, receiver, agent],
    });
  };

  const updateStatus = async (deliveryId: string, status: string) => {
    return await writeContractAsync({
      address: CONTRACT_ADDRESS,
      abi: DeliverySystemABI.abi,
      functionName: "updateStatus",
      args: [deliveryId, status],
    });
  };

  const confirmDelivery = async (deliveryId: string) => {
    return await writeContractAsync({
      address: CONTRACT_ADDRESS,
      abi: DeliverySystemABI.abi,
      functionName: "confirmDelivery",
      args: [deliveryId],
    });
  };

  return { createDelivery, updateStatus, confirmDelivery };
}

type DeliveryData = [
  string, // deliveryId
  string, // sender
  string, // agent
  string, // receiver
  string, // status
  bigint, // timestamp
  boolean // isConfirmed
];

export function useDeliveryInfo(deliveryId: string) {
  const { data, isError, isLoading, error } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: DeliverySystemABI.abi,
    functionName: "getDelivery",
    args: [deliveryId],
    query: {
      enabled: !!deliveryId,
    }
  });

  return { data: data as DeliveryData | undefined, isError, isLoading, error };
}