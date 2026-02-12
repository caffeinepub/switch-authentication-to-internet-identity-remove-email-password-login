import Map "mo:core/Map";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";

actor {
  // Initialize access control system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  public type UserProfile = {
    displayName : Text;
    bio : Text;
    profilePicture : ?Storage.ExternalBlob;
  };

  // Data persistence
  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    let callerRole = AccessControl.getUserRole(accessControlState, caller);
    switch (callerRole) {
      case (#guest) { Runtime.trap("Cannot access profile as guest") };
      case (_) {
        if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only view your own profile");
        };
        userProfiles.get(user);
      };
    };
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    let callerRole = AccessControl.getUserRole(accessControlState, caller);
    switch (callerRole) {
      case (#guest) { Runtime.trap("Cannot access profile as guest") };
      case (_) { userProfiles.get(caller) };
    };
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    let callerRole = AccessControl.getUserRole(accessControlState, caller);
    switch (callerRole) {
      case (#guest) { Runtime.trap("Cannot create profile as guest") };
      case (_) { userProfiles.add(caller, profile) };
    };
  };
};
