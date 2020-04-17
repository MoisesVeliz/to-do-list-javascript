let inputNewTask = document.querySelector('#input-new-task');
const btnNewTask = document.querySelector('#btn-new-task'),
	  bodyTask = document.querySelector('#body-task'),
	  btnEditTask = document.querySelector('#btn-edit-task');
	  
let newTask = '',
	flatEdit = false;

// Ecentos para crear una tarea nueva
btnNewTask.addEventListener('click', () => createTask());
inputNewTask.addEventListener('keyup', (event) => event.keyCode == 13 &&  !btnNewTask.classList.contains('hide') ? createTask(): false);

// Evento para borrar o editar tarea
bodyTask.addEventListener('click', event =>{

	task = event.target.parentNode.parentNode.parentNode;
	taskEdit = task.children[0].children[1].innerText;

	if( event.target.attributes[0].value === "fas fa-trash-alt" ){
		bodyTask.removeChild(task);
		checkTask();
	}else if ( event.target.attributes[0].value === "far fa-edit" ) {
		flatEdit = true;
		btnEditTask.classList.remove('hide');
		btnNewTask.classList.add('hide');
		inputNewTask.value = taskEdit;
		task.classList.add('editing');
	}
});

// Evento para guardar lo editado
btnEditTask.addEventListener('click', ()=> saveChanges());
inputNewTask.addEventListener('keyup', (event) => event.keyCode == 13 &&  btnNewTask.classList.contains('hide') ? saveChanges(): false);

// Funciones
const saveChanges =() => {
	document.querySelector('.editing').children[0].children[1].innerText = inputNewTask.value;
	document.querySelector('.editing').classList.remove('editing');
	btnEditTask.classList.add('hide');
	btnNewTask.classList.remove('hide');
	clearInput();
};

const createTask = () => {
	newTask = addTask();
	createElement( newTask );
	clearInput();
	checkTask();
};

const addTask = () => {
	if( !inputNewTask.value ) return;
	return inputNewTask.value;
};

const createElement = (element) => {
	if ( !element ) return;
	newElement = document.createElement('div');
	bodyTask.append(newElement);
	bodyTask.lastChild.classList.add('task');
	bodyTask.lastChild.innerHTML = `<label>
										<input type="checkbox" class="falled-in">
										<span>${ element }</span>
										<button class="btn-delete btn__task btn-floating btn-small waves-effect waves-light right"><i class="fas fa-trash-alt"></i></button>
										<button class="btn-edit btn__task btn-floating btn-small waves-effect waves-light right"><i class="far fa-edit"></i></button>	
									</label>
									<div class="divider"></div`;
};

// Esta funcion me verifia si tengo tareas, si no tengo tareas me da un mensaje de que no tendgo tareas disponivles.
const checkTask = () => bodyTask.children.length > 1 ? bodyTask.children[0].classList.add('hide') : bodyTask.children[0].classList.remove('hide');


const clearInput = () => inputNewTask.value = '';

const init = () => {
	checkTask();

};