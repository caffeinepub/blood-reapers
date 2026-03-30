import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface WarTeamPlayer {
    name: string;
    rank: string;
    role: string;
}
export interface WarLog {
    map: string;
    result: string;
    date: bigint;
    score: string;
    notes: string;
    opponent: string;
}
export interface StaffMember {
    status: string;
    name: string;
    role: string;
}
export interface backendInterface {
    getAsWarTeam(): Promise<Array<WarTeamPlayer>>;
    getEuWarTeam(): Promise<Array<WarTeamPlayer>>;
    getStaffMembers(): Promise<Array<StaffMember>>;
    getWarLogs(): Promise<Array<WarLog>>;
}
