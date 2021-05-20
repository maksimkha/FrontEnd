firebaseConfig = {
      apiKey: "AIzaSyAWvNOTYJukkw1xlWldjHt5J1AeYrq7YHU",
      authDomain: "agrexa-60b32.firebaseapp.com",
      databaseURL: "https://agrexa-60b32-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "agrexa-60b32",
      storageBucket: "agrexa-60b32.appspot.com",
      messagingSenderId: "491305025442",
      appId: "1:491305025442:web:6d9eb47e57a885eb873cfb",
      measurementId: "G-54X7KPELH0"
    };
  firebase.initializeApp(firebaseConfig);
  language = {
    en: {
      "account": "Account",
      "dashboard": "Dashboard",
      "create_owe": "Create owe",
      "you_owe": "You owe: ",
      "total_owe": "Total balance: ",
      "you_are_owed": "You are owed: ",
      "owe_page": "Owe page",
      "event": "Event: ",
      "category": "Category: ",
      "check_amount": "Check amount: ",
      "photo": "Photo(opt.): ",
      "method": "Split method:",
      "edit": "Edit",
      "save": "Save",
      "add": "Add",
      "delete": "Delete",
      "me": "Me",
      "category_opt":{
        "entertaimant": "Entertaimant",
        "fnd": "Food and drink",
        "home": "Home",
        "life": "Life",
        "utility": "Utility",
        "others": "Others"
      },
      "method_opt":{
        "amounts": "Amounts",
        "equal": "Equal"
      },
      "sign": "Sign in with: ",
      "owe_page": "Owe page: ",
      "name": "Name: ",
      "email": "Email: ",
      "expence": "Add an expence",
    },
    ru: {
      "account": "Аккаунт",
      "dashboard": "Панель",
      "create_owe": "Создать чек",
      "you_owe": "Вы должны: ",
      "total_owe": "Баланс: ",
      "you_are_owed": "Вам должны: ",
      "owe_page": "Страница траты",
      "event": "Событие: ",
      "category": "Категория: ",
      "check_amount": "Счет: ",
      "photo": "Фото(опц.): ",
      "method": "Дележка: ",
      "edit": "Изменить",
      "save": "Сохранить",
      "add": "Добавить",
      "delete": "Удалить",
      "me": "Я",
      "category_opt":{
        "entertaimant": "Развлечение",
        "fnd": "Еда и напитки",
        "home": "Дом",
        "life": "Жизнь",
        "utility": "Утилити",
        "others": "Другое"
      },
      "method_opt":{
        "amounts": "Величины",
        "equal": "Поравну"
      },
      "sign": "Войти с помощью: ",
      "owe_page": "Страница траты: ",
      "name": "Имя: ",
      "email": "E-мэйл: ",
      "expence": "Добавить трату",
    }
  };
function change_lng(){
  user = firebase.auth().currentUser;
  btn = document.getElementById("togBtn");
  if (btn.checked == true){
      location.href = hash = "#ru";
  }
  else{
      location.href = hash ="#en";
  }
  firebase.database().ref("users/" + user.uid + "/language/").set(hash);
  location.reload();
}