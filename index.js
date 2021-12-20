let arrItems = [];

let currentChange;
let flag = true;

function addItem() {
  var blur;
  if (flag) {
    blur = document.getElementById("blur");
  } else {
    blur = document.getElementById("listpage");
  }
  blur.classList.toggle("active");

  var popup = document.getElementById("popuplist");
  popup.classList.toggle("active");
}

function init() {
  if (flag) {
    document.getElementById("listpage").style.display = "none";
    document.getElementById("blur").style.display = "block";
  } else {
    document.getElementById("blur").style.display = "none";
    document.getElementById("listpage").style.display = "block";
  }
  if (arrItems.length === 0) {
    document.getElementById("noitems").style.display = "block";
  } else {
    console.log("inside");
    document.getElementById("noitems").style.display = "none";
  }
}

init();



function addtodo() {
  let heading = document.getElementById("entered").value;
  if (heading !== "") {
    const todo = {
      heading,
      completed: false,
      subTask: [],
      id: Date.now(),
    };
    arrItems.push(todo);
    addItem();
    back();
  }
}
function renderTodo(todo) {
  init();
  const list = document.querySelector(".listofblocks");
  var child = list.lastElementChild;
  while (child) {
    list.removeChild(child);
    child = list.lastElementChild;
  }

  for (let i = 0; i < arrItems.length; i++) {
    const node = document.createElement("div");
    node.setAttribute("class", `card`);
    node.setAttribute("data-key", arrItems[i].id);
    node.innerHTML = `<p class="card-heading" onclick="redirect(this)">${arrItems[i].heading}</p>
      <ul style="list-style-type:none;">
      </ul>
      <div class='edge'>
      <button class='removeblock' onclick="removeblock(this)"><i class="fa fa-trash" aria-hidden="true"></i></button>
      <p class='itemadd' onclick="addingitem(this)"><i class="fa fa-plus-circle"></i></p>
      </div>
      `;
    console.log(node.childNodes);
    list.append(node);
    let currentTodo = arrItems[i];
    for (let j = 0; j < currentTodo.subTask.length; j++) {
      let classToPut = currentTodo.subTask[j].marked
        ? "card-item card-item-checked"
        : "card-item";
      let rest = currentTodo.subTask[j].marked
        ? ""
        : '<button class = "markDone" onclick="markCompleted(this)">Mark Done</button>';
      const liNode = document.createElement("li");
      liNode.setAttribute("class", classToPut);
      liNode.setAttribute("data-key", currentTodo.subTask[j].id);
      liNode.innerHTML = ` ${currentTodo.subTask[j].name} ${rest}`;
      node.childNodes[2].append(liNode);
    }
  }
}

function markCompleted(element) {
  let classToPut = flag
    ? "card-item card-item-checked"
    : "card-item-2 card-item-checked";
  element.parentNode.setAttribute("class", classToPut);
  let id = element.parentNode.parentNode.parentNode.getAttribute("data-key");
  let subTaskId = element.parentNode.getAttribute("data-key");

  // Find in the todo array
  for (let i = 0; i < arrItems.length; i++) {
    if (arrItems[i].id == id) {
      for (let j = 0; j < arrItems[i].subTask.length; j++) {
        if (arrItems[i].subTask[j].id == subTaskId) {
          arrItems[i].subTask[j].marked = true;
        }
      }
    }
  }
  element.parentNode.removeChild(element);
}



function addtodoitem() {
  let taskHeading = document.getElementById("entereditem").value;
  if (taskHeading !== "") {
    let list;
    if (flag) {
      list = currentChange.parentNode.parentNode.childNodes[2];
    } else {
      list = currentChange.parentNode.parentNode.childNodes[3];
    }
    console.log(currentChange.parentNode, currentChange.parentNode.parentNode);
    let id = currentChange.parentNode.parentNode.getAttribute("data-key");
    console.log(currentChange.parentNode.parentNode);

    const node = document.createElement("li");
    node.setAttribute("class", flag ? `card-item` : `card-item-2`);
    node.setAttribute("data-key", Date.now());
    node.innerHTML = ` ${taskHeading}<button class = 'markDone' onclick="markCompleted(this)">Mark Done</button>`;

    let currentTodo;
    //Find in the todo array
    for (let i = 0; i < arrItems.length; i++) {
      if (arrItems[i].id == id) {
        arrItems[i].subTask.push({
          name: taskHeading,
          marked: false,
          id: node.getAttribute("data-key"),
        });
      }
    }

    list.append(node);
    addingitem();
  }
  console.log(arrItems);
}

function removeblock(element) {
  let tempElement = element.parentNode.parentNode;
  console.log(tempElement);

  //Find in the todo array and remove
  for (let i = 0; i < arrItems.length; i++) {
    if (arrItems[i].id == tempElement.getAttribute("data-key")) {
      arrItems.splice(i, 1);
    }
  }
  if (!flag) {
    back();
  } else {
    tempElement.parentNode.removeChild(tempElement);
    init();
  }
}





function addingitem(item) {
  currentChange = item;
  var blur;
  if (flag) {
    blur = document.getElementById("blur");
  } else {
    blur = document.getElementById("listpage");
  }
  blur.classList.toggle("active");

  var popup = document.getElementById("popupitem");
  popup.classList.toggle("active");
}

function redirect(element) {
  let id = element.parentNode.getAttribute("data-key");

  let currentTodo;
  //Find in the todo array
  for (let i = 0; i < arrItems.length; i++) {
    if (arrItems[i].id == id) {
      currentTodo = arrItems[i];
    }
  }
  flag = false;
  init();
  document.getElementById("pagehead").textContent = currentTodo.heading;
  document.getElementById("todohead").textContent = currentTodo.heading;
  document
    .getElementById("todohead")
    .parentNode.setAttribute("data-key", currentTodo.id);

  console.log(currentTodo);
  let e = document.getElementById("singleList");
  var child = e.lastElementChild;
  while (child) {
    e.removeChild(child);
    child = e.lastElementChild;
  }
  for (let i = 0; i < currentTodo.subTask.length; i++) {
    let classToPut = currentTodo.subTask[i].marked
      ? "card-item-2 card-item-checked"
      : "card-item-2";
    let rest = currentTodo.subTask[i].marked
      ? ""
      : '<button class = "markDone" onclick="markCompleted(this)">Mark Done</button>';
    const node = document.createElement("li");
    node.setAttribute("class", classToPut);
    node.setAttribute("data-key", currentTodo.subTask[i].id);
    node.innerHTML = ` ${currentTodo.subTask[i].name} ${rest}`;
    e.append(node);
  }
}

function back() {
  flag = true;
  renderTodo();
}