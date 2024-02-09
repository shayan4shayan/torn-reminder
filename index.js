async function registerServiceWorker() {
    if ("serviceWorker" in navigator) {
        try {
          const registration = await navigator.serviceWorker.register("sw.js", {
            scope: "/",
          });
          if (registration.installing) {
            console.log("Service worker installing");
          } else if (registration.waiting) {
            console.log("Service worker installed");
          } else if (registration.active) {
            console.log("Service worker active");
          }
          
        } catch (error) {
          console.error(`Registration failed with ${error}`);
        }
      }
};

async function registerPerioridicTask() {

  navigator.permissions.query({ name: "periodic-background-sync" }).then((status)=>{ console.log(status)})
  const registration = await navigator.serviceWorker.ready;
  const key = getAPIKey();
  if ( key == undefined) {
    console.log("Service worker key is undefined");
    return;
  }
  try {
    console.log("Registering periodic task")
    await registration.periodicSync.register(key, {
      miniInterval: 1000
    }
    );
    console.log("Registration successful")
  } catch(error) {
    console.log("Registration failed", error)
  }
}

function unregisterPerioridicTask() {
  navigator.serviceWorker.ready.then((registration) => {
    registration.periodicSync.unregister(getAPIKey());
  });
}

function setAPIKey(apikey) {
  localStorage.setItem("apikey", apikey);
}

function removeAPIKey() {
  localStorage.removeItem("apikey");
}

function getAPIKey() {
  return localStorage.getItem("apikey");
}

registerServiceWorker();
setAPIKey("default");
registerPerioridicTask();


console.log("registering service worker");

