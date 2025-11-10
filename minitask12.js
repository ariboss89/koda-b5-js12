const url = "https://jsonplaceholder.typicode.com/users";

const arrUser = [];
const arrUser2 = [];

fetch(url)
  .then(function (result) {
    if(!result.ok){
      throw new Error(`${result.status} ${result.statusText}`);
    }
    return result.json();
  })
  .then(function (body) {
    processUserData(body);
    toLowerCase(body);
  })
  .catch((error) => {
    console.log(error);
  });

async function requestDataAsync() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error.message);
  }
}

//Using built in method
async function processUserData(data) {
  for (let a = 0; a < data.length; a++) {
    let email = data[a].email.toLowerCase();
    let nama = data[a].name.toLowerCase();
    let city = data[a].address["city"];

    const obj = {
      name:nama,
      email:email,
      city:city
    }

    arrUser.push(obj);
  }

  console.log(arrUser);
}

processUserData(await requestDataAsync());

//Check string using loop
function checkString(data){
  let hasil = "";
  let lower;

  for (let b = 0; b < data.length; b++) {
      let res = data[b].charCodeAt(data[b]);

      if (res >= 65 && res <= 90) {
        lower = res + 32;
        hasil += String.fromCharCode(lower);
      } else {
        hasil += String.fromCharCode(res);
      }
    }
    return hasil;
}

//Check lowercase without built in method
async function toLowerCase(data) {
  for (let a = 0; a < data.length; a++) {
    let theEmail = data[a].email;
    let nama = data[a].name;
    let city = data[a].address["city"];

    const user = {name:checkString(nama),
      email:checkString(theEmail),
      city:checkString(city)
    }
    arrUser2.push(user);
  }
  console.log(arrUser2);
}

toLowerCase(await requestDataAsync());
