const ROUTE_PATHS = {
  PROFILE: {
    CREATE:"/signup",
    GET_ALL: "/all-profile",
    UPDATE: "/update-profile/:id", // As an example
    GET_BY_ID: "/:id",
    DELETE: "/delete-profile/:id",
    // Add other auth-related routes here
  },
  // Define other route groups as needed
};

export default ROUTE_PATHS;
