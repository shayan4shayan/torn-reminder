self.addEventListener("install", (event) => {
  console.log("service worker started");
});

self.addEventListener("periodicsync", (event) => {
  const apikey = event.tag;
});
