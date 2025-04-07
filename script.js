const addBtn = document.querySelector('.add-task');
const save = document.querySelector('.save');
const close = document.querySelector('.cancel');
const taskInput = document.getElementById('task');
const taskDesc = document.getElementById('description');
const modalForm = document.querySelector('.modal-content');
const modal = document.querySelector('.modal');
const taskContainer = document.querySelector('.task-container');

let taskArr = [];

//Modal for add button
addBtn.addEventListener('click', () => {
    modal.style.display = 'block';
    taskInput.focus();
});

//For submitting the content of the modal for
modalForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const tasktitle = taskInput.value;
    const description = taskDesc.value;

    if (tasktitle === '') {
        alert('Please fill in the task title!');
        return;
    }
    taskArr.push({ task: tasktitle, description: description, completed: false });
    taskInput.value = '';
    taskDesc.value = '';
    modal.style.display = 'none';

    renderCard();
});

//For creating task card
const createTaskCard = (task, index) => {
    const taskCard = document.createElement('div');
    taskCard.classList.add('task-card');

    if (task.completed) {
        taskCard.classList.add('completed');
    }

    taskCard.innerHTML = `
        <div>
            <h2>Task${taskArr.indexOf(task) + 1}</h2>
            <h3>Title: ${task.task}</h3>
            <p>Description: ${task.description}</p>
            <div>
                <button class="complete">${task.completed ? 'Incomplete' : 'Complete'}</button>
                <button class="delete">Delete</button>
            </div>
        </div>
    `
    const completeBtn = taskCard.querySelector('.complete');
    const deleteBtn = taskCard.querySelector('.delete');

    completeBtn.addEventListener('click', () => {
        task.completed = !task.completed;
        taskCard.classList.toggle('completed');
        completeBtn.textContent = task.completed ? 'Incomplete' : 'Complete'
    });

    deleteBtn.addEventListener('click', () => {
        taskArr.splice(index, 1);
        renderCard();
    })

    taskContainer.appendChild(taskCard);
};

//For rendering task card
const renderCard = () => {
    taskContainer.innerHTML = '';
    taskArr.forEach((task, index) => createTaskCard(task, index));
};

//For closing the modal
close.addEventListener('click', () => {
    taskInput.value = '';
    taskDesc.value = '';
    modal.style.display = 'none';
});

taskDesc.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        modalForm.requestSubmit();
    }
});

