const liveHost = "https://us-central1-mealstogo-9b7c9.cloudfunctions.net";
// const localHost =
//   "http://4659-78-57-124-214.ngrok.io/mealstogo-aa8e1/us-central1";

export const isDevelopment = process.env.NODE_ENV === "development";

// export const host = isDevelopment ? localHost : liveHost;
export const host = liveHost;

// In meals-to-go terminal run: npx ngrok http http://localhost:5001

// Go through the steps and copy the Forwarding information which looks like this http://31d8-41-184-201-155.ngrok.io

// Replace the http://localhost:5001 with http://31d8-41-184-201-155.ngrok.io

// so in location.service.js the fetch url will be something like this:

// `http://31d8-41-184-201-155.ngrok.io/mealstogo-14b61/us-central1/geocode?city=${searchTerm}
