const input = document.querySelector('input')
const items = document.querySelector('.items')
const btn = document.querySelector('#btn')
const btnClear = document.querySelector('#btn-clear')
const emptyList = document.querySelector('.emptyList')

const body = document.querySelector('body')
const label = document.querySelector('#label-1')
const header = document.querySelector('.header')
const item = Array.from(items.children)

//Добавление Задачи
input.addEventListener('keydown', addTask)
btn.addEventListener('click', addTaskforClick)

btnClear.addEventListener('click', () => {
    items.innerHTML = ``
    emptyList.classList.remove('hidden')
})

//Выполнение Задачи
items.addEventListener('click', doneTask)

//Удаление Задачи
items.addEventListener('click', deleteTask)

if (localStorage.getItem('itemsHTML')) {
    items.innerHTML = localStorage.getItem('itemsHTML')
}

function addTask(event) {
    if (event.keyCode === 13) {

        let itemStatus = {
            id: Math.floor(Math.random() * 1000000000),
            text: input.value,
            LightMode: false
        }

        if (body.classList.contains('light')) {
            itemStatus.LightMode = true
        }

        console.log(itemStatus)

        const taskText = `
                <div class="item">
                    <p>${input.value}</p>
                    <div class="btns">
                        <div class="btn_done" data-action="done">
                            <i class="bi bi-check-lg"></i>
                        </div>
                        <div class="btn_delete" data-action="delete">
                            <i class="bi bi-x"></i>
                        </div>
                    </div>
                </div>
        `

        const taskTextLight = `
        <div class="item light">
            <p>${input.value}</p>
            <div class="btns">
                <div class="btn_done" data-action="done">
                    <i class="bi bi-check-lg"></i>
                </div>
                <div class="btn_delete" data-action="delete">
                    <i class="bi bi-x"></i>
                </div>
            </div>
        </div>
        `

        //Clear input
        input.value = ""

        if (itemStatus.LightMode === true) {
            items.insertAdjacentHTML('beforeend', taskTextLight)
        }
        else {
            items.insertAdjacentHTML('beforeend', taskText)
        }
    }

    if (items.children.length > 0) {
        emptyList.classList.add('hidden')
    }
    saveHTMLToLS()
}

function addTaskforClick(event) {
    let itemStatus = {
        id: Math.floor(Math.random() * 1000000000),
        text: input.value,
        LightMode: false
    }

    if (body.classList.contains('light')) {
        itemStatus.LightMode = true
    }

    console.log(itemStatus)

    const taskText = `
            <div class="item">
                <p>${input.value}</p>
                <div class="btns">
                    <div class="btn_done" data-action="done">
                        <i class="bi bi-check-lg"></i>
                    </div>
                    <div class="btn_delete" data-action="delete">
                        <i class="bi bi-x"></i>
                    </div>
                </div>
            </div>
    `

    const taskTextLight = `
    <div class="item light">
        <p>${input.value}</p>
        <div class="btns">
            <div class="btn_done" data-action="done">
                <i class="bi bi-check-lg"></i>
            </div>
            <div class="btn_delete" data-action="delete">
                <i class="bi bi-x"></i>
            </div>
        </div>
    </div>
    `

    //Clear input
    input.value = ""

    if (itemStatus.LightMode === true) {
        items.insertAdjacentHTML('beforeend', taskTextLight)
    }
    else {
        items.insertAdjacentHTML('beforeend', taskText)
    }

    if (items.children.length > 0) {
        emptyList.classList.add('hidden')
    }

    saveHTMLToLS()
}

function deleteTask(event) {
    if (event.target.dataset.action !== 'delete') return;

    const perentNode = event.target.closest('.item')
    perentNode.remove()

    if (items.children.length < 1) {
        emptyList.classList.remove('hidden')
    }
    saveHTMLToLS()
}

function doneTask(event) {
    if (event.target.dataset.action === 'done') {
        const perentNode = event.target.closest('.item')
        const taskTitle = perentNode.querySelector('p')

        taskTitle.classList.toggle('done')
    }
    saveHTMLToLS()
}

function saveHTMLToLS() {
    localStorage.setItem('itemsHTML', items.innerHTML)
}


//Light/Night Mode
function ligthNightMode() {

    label.addEventListener('click', () => {
        const itemm = items.children

        body.classList.toggle('light')
        header.classList.toggle('light')
        input.classList.toggle('light')
        console.log(Array.from(items.children))

        for (elem of itemm) {
            if (!elem.classList.contains('light')) {
                elem.classList.add('light')
            }
            else {
                elem.classList.remove('light')
            }
        }

        if (body.classList.contains('light')) {
            label.innerHTML = `<i class="bi bi-check"></i>`
        }
        else {
            label.innerHTML = `<i class="bi bi-x"></i>`
        }

    })
}
ligthNightMode()