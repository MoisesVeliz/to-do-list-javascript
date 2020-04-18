let inputNewTask = document.querySelector('#input-new-task');
const btnNewTask = document.querySelector('#btn-new-task'),
	  bodyTask = document.querySelector('#body-task'),
	  btnEditTask = document.querySelector('#btn-edit-task'),
	  buttonDisabled = document.querySelector('#button-disabled'),
	  headerTitle = document.querySelector('.header__title'),
	  headerInput = document.querySelector('.header__input');
	  
let newTask = '',
	flatTasksUnfinished = true;

// Evento para cambiar el titulo de mi tarea
headerTitle.addEventListener('click', ()=>{
	headerInput.children[1].innerText = headerTitle.innerText;
	headerInput.classList.remove('hide');
	headerTitle.classList.add('hide');
});
headerInput.children[0].addEventListener('blur',()=>{
	if( !headerInput.children[0].value ) return;
	editTitleList();
});
headerInput.children[0].addEventListener('keyup',(event)=>{
	if( !headerInput.children[0].value ) return;
	if( event.keyCode == 13 ) editTitleList();
});

// Eventos para crear una tarea nueva.
btnNewTask.addEventListener('click', () => createTask());
inputNewTask.addEventListener('keyup', (event) => event.keyCode == 13 &&  !btnNewTask.classList.contains('hide') ? createTask(): false);

// Evento para borrar o editar tarea
bodyTask.addEventListener('click', event =>{
	// Esta variable me almacena el contenedoor de las tareas
	taskParent = event.target.parentNode.parentNode.parentNode;

	// Esta Condiional me indica que si no existe un nodo no me ejecutes ese codigo.
	if( taskParent.children[0].children[1] ){
		taskEdit = taskParent.children[0].children[1].innerText;

		if( event.target.attributes[0].value === "fas fa-trash-alt" ){
			bodyTask.removeChild(taskParent);
			checkTask();
		}else if ( event.target.attributes[0].value === "far fa-edit" ) {
			btnEditTask.classList.remove('hide');
			btnNewTask.classList.add('hide');
			inputNewTask.value = taskEdit;
			taskParent.classList.add('editing');
			activeDisabled();
		}	
	}
	flatTasksUnfinished = checkTaskFinish();
	checkTask();
});

// Evento para guardar Las tareas editadas.
btnEditTask.addEventListener('click', ()=> {
	saveChanges();
	activeDisabled();
});
inputNewTask.addEventListener('keyup', (event) => {
	if( event.keyCode == 13 &&  btnNewTask.classList.contains('hide') ) {
		saveChanges();
		activeDisabled();
	}
});


// Funciones-----------------------------
const checkTaskFinish =()=>{
	let tasksFinish = 0;
	let tasksUnfinished = 0;
	document.querySelectorAll('.falled-in').forEach(checkbox =>{
		switch ( checkbox.checked ) {
				case true:
					tasksFinish++;
					break;
				case false:
					tasksUnfinished++;
					break;
			}	
	});
	return document.querySelectorAll('.falled-in').length - tasksFinish;
}
const activeDisabled =()=>{
	const btnsArray = bodyTask.querySelectorAll('button');
	btnsArray.forEach(btn =>{
		btn.classList.toggle('disabled');
	});
}

const addTask = () => {
	if( !inputNewTask.value ) return;
	return inputNewTask.value;
}

// Esta funcion me verifia si tengo tareas, si no tengo tareas me da un mensaje de que no tengo tareas disponibles.
const checkTask = () =>{
	if(bodyTask.children.length > 3) bodyTask.children[0].classList.add('hide')
	else bodyTask.children[0].classList.remove('hide');

	if( bodyTask.children.length < 4 || flatTasksUnfinished === 0) bodyTask.children[1].classList.add('hide');
	else bodyTask.children[1].classList.remove('hide');

	if( flatTasksUnfinished > 0 || bodyTask.children.length < 4 ) bodyTask.children[2].classList.add('hide');
	else bodyTask.children[2].classList.remove('hide');
} 
checkTask();

const createElement = (element) => {
	if ( !element ) return;
	newElement = document.createElement('div');
	bodyTask.append(newElement);
	bodyTask.lastChild.classList.add('task');
	bodyTask.lastChild.innerHTML = `<label>
										<input type="checkbox" class="falled-in" value="false">
										<span>${ element }</span>
										<button class="btn-delete btn__task btn-floating btn-small waves-effect waves-light right"><i class="fas fa-trash-alt"></i></button>
										<button class="btn-edit btn__task btn-floating btn-small waves-effect waves-light right"><i class="far fa-edit"></i></button>	
									</label>
									<div class="divider"></div`;
}

const createTask = () => {
	newTask = addTask();
	createElement( newTask );
	clearInput();
	flatTasksUnfinished = true;
	checkTask();
}

const clearInput = () => inputNewTask.value = '';

const editTitleList = ()=> {
	headerTitle.innerText = headerInput.children[0].value;
	headerInput.classList.add('hide');
	headerTitle.classList.remove('hide');
}
	
const saveChanges =() => {
	document.querySelector('.editing').children[0].children[1].innerText = inputNewTask.value;
	document.querySelector('.editing').classList.remove('editing');
	btnEditTask.classList.add('hide');
	btnNewTask.classList.remove('hide');
	clearInput();
}
