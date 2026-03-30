import { useQuery } from "@tanstack/react-query";
import type { StaffMember, WarLog, WarTeamPlayer } from "../backend.d";
import { useActor } from "./useActor";

export function useWarLogs() {
  const { actor, isFetching } = useActor();
  return useQuery<WarLog[]>({
    queryKey: ["warLogs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getWarLogs();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useStaffMembers() {
  const { actor, isFetching } = useActor();
  return useQuery<StaffMember[]>({
    queryKey: ["staffMembers"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getStaffMembers();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAsWarTeam() {
  const { actor, isFetching } = useActor();
  return useQuery<WarTeamPlayer[]>({
    queryKey: ["asWarTeam"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAsWarTeam();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useEuWarTeam() {
  const { actor, isFetching } = useActor();
  return useQuery<WarTeamPlayer[]>({
    queryKey: ["euWarTeam"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getEuWarTeam();
    },
    enabled: !!actor && !isFetching,
  });
}
