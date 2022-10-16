/*global chrome*/

export function setStoredOptions(myPublicKey) {
  const publicKey = myPublicKey;
  chrome.storage.sync.set(
    {
      publicKey,
    },
    () => {
      console.log(publicKey);
    }
  );
}

export function getStoredOptions() {
  return new Promise((resolve) => {
    chrome.storage.sync.get("publicKey", (res) => {
      resolve(res.publicKey);
    });
  });
}

export function setStoredCheck(bool) {
  const check = bool;
  chrome.storage.sync.set(
    {
      check,
    },
    () => {
      console.log(check);
    }
  );
}

export function getStoredCheck() {
  return new Promise((resolve) => {
    chrome.storage.sync.get("check", (res) => {
      resolve(res.check);
    });
  });
}
