export { auth as middleware } from "@/auth";

// No routes are protected — auth is optional throughout the app.
// Add paths to the matcher array here to lock down specific routes later.
export const config = { matcher: [] };
