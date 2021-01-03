class todo {
  constructor() {
    this.allItems = [];
  }

  addNewTask(description, status) {
    this.allItems.push({
      description: description,
      status: status,
    });

    this.renderNewTask(description, status);
    this.updateItemsLeft();
  }

  renderNewTask(description, status) {
  
      document.getElementById("todo-items").insertAdjacentHTML(
        "beforeend",
        `
    <div class="item-group item-${status.toLowerCase()}" name=item-div${this.allItems.length}>
            <div> 
              <input type="checkbox" id=checkbox${this.allItems.length} onclick="onChecked(this)" />
              <label  for=checkbox${this.allItems.length}>${description}</label>
            </div>
            <img src="images/icon-cross.svg" alt="" onclick="task.removeTask(this)"/>
          </div>
    `
      );
        
  }

  removeTask(target) {
    document.getElementById("todo-items").removeChild(target.parentElement);

    const itemStatus = target.parentElement.children[0].children[0].getAttribute(
      "class"
    );
    const itemLabel = target.parentElement.children[0].children[1].textContent;

    this.allItems.map((element, index) => {
      if (element.description == itemLabel) {
        this.allItems.splice(index, 1);
      }
    });

    this.updateItemsLeft();
  }

  updateItemsLeft() {
    const activeItems = this.allItems.filter(
      (element) => element.status == "Active"
    );
    document.getElementById(
      "items-left"
    ).innerHTML = `${activeItems.length} items left`;
  }

  completItem(label) {
    this.allItems.map((element) => {
      if (element.description == label) {
        element.status = "Completed";
      }
    });
    this.updateItemsLeft();
  }

  activeItem(label) {
    this.allItems.map((element) => {
      if (element.description == label) {
        element.status = "Active";
      }
    });
    this.updateItemsLeft();
  }

  filterTasks(status){
    if(status != 'All'){
      const activeItems = this.allItems.filter(element => element.status == status)
            console.log(activeItems);
            document.getElementById("todo-items").innerHTML = ""
            activeItems.forEach(element => {
                document.getElementById("todo-items").insertAdjacentHTML(
                    "beforeend",
                    `
                <div class="item-group item-${status.toLowerCase()}" name=item-div${activeItems.length}>
                        <div> 
                          <input type="checkbox"  id=checkbox${activeItems.length} onclick="onChecked(this)" />
                          <label for=checkbox${activeItems.length}>${element.description}</label>
                        </div>
                        <img src="images/icon-cross.svg" alt="" onclick="task.removeTask(this)"/>
                      </div>
                `
                )
            })
    }else{
              document.getElementById("todo-items").innerHTML = ""
            this.allItems.forEach(element => {
                document.getElementById("todo-items").insertAdjacentHTML(
                    "beforeend",
                    `
                <div class="item-group item-${element.status.toLowerCase()}" name=item-div${this.allItems.length}>
                        <div> 
                          <input type="checkbox"  id=checkbox${this.allItems.length} onclick="onChecked(this)" />
                          <label for=checkbox${this.allItems.length}>${element.description}</label>
                        </div>
                        <img src="images/icon-cross.svg" alt="" onclick="task.removeTask(this)"/>
                      </div>
                `
                )
            })
    }
  }

  clearCompleted(){
    document.getElementById("todo-items").innerHTML = ""
    this.allItems.forEach(element => {
      element.status = "Active"
      document.getElementById("todo-items").insertAdjacentHTML(
        "beforeend",
        `
    <div class="item-group item-${element.status.toLowerCase()}" name=item-div${this.allItems.length}>
            <div> 
              <input type="checkbox"  id=checkbox${this.allItems.length} onclick="onChecked(this)" />
              <label for=checkbox${this.allItems.length}>${element.description}</label>
            </div>
            <img src="images/icon-cross.svg" alt="" onclick="task.removeTask(this)"/>
          </div>
    `
    )
    })
    this.updateItemsLeft()
  }

}

const task = new todo();

document.getElementById("todo-form").onsubmit = function (e) {
  e.preventDefault();

  const formInfo = new FormData(document.getElementById("todo-form"));

  if (formInfo.get("checkbox-form")) {
    task.addNewTask(formInfo.get("text-form"), "Completed");
  } else {
    task.addNewTask(formInfo.get("text-form"), "Active");
  }

  resetForm()

};

document.getElementsByName("all-filter").forEach((element) => {
  element.onclick = function (e) {
    document
      .getElementsByName("active-filter")[0]
      .classList.remove("active-item");
    document
      .getElementsByName("active-filter")[1]
      .classList.remove("active-item");
    document
      .getElementsByName("completed-filter")[0]
      .classList.remove("active-item");
    document
      .getElementsByName("completed-filter")[1]
      .classList.remove("active-item");

    document
      .getElementsByName("all-filter")[0]
      .setAttribute("class", "pointer active-item");
    document
      .getElementsByName("all-filter")[1]
      .setAttribute("class", "pointer active-item");
      task.filterTasks('All')
  };
});

document.getElementsByName("active-filter").forEach((element) => {
  element.onclick = function (e) {
    document.getElementsByName("all-filter")[0].classList.remove("active-item");
    document.getElementsByName("all-filter")[1].classList.remove("active-item");
    document
      .getElementsByName("completed-filter")[0]
      .classList.remove("active-item");
    document
      .getElementsByName("completed-filter")[1]
      .classList.remove("active-item");

    document
      .getElementsByName("active-filter")[0]
      .setAttribute("class", "pointer active-item");
    document
      .getElementsByName("active-filter")[1]
      .setAttribute("class", "pointer active-item");
      task.filterTasks('Active')
  };

});

document.getElementsByName("completed-filter").forEach((element) => {
  element.onclick = function (e) {
    document.getElementsByName("all-filter")[0].classList.remove("active-item");
    document.getElementsByName("all-filter")[1].classList.remove("active-item");
    document
      .getElementsByName("active-filter")[0]
      .classList.remove("active-item");
    document
      .getElementsByName("active-filter")[1]
      .classList.remove("active-item");

    document
      .getElementsByName("completed-filter")[0]
      .setAttribute("class", "pointer active-item");
    document
      .getElementsByName("completed-filter")[1]
      .setAttribute("class", "pointer active-item");
      task.filterTasks('Completed')
  };
});

document.getElementById('clear-completed').onclick = function(e){
  task.clearCompleted()
}

function onChecked(checkbox) {
  const label = checkbox.parentElement.children[1];
  const itemDiv = checkbox.parentElement.parentElement
  if (itemDiv.classList[0] != "todo-main"){
    console.log(task.allItems);
    if (itemDiv.classList[1] == "item-active") {
      itemDiv.setAttribute('class', 'item-group item-completed')
      task.completItem(label.textContent);
    } else {
      itemDiv.setAttribute('class', 'item-group item-active')
      task.activeItem(label.textContent);
    }
  }else{
    if (itemDiv.classList[1] == "item-active") {
      itemDiv.setAttribute('class', 'todo-main item-completed')
    } else {
      itemDiv.setAttribute('class', 'todo-main item-active')
    }
  }
}

function resetForm(){
    document.getElementById("todo-form").reset();
    document
      .getElementsByClassName("todo-main")[0].setAttribute('class', 'todo-main item-active')
}