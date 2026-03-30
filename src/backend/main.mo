import Map "mo:core/Map";
import List "mo:core/List";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Int "mo:core/Int";

actor {
  type WarLog = {
    date : Int;
    opponent : Text;
    score : Text;
    result : Text;
    map : Text;
    notes : Text;
  };

  module WarLog {
    public func compareByDate(log1 : WarLog, log2 : WarLog) : Order.Order {
      Int.compare(log1.date, log2.date);
    };
  };

  type StaffMember = {
    name : Text;
    role : Text;
    status : Text;
  };

  module StaffMember {
    public func compareByName(staff1 : StaffMember, staff2 : StaffMember) : Order.Order {
      Text.compare(staff1.name, staff2.name);
    };
  };

  type WarTeamPlayer = {
    name : Text;
    role : Text;
    rank : Text;
  };

  module WarTeamPlayer {
    public func compareByName(player1 : WarTeamPlayer, player2 : WarTeamPlayer) : Order.Order {
      Text.compare(player1.name, player2.name);
    };
  };

  let staffMembers = Map.singleton<Principal, StaffMember>(
    Principal.fromText("2vxsx-fae"),
    { name = "initez"; role = "Founder"; status = "Active" },
  );
  let warLogs = Map.empty<Principal, WarLog>();
  let asWarTeam = Map.empty<Principal, WarTeamPlayer>();
  let euWarTeam = Map.empty<Principal, WarTeamPlayer>();

  public query ({ caller }) func getStaffMembers() : async [StaffMember] {
    staffMembers.values().toArray().sort(StaffMember.compareByName);
  };

  public query ({ caller }) func getWarLogs() : async [WarLog] {
    warLogs.values().toArray().sort(WarLog.compareByDate);
  };

  public query ({ caller }) func getAsWarTeam() : async [WarTeamPlayer] {
    asWarTeam.values().toArray().sort(WarTeamPlayer.compareByName);
  };

  public query ({ caller }) func getEuWarTeam() : async [WarTeamPlayer] {
    euWarTeam.values().toArray().sort(WarTeamPlayer.compareByName);
  };
};
