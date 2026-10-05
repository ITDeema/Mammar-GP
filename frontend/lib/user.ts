export type Role = "homeowner" | "architect";

// TEMPORARY placeholder until the backend/auth exists.
// Replace with the real logged-in user returned by the API.
export const mockUser = {
  name: "سارة العتيبي",
  email: "sara.alotaibi@example.com",
  role: "homeowner" as Role,
};