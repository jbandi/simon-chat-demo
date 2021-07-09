console.log("Hallo?");

function igMacheÖppis() {

  const meldungTextFeld = document.getElementById('meldungText');
  const meldungText = meldungTextFeld.value;
  console.log("Ig ha öppis gmacht!", meldungText);


  // fetch("http://localhost:4567/message", {method: 'POST', body: meldungText})
  //   .then(r => r.text())
  //   .then(function (text){
  //     console.log('Response', text);
  //     let liste = document.getElementById('responseList');
  //     let newListItem = document.createElement('li');
  //     newListItem.textContent = text;
  //     liste.appendChild(newListItem);
  //   })

  chatSocket.send(meldungText);
}


document
  .getElementById("drButton")
  .addEventListener("click", igMacheÖppis);


const HOST = location.origin.replace(/^http/, 'ws')
const chatSocket = new WebSocket(HOST);
// const chatSocket = new WebSocket("wss://agile-tundra-14652.herokuapp.com:8080");
chatSocket.onmessage = function (event) {
  console.log(event.data);
  const text = event.data;
  let liste = document.getElementById('responseList');
  let newListItem = document.createElement('li');
  newListItem.textContent = text;
  liste.appendChild(newListItem);
}

// setTimeout(() => alert("Test"), 2000);
//
// alert("Gugus");
