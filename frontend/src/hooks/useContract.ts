import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import DeliverySystemABI from "@/utils/DeliverySystem.json";

// For development, replace with deployed address or keep empty
export const CONTRACT_ADDRESS = "0x95AB89885A706a594ee94E94a83269cf760a3D88"; 

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

  return { data, isError, isLoading, error };
}