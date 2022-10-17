/*global chrome*/

export function setPublicKey(key) {
  const publicKey = key;
  chrome.storage.sync.set(
    {
      publicKey,
    },
    () => {
      console.log(publicKey);
    }
  );
}

export function getPublicKey() {
  return new Promise((resolve) => {
    chrome.storage.sync.get("publicKey", (res) => {
      resolve(res.publicKey);
    });
  });
}

export function setPrivateKey(key) {
  const privateKey = key;
  chrome.storage.sync.set(
    {
      privateKey,
    },
    () => {
      console.log("OK!");
    }
  );
}

export function getPrivateKey() {
  return new Promise((resolve) => {
    chrome.storage.sync.get("privateKey", (res) => {
      resolve(res.privateKey);
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

export function setPassword(pwd) {
  const password = pwd;

  return new Promise((resolve) => {
    chrome.storage.sync.set(
      {
        password,
      },
      () => {
        resolve(true);
      }
    );
  });
}

export function getPassword() {
  return new Promise((resolve) => {
    chrome.storage.sync.get("password", (res) => {
      resolve(res.password);
    });
  });
}

export function setLogin(bool) {
  const LoginCheck = bool;
  chrome.storage.sync.set(
    {
      LoginCheck,
    },
    () => {
      console.log(bool);
    }
  );
}

export function getLogin() {
  return new Promise((resolve) => {
    chrome.storage.sync.get("LoginCheck", (res) => {
      resolve(res.LoginCheck);
    });
  });
}
