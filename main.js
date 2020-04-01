const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
let items = JSON.parse(localStorage.getItem("items")) || [];
const btnClear = document.querySelector('#clear');
const btnCheck = document.querySelector('#checkAll');
const btnUncheck = document.querySelector('#uncheckAll');

function addItem(e) {
    e.preventDefault();
    const text = this.querySelector('[name=item]').value;
    const item = {
        'text': text,
        'done': false
    }
    items.push(item);
    populateList(items,itemsList);
    localStorage.setItem('items', JSON.stringify(items));
    this.reset();
}

function populateList(plates = [], platesList) {
    platesList.innerHTML = plates.map((plate, i) => {
        return `
          <li>
            <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} />
            <label for="item${i}">${plate.text}</label>
          </li>
        `;
      }).join('');
}

function toggleDone(e) {
    if(!e.target.matches('input')) return;
    const el = e.target;
    const index = el.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
}

function clearLocal () {
    localStorage.clear();
    items = [];
    populateList(items, itemsList);
}

let isState = false;
function checking() {
    items.forEach(item => {
        item.done = isState;
    });
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
}

 // submit event
addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);
btnClear.addEventListener('click', clearLocal);
btnCheck.addEventListener('click', () => {
    isState = true;
    checking();
});
btnUncheck.addEventListener('click', () => {
    isState = false;
    checking();
});
populateList(items, itemsList);

