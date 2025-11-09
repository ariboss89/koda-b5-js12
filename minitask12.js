const url = "https://jsonplaceholder.typicode.com/users";

const arrEmail = [];
const arrEmail2 = [];

fetch(url)
  .then(function (result) {
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

async function processUserData(data) {
  for (let a = 0; a < data.length; a++) {
    let email = data[a].email.toLowerCase();
    arrEmail.push(email);
  }

  console.log(arrEmail);
}

processUserData(await requestDataAsync());

async function toLowerCase(data) {
  let lower;
  let hasil = "";

  for (let a = 0; a < data.length; a++) {
    let theEmail = data[a].email;

    for (let b = 0; b < theEmail.length; b++) {
      let res = theEmail[b].charCodeAt(theEmail[b]);

      if (res >= 65 && res <= 90) {
        lower = res + 32;
        hasil += String.fromCharCode(lower);
      } else {
        hasil += String.fromCharCode(res);
      }
    }
    arrEmail2.push(hasil);
    hasil = "";
  }

  console.log(arrEmail2);
}

toLowerCase(await requestDataAsync());
