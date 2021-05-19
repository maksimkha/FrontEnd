function google_sign(){
    link = document.getElementById('account');
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
          link.href = 'account.html';
          document.getElementById('name_field').value = user.displayName;
          document.getElementById('email_field').value = user.email;
          document.getElementById('photo_field').setAttribute("src", user.photoURL)
      } else {
        const googleAuth = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(googleAuth);
      }
    });
  }
  window.onload = google_sign;

  if (window.location.hash){
    console.log(window.location.hash);
    if (window.location.hash == "#ru"){
      document.getElementById("togBtn").checked = true;
      document.getElementById("account").text = language.ru.account;
      document.getElementById("acc_h").innerHTML = language.ru.account;
      document.getElementById("name_label").innerHTML = language.ru.name;
      document.getElementById("email_label").innerHTML = language.ru.email;
    }
    else{
      document.getElementById("togBtn").checked = false;
      document.getElementById("account").text = language.en.account;
      document.getElementById("acc_h").innerHTML = language.en.account;
      document.getElementById("name_label").innerHTML = language.en.name;
      document.getElementById("email_label").innerHTML = language.en.email;
    }
  }