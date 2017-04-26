//зачеркивание выполненных задач
var ul = document.querySelectorAll('ul');
var input = document.querySelector('input');
var plus = document.querySelector('.plus');
var countCompleted = 0;

//реализация появления кнопки "плюс"
input.addEventListener('input', function (event) {
    if (input.value) {
        plus.setAttribute('class', 'plus plusShow');
    } else {
        plus.setAttribute('class', 'plus');
    }
}, false);

// работа кнопки "история"
document.querySelector('.history').addEventListener('click', function () {
    showHistory();
}, false);
document.querySelector('.completedlist').addEventListener('click', function () {
    showHistory();
}, false);

//переместить в список невыполненных
ul[0].addEventListener('click', function (event) {
    if (event.target.className === 'check') {
        var parent = event.target.parentNode;
    } else if (event.target.className === 'fa fa-check') {
        var parent = event.target.parentNode.parentNode;
    } else {return false}
    moveToList(parent, 'completed');
}, false);

//переместить в список выполненных
ul[1].addEventListener('click', function (event) {
    if (event.target.className === 'check checked') {
        var parent = event.target.parentNode;
    } else if (event.target.className === 'fa fa-check') {
        var parent = event.target.parentNode.parentNode;
    } else {return false}
    moveToList(parent);
}, false);

//удаление задачи по нажатию на "корзинку"
ul[0].addEventListener('click', function (event) {
    removeToDo(event, 0);
}, false);
ul[1].addEventListener('click', function (event) {
    removeToDo(event, 1);
}, false);

//добавление новой задачи...
//...по нажатию на Enter
input.addEventListener('keypress', function (event) {
    event.which === 13 ? newToDo() : false;
});
//...по нажатию на "+"
plus.addEventListener('click', function () {
    newToDo();
    setTimeout(function(){
        input.focus();
    }, 10);
});

//ФУНКЦИИ
//добавление новой задачи в список
function newToDo () {
    if (input.value) {
        var todoText = input.value;
        var lix = document.createElement('li');
        input.value = null;
        ispan(lix, 2);
        lix.appendChild(document.createTextNode(' ' + todoText));
        lix.setAttribute('class', 'new');
        ul[0].insertBefore(lix, ul[0].firstChild);
        setTimeout(function () {
            lix.setAttribute('class', 'show');
        }, 10);
        plus.setAttribute('class', 'plus');
    }
}

//передвижение в разные списки
function moveToList(parent, move) {
    if (move === 'completed') {
        parent.childNodes[1].setAttribute('class', 'check checked');
        parent.setAttribute('class', 'completed');
        var todoText = parent.innerText;
        parent.setAttribute('class', 'hideblue completed')
        setTimeout (function () {
            parent.setAttribute('class', 'hide completed')
        }, 300)
        setTimeout (function () {
            parent.remove();
        }, 600);
        var lix = document.createElement('li');
        ispan(lix, 2, 'downList');
        lix.appendChild(document.createTextNode(todoText));
        lix.setAttribute('class', 'new');
        ul[1].appendChild(lix);
        setTimeout(function () {
            lix.setAttribute('class', 'show completed');
        }, 10);
        countToDo(1);
    } else {
        parent.childNodes[1].setAttribute('class', 'check');
        parent.setAttribute('class', '');
        var todoText = parent.innerText;
        parent.setAttribute('class', 'hide')
        setTimeout( function () {
            parent.remove();
        }, 300);
        var lix = document.createElement('li');
        ispan(lix, 2, 'upList');
        lix.appendChild(document.createTextNode(todoText));
        lix.setAttribute('class', 'new');
        ul[0].appendChild(lix);
        setTimeout(function () {
            lix.setAttribute('class', 'show');
        }, 10);
        countToDo();
    }
}

//добавление 2х тэгов в строчку
function ispan (lix, n, list) {
    for (var i = 0; i < n; i++) {
        var span = document.createElement('span')
        var itag = document.createElement('i');
        if (i == 0) {
            itag.setAttribute('class', 'fa fa-trash');
            span.setAttribute('class', 'trash');
            span.appendChild(itag);
            lix.appendChild(span);
        } else {
            itag.setAttribute('class', 'fa fa-check');
            span.appendChild(itag);
            lix.appendChild(span);
            if (list == 'downList') {
                span.setAttribute('class', 'check checked');
                lix.setAttribute('class', 'completed');
            } else {
                span.setAttribute('class', 'check');
                lix.setAttribute('class', '');
            }
        }
    }
}

//удаление задачи
function removeToDo(event, j) {
    if (event.target.className === 'trash') {
        var parent = event.target.parentNode;
    } else if (event.target.className === 'fa fa-trash') {
        var parent = event.target.parentNode.parentNode;
    } else {return false}
    parent.setAttribute('class', 'hidered');
    parent.childNodes[1].setAttribute('class', 'check hidered');
    setTimeout (function () {
        parent.setAttribute('class', 'hide');
    }, 300)
    setTimeout(function() {
        parent.remove();
        j ? countToDo() : false;
    }, 600);
}

//счетчик выполненных задач
function countToDo(x) {
    var counter = document.querySelector('.completedlist');
    x ? countCompleted++ : countCompleted--;
    if (countCompleted > 0) {
       counter.innerText = 'Выполненных задач: ' + countCompleted;
       document.querySelector('.history').setAttribute('class', 'history historyShow');
   } else {
       counter.innerText = 'Выполненных задач...';
       document.querySelector('.history').setAttribute('class', 'history');
   }
    return countCompleted;
}

//вкл/выкл список выполненных задач
function showHistory () {
    for (var i = 1; i < ul[1].childNodes.length; i++) {
        ul[1].childNodes[i].setAttribute('class', 'completed hide');
    }
    if (ul[1].style.display != 'block') {
        ul[1].style.display = 'block';
        setTimeout(function () {
            for (var i = 1; i < ul[1].childNodes.length; i++) {
                ul[1].childNodes[i].setAttribute('class', 'completed show');
            }
        }, 10)
    } else {
        for (var i = 1; i < ul[1].childNodes.length; i++) {
            ul[1].childNodes[i].setAttribute('class', 'completed hide');
        }
        setTimeout(function () {
            ul[1].style.display = 'none';
        }, 300)
    }
}
