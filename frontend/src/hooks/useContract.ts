import { useReadContract, useWriteContract } from "wagmi";
import DeliverySystemABI from "@/utils/DeliverySystem.json";

// For development, replace with deployed address or keep empty
export const CONTRACT_ADDRESS = "0x7917aa2336E6d0333e05542e8f2164C1838D1Fe3";

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

export type DeliveryData = [
  string, // deliveryId
  string, // sender
  string, // agent
  string, // receiver
  string, // status
  bigint, // timestamp
  boolean // isConfirmed
];

export function useDeliveryInfo(deliveryId: string) {
  const { data, isError, isLoading, error, refetch } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: DeliverySystemABI.abi,
    functionName: "getDelivery",
    args: [deliveryId],
    query: {
      enabled: !!deliveryId,
      refetchInterval: 3000,    // Poll every 3 seconds for live updates
      gcTime: 0,                // Never cache blockchain data
      staleTime: 0,             // Always treat data as stale
    }
  });

  return { data: data as DeliveryData | undefined, isError, isLoading, error, refetch };
}
