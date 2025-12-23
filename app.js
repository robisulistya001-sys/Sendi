auth.onAuthStateChanged(user => {
  if (user) {
    showApp(true);
    loadUser(user);
    loadStatus();
    loadChat();
  } else {
    showApp(false);
  }
});

function showApp(isLogin) {
  document.getElementById("auth").style.display = isLogin ? "none" : "block";
  document.getElementById("app").style.display = isLogin ? "block" : "none";
}

function register() {
  auth.createUserWithEmailAndPassword(email.value, password.value)
    .catch(e => alert(e.message));
}

function login() {
  auth.signInWithEmailAndPassword(email.value, password.value)
    .catch(e => alert(e.message));
}

function logout() {
  auth.signOut();
}

function saveUsername() {
  const user = auth.currentUser;
  const username = usernameInput.value;

  if (!username) return alert("Username wajib diisi");

  db.collection("users").doc(user.uid).set({
    email: user.email,
    username: username
  });

  userInfo.innerText = username;
}

function loadUser(user) {
  db.collection("users").doc(user.uid).get().then(doc => {
    if (doc.exists) {
      userInfo.innerText = doc.data().username;
    } else {
      userInfo.innerText = user.email;
    }
  });
}

function postStatus() {
  db.collection("statuses").add({
    text: statusText.value,
    time: Date.now()
  });
  statusText.value = "";
}

function loadStatus() {
  db.collection("statuses")
    .orderBy("time", "desc")
    .onSnapshot(snap => {
      statuses.innerHTML = "";
      snap.forEach(doc => {
        statuses.innerHTML += `<div>${doc.data().text}</div>`;
      });
    });
}

function sendChat() {
  db.collection("chats").add({
    text: chatText.value,
    time: Date.now()
  });
  chatText.value = "";
}

function loadChat() {
  db.collection("chats")
    .orderBy("time")
    .onSnapshot(snap => {
      chats.innerHTML = "";
      snap.forEach(doc => {
        chats.innerHTML += `<div>${doc.data().text}</div>`;
      });
    });
}
