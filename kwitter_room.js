
const firebaseConfig = {
  apiKey: "AIzaSyDygcF53D7XZ-ZdpM-dPn0daOEyTLMbRsY",
  authDomain: "starre-20af7.firebaseapp.com",
  databaseURL: "https://starre-20af7-default-rtdb.firebaseio.com",
  projectId: "starre-20af7",
  storageBucket: "starre-20af7.appspot.com",
  messagingSenderId: "497314364272",
  appId: "1:497314364272:web:ca10e2a4f638697a8dedb5",
  measurementId: "G-140TH0SR2Z"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");



function addRoom()
{
  room_name = document.getElementById("room_name").value;

  firebase.database().ref("/").child(room_name).update({
    purpose : "adding room name"
  });

    localStorage.setItem("room_name", room_name);
    
    window.location = "kwitter_page.html";
}



function send(){
  msg = document.getElementById("msg").value;
  firebase.database().ref(room_name).push({
      name:user_name,
      msg:msg,
      like:0
  });


  document.getElementById("msg").value = "";
}




function getData() { firebase.database().ref("/" + room_name).on('value', function(snapshot)
{document.getElementById ("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) {childKey = childSnapshot.key; childData = childSnapshot.val();
   if (childKey != "purpose"){
      firebase_message_id = childKey;
      menssage_data = childData;

      console.log(firebase_message_id);
      console.log(menssage_data);
      name = menssage_data ['name'];
      message = menssage_data ['message'];
      like = menssage_data ['like'];
      name_with_tag = " <h4>" + name + "<img class='user_tick' src='tick.png'></h4>";
      message_with_tag = "<h4 class='message_h4'+ message" + message + "</h4>";
      like_button = "<button class='btn btn-warning' id=" + firebase_message_id + "value="+like+"onclick='updateLike(this.id)'> ";
      span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like+ "</span></button><hr>";
      
      row = name_with_tag+message_with_tag+like_button+span_with_tag
      document .getElementById ("output"). innerHTML += row;
   }
});

});
}

getData()

function updateLike(message_id){

  console.log("clicked on like button -" + message_id);
  button.id = message_id;
  likes = document.getElementById(button_id).value;
  updated_likes = Number(likes) + 1;
  console.log(updated_likes);

  firebase.database().ref(room_name).child(message_id).update({
      like : updated_likes
  });
}



function redirectToRoomName(name){
  console.log(name);
  localStorage.setItem("room_name", name);
  window.location = "starrePage.html";
}

function logout()
{
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location = "index.html";
}