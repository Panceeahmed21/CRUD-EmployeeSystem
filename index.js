var empName = document.getElementById("empName");
var empEmail = document.getElementById("empEmail");
var empAddress = document.getElementById("empAddress");
var empPhone = document.getElementById("empPhone");
var saveBtn = document.getElementById("saveBtn");
var updateBtn = document.getElementById("updateBtn");
var deleteAllBtn = document.getElementById("deleteAll");
var warningEmpty = document.getElementById("warningEmpty");

warningEmpty.style.display = "none";
updateBtn.style.display = "none";

var empID;

var myModal = new bootstrap.Modal(document.getElementById("exampleModal"));

var nameRegex = /^[A-Za-z ]{5,35}$/;
var emailRegex = /^[a-z0-9._%+-]{5,20}@[a-z]{5,10}\.com$/;
var addressRegex = /^[A-Za-z0-9 ,]{3,50}$/;
var phoneRegex = /^01[0125][0-9]{8}$/;

saveBtn.addEventListener("click", function () {
  addEmployee();
});
updateBtn.addEventListener("click", function () {
  updateEmpValues();
  saveBtn.style.display = "block";
  updateBtn.style.display = "none";
  empty();
});

deleteAllBtn.addEventListener("click", function () {
  deleteAllFn();
});

var empList = [];

if (localStorage.getItem("empList") != null) {
  empList = JSON.parse(localStorage.getItem("empList"));
  displayEmployees(empList);
}

function addEmployee() {
  if (checkNotEmpty() == true) {
    if (
      checkName(nameRegex, empName.value) == true &&
      checkEmail(emailRegex, empEmail.value) == true &&
      checkAddress(addressRegex, empAddress.value) == true &&
      checkPhone(phoneRegex, empPhone.value) == true
    ) {
      var emp = {
        name: empName.value,
        email: empEmail.value,
        address: empAddress.value,
        phone: empPhone.value,
      };

      empList.push(emp);
      displayEmployees(empList);
      localStorage.setItem("empList", JSON.stringify(empList));
      empty();
      myModal.hide();
    }
  }
}

function displayEmployees(empList) {
  if (empList.length == 0) {
    document.getElementById("tbody").innerHTML = "";
  }
  var cartona = ``;

  for (var i = 0; i < empList.length; i++) {
    cartona += `
        <tr>
                            <td>${empList[i].name}</td>
                            <td>${empList[i].email}</td>
                            <td>${empList[i].address}</td>
                            <td>${empList[i].phone}</td>
                            <td>
                                <button class="btn " onclick=updateEmp(${i}) data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa fa-edit fs-5 text-warning "></i></button>
                                <button class="btn  " onclick=deleteEmp(${i})><i class="fa fa-trash fs-5 text-danger"></i></button>


                            </td>
                        </tr>
 `;
    document.getElementById("tbody").innerHTML = cartona;
  }
}

function deleteEmp(id) {
  empList.splice(id, 1);
  displayEmployees(empList);
  localStorage.setItem("empList", JSON.stringify(empList));
}

function updateEmp(id) {
  empID = id;
  empAddress.value = empList[id].address;
  empEmail.value = empList[id].email;
  empName.value = empList[id].name;
  empPhone.value = empList[id].phone;
  updateBtn.style.display = "block";
  saveBtn.style.display = "none";
  updateEmpValues();
}

function updateEmpValues() {
  empList[empID] = {
    name: empName.value,
    email: empEmail.value,
    address: empAddress.value,
    phone: empPhone.value,
  };
  displayEmployees(empList);
  localStorage.setItem("empList", JSON.stringify(empList));
}

function deleteAllFn() {
  empList = [];
  displayEmployees(empList);
  localStorage.setItem("empList", JSON.stringify(empList));
}
function empty() {
  empAddress.value = "";
  empEmail.value = "";
  empName.value = "";
  empPhone.value = "";
}

function checkNotEmpty() {
  if (
    empAddress.value == "" ||
    empEmail.value == "" ||
    empPhone.value == "" ||
    empName.value == ""
  ) {
    warningEmpty.style.display = "block";
    return false;
  } else {
    warningEmpty.style.display = "none";
    return true;
  }
}

function checkName(regex, value) {
  if (regex.test(value) == true) {
    document.getElementById("nameMsg").innerHTML = "";

    return true;
  } else {
    document.getElementById("nameMsg").innerHTML =
      "Should be characters at least 5 and at most 35 characters";
    return false;
  }
}

function checkEmail(regex, value) {
  if (regex.test(value) == true) {
    document.getElementById("emailMsg").innerHTML = "";

    return true;
  } else {
    document.getElementById("emailMsg").innerHTML = "Invalid email format";
    return false;
  }
}
function checkAddress(regex, value) {
  if (regex.test(value) == true) {
    document.getElementById("addressMsg").innerHTML = "";

    return true;
  } else {
    document.getElementById("addressMsg").innerHTML = "Invalid address format";
    return false;
  }
}

function checkPhone(regex, value) {
  if (regex.test(value) == true) {
    document.getElementById("phoneMsg").innerHTML = "";

    return true;
  } else {
    document.getElementById("phoneMsg").innerHTML = "Invalid phone format";
    return false;
  }
}
