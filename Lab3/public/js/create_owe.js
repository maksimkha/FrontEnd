async function set_names(){
    user = firebase.auth().currentUser;
    friends = []
    await firebase.database().ref("users/" + user.uid + "/friends").once('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            friends.push(childSnapshot.val().name);
        });
    }).catch((error) => {
        console.error(error);
    });
    options = '';
    datalists = document.getElementsByName("user_datalist");
    for (j = 1; j <= datalists.length; j++){
        for (i = 0; i < friends.length; i++) {
            options += '<option value="' + friends[i] + '" />';
        }
        document.getElementById('friends'+j).innerHTML = options;
    }
}

function on_load(){
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
            set_names()
            link.href = 'account.html';
        } 
        else {
            const googleAuth = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(googleAuth);
        }
    });
    if (window.location.hash){
        console.log(window.location.hash);
        if (window.location.hash == "#ru"){
          document.getElementById("togBtn").checked = true;
          document.getElementById("account").text = language.ru.account;
          document.getElementById("exp_h").innerHTML = language.ru.expence;
          document.getElementById("event_label").innerHTML = language.ru.event;
          document.getElementById("category_label").innerHTML = language.ru.category;
          document.getElementById("check_amount_label").innerHTML = language.ru.check_amount;
          document.getElementById("photo_label").innerHTML = language.ru.photo;
          document.getElementById("method_label").innerHTML = language.ru.method;
          document.getElementById("addition").innerHTML = language.ru.add;
          document.getElementById("delete").innerHTML = language.ru.delete;
          document.getElementById("saveBtn").innerHTML = language.ru.save;
          document.getElementById("me_field").value = language.ru.me;
          change_category_options('ru');
        }
        else{
          document.getElementById("togBtn").checked = false;
          document.getElementById("account").text = language.en.account;
          document.getElementById("exp_h").innerHTML = language.en.expence;
          document.getElementById("event_label").innerHTML = language.en.event;
          document.getElementById("category_label").innerHTML = language.en.category;
          document.getElementById("check_amount_label").innerHTML = language.en.check_amount;
          document.getElementById("photo_label").innerHTML = language.en.photo;
          document.getElementById("method_label").innerHTML = language.en.method;
          document.getElementById("addition").innerHTML = language.en.add;
          document.getElementById("delete").innerHTML = language.en.delete;
          document.getElementById("saveBtn").innerHTML = language.en.save;
          document.getElementById("me_field").value = language.en.me;
          change_category_options('en');
        }
      }
  }

async function save_owe() {
    user = firebase.auth().currentUser;
    names = document.getElementsByName("user_name");
    amounts = document.getElementsByName("user_amount");
    medium_amount = document.getElementById("amount").value / (names.length);
    dict = {};
    for (i = 0; i < names.length; i++){
      dict[names[i].value] = amounts[i].value;
    }
    sign = '';
    if (amounts[0].value > medium_amount){
      sign = '+';
    }
    else{
      sign = '-';
    }
    photo = true;
    if (document.getElementById("photo").value == '') photo = false;
    console.log("saving to db");
    console.log(user);
    category_opt = document.getElementById("category")
    method_opt = document.getElementById("method")
    if (user) {
      console.log("saving entity");
      key = await firebase.database().ref('users/'+ user.uid + '/owes').push({
        event: document.getElementById("event").value,
        category: category_opt.options[category_opt.selectedIndex].id,
        amount: document.getElementById("amount").value,
        method: method_opt.options[method_opt.selectedIndex].id,
        owes: dict,
        sign: sign,
        photo: photo,
        difference: Math.abs(medium_amount - amounts[0].value)
      }).getKey();
      console.log("saving photo");
      uploadTask = await firebase.storage().ref('users/'+ user.uid + '/owes/' + key).put(document.getElementById("photo").files[0]).then((snapshot) => {
          console.log('Uploaded a blob or file!');
      });
      console.log("saving friends");
      friends = []
      for (i = 1; i < names.length; i++){
        friends.push(names[i].value);
      }
      await firebase.database().ref("users/" + user.uid + "/friends").once('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            friends = friends.filter(function(e) { return e !== childSnapshot.val().name })
        });
      }).catch((error) => {
        console.error(error);
      });
      console.log(friends)
      for (i = 0; i < friends.length; i++){
        await firebase.database().ref('users/'+ user.uid + '/friends').push({
            name: friends[i]
        })
      }
      window.location.href = "index.html";
    }
}

function set_medium(){
    method = document.getElementById("method").value;
    names = document.getElementsByName("user_name");
    amounts = document.getElementsByName("user_amount");
    if (method == "Equal"){
      medium_amount = document.getElementById("amount").value / (names.length);
      for (i = 0; i < amounts.length; i++){
        amounts[i].value = medium_amount;
      }
    }
}

function add_input() {
    names = document.getElementsByName("user_name");
    number = names.length - 1
    method = document.getElementById("method").value;
    div = document.createElement('div');
    div.className = "create-form__line-container"
    if (method == "Equal"){
        div.innerHTML = "<input list='friends" + number +"' name='user_name' autocomplete='off'/><datalist id='friends" + number +"' name='user_datalist'></datalist><label>-</label><input name='user_amount' type='number' value=0 readonly>"
    }
    else{
        div.innerHTML = "<input list='friends" + number +"' name='user_name' autocomplete='off'/><datalist id='friends" + number +"' name='user_datalist'></datalist><label>-</label><input name='user_amount' type='number'>"
    }
    saveBtn = document.getElementById("saveBtn");
    form = document.getElementById("create-form");
    form.insertBefore(div, saveBtn);
    set_medium();
}

function delete_input() {
    divs = document.getElementsByClassName("create-form__line-container");
    to_del = divs[divs.length - 1];
    if (divs.length > 8)
      to_del.remove();
    names = document.getElementsByName("user_name");
    amounts = document.getElementsByName("user_amount");
    if (method == "Equal"){
      medium_amount = document.getElementById("amount").value / (names.length);
      for (i = 0; i < amounts.length; i++){
        amounts[i].value = medium_amount;
      }
    }
}

function paid_method() {
    method = document.getElementById("method").value;
    names = document.getElementsByName("user_name");
    amounts = document.getElementsByName("user_amount");
    if (method == "Equal" || method == "Поравну"){
        medium_amount = document.getElementById("amount").value / (names.length);
        for (i = 0; i < amounts.length; i++){
          amounts[i].value = medium_amount;
          amounts[i].readOnly = true;
        }
      }
      else if (method == "Amounts" || method == "Величины"){
        for (i = 0; i < amounts.length; i++){
          amounts[i].readOnly = false;
        }
      }
}

function change_category_options(lang){
    cat_select = document.getElementById("category");
    met_select = document.getElementById("method");
    if (lang == 'en'){
      ans = language.en.category_opt;
      methods = language.en.method_opt;
    }
    else{
      ans = language.ru.category_opt;
      methods = language.ru.method_opt;
    }
    i = 0
    for (const [key, value] of Object.entries(ans)) {
      cat_select.options[i].innerText = value;
      i++;
    }
    i = 0
    for (const [key, value] of Object.entries(methods)) {
      met_select.options[i].innerText = value;
      i++;
    }
}
