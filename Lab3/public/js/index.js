function on_load(){
    link = document.getElementById('account');
    total = 0;
    minus = 0;
    plus = 0;
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
        firebase.database().ref('users/' + user.uid + '/owes').once('value', (snapshot) => {
            snapshot.forEach((childSnapshot) => {
            li = document.createElement("li");
            a = document.createElement("a");
            a.appendChild(document.createTextNode(childSnapshot.val().event));
            a.href = "item.html?id=" + childSnapshot.key;
            li.appendChild(a);
            if (childSnapshot.val().sign == '+'){
                list = document.getElementById("plus_list");
                list.appendChild(li);
                plus += childSnapshot.val().difference;
            }
            else{
                list = document.getElementById("minus_list");
                list.appendChild(li);
                minus += childSnapshot.val().difference;
            }
            });
            document.getElementById("plus_label").innerHTML = minus.toFixed(2);
            document.getElementById("minus_label").innerHTML = plus.toFixed(2);
            document.getElementById("total_label").innerHTML = (plus - minus).toFixed(2);
        });
        } else {
        const googleAuth = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(googleAuth);
        }
    });
    if (window.location.hash){
        console.log(window.location.hash);
        if (window.location.hash == "#ru"){
          document.getElementById("togBtn").checked = true;
          document.getElementById("account").text = language.ru.account;
          document.getElementById("dashboard").innerHTML = language.ru.dashboard;
          document.getElementById("create_owe").textContent = language.ru.create_owe;
          document.getElementById("you_label").innerHTML = language.ru.you_owe;
          document.getElementById("total_owe_label").innerHTML = language.ru.total_owe;
          document.getElementById("you_are_label").innerHTML = language.ru.you_are_owed;
          document.getElementById("you_list").innerHTML = language.ru.you_owe;
          document.getElementById("you_are_list").innerHTML = language.ru.you_are_owed;
        }
        else{
          document.getElementById("togBtn").checked = false;
          document.getElementById("account").text = language.en.account;
          document.getElementById("dashboard").innerHTML = language.en.dashboard;
          document.getElementById("create_owe").textContent = language.en.create_owe;
          document.getElementById("you_label").innerHTML = language.en.you_owe;
          document.getElementById("total_owe_label").innerHTML = language.en.total_owe;
          document.getElementById("you_are_label").innerHTML = language.en.you_are_owed;
          document.getElementById("you_list").innerHTML = language.en.you_owe;
          document.getElementById("you_are_list").innerHTML = language.en.you_are_owed;
        }
    }
}