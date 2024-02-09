self.addEventListener("install", (event) => {
  console.log("service worker started");
});

self.addEventListener("periodicsync", (event) => {
  console.log("Periodic sync event:", event);
});
