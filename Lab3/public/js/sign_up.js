function google_sign(){
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
          firebase.database().ref("users/" + user.uid + "/language").once('value', (snapshot) => {
            if (snapshot.exists()) {
              location.href = snapshot.val();
              if (snapshot.val() == "#ru" && document.getElementById("account").text == "Account"){ 
                location.reload();
              }
              else if (snapshot.val() == "#en" && document.getElementById("account").text == "Аккаунт"){
                location.reload();
              }
            } else {
              console.log("no lang written");
            }
          }).catch((error) => {
            console.error(error);
          });
        alert("wow, get out of this page!")
      } else {
        const googleAuth = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(googleAuth);
      }
    });
  }

  if (window.location.hash){
    console.log(window.location.hash);
    if (window.location.hash == "#ru"){
      document.getElementById("togBtn").checked = true;
      document.getElementById("account").text = language.ru.account;
      document.getElementById("sign_label").innerHTML = language.ru.sign;
    }
    else{
      document.getElementById("togBtn").checked = false;
      document.getElementById("account").text = language.en.account;
      document.getElementById("sign_label").innerHTML = language.en.sign;
    }
  }