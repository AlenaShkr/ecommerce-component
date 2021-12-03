function render(menu) {
  const cardList= [];
  const dishes = document.body.querySelector('.list-dishes');
  const totalContainer = document.body.querySelector('.total-container');
  for (let i = 0; i < menu.length; i++) {
    const dish = document.createElement('div');
    dish.className = 'dish';
    const img = document.createElement('img');
    img.src = menu[i].urlimage;
    img.className = 'img-dish';
    dish.appendChild(img);
    const cost = document.createElement('p');
    cost.textContent = menu[i].cost;
    cost.className = 'cost';
    dish.appendChild(cost);
    const addDishButton = document.createElement('button');
    addDishButton.textContent = 'Add to Card';
    addDishButton.className = 'button-add-dish';
    addDishButton.addEventListener('click', () => { 
      menu[i].count = 1;
      cardList.push(menu[i]);
       renderCard(menu[i]);
       addDishButton.disabled = true;
      totalContainer.style.visibility = 'visible';
      const { sum, tax, total } = defineTotal(cardList);
      const subtotalValue = document.body.querySelector('.subtotal-value');
      subtotalValue.textContent = sum;
      const taxValue = document.body.querySelector('.tax-value');
      taxValue.textContent = tax;
      const totalValue = document.body.querySelector('.total-value');
      totalValue.textContent = total;

      //  addDishButton.removeEventListener('click', () => {})
       })
    dish.appendChild(addDishButton);
    dishes.appendChild(dish);
  }
}

function defineTotal(data) {
  let sum = 0;
  const objTotal = {};
  data.forEach(element => { sum += element.cost * element.count;
    
  });
  objTotal.sum = sum;
  objTotal.tax = Math.round(0.0975 * sum * 100) / 100;
  objTotal.total = sum - Math.round(objTotal.tax * 100) / 100;
  return objTotal;
}

function renderCard(data) {
  const { title, cost, urlimage, count } = data;
  const cards = document.body.querySelector('.card-container');
  const card = document.createElement('div');
  card.className = 'card';
  const img = document.createElement('img');
  img.src = urlimage;
  img.className = 'img-card';
  card.appendChild(img);
  const titleCard = document.createElement('p');
  titleCard.textContent = title;
  titleCard.className = 'card-title';
  card.appendChild(titleCard);
  const costCard = document.createElement('p');
  costCard.textContent = cost;
  costCard.className = 'card-cost';
  card.appendChild(costCard);
  const decreaseCount = document.createElement('button');
  decreaseCount.textContent = '<';
  decreaseCount.className = 'button-decrease-count';
  card.appendChild(decreaseCount);
  const countCard = document.createElement('p');
  countCard.textContent = count;
  countCard.className = 'card-count';
  card.appendChild(countCard);
  const encreaseCount = document.createElement('button');
  encreaseCount.textContent = '>';
  decreaseCount.className = 'button-encrease-count';
  card.appendChild(encreaseCount);
  const summaryCard = document.createElement('p');
  summaryCard.textContent = count*cost;
  summaryCard.className = 'card-summary';
  card.appendChild(summaryCard);
  cards.appendChild(card);

}

function getListMenu(data) {
  return data;
}
window.onload = function load() {

  const data = fetch('data.json')
  .then(resp => resp.json())
  .then(data => getListMenu(data))
  .then(res1 => render(res1));
};