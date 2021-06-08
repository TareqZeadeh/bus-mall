'use strict';

let container = document.getElementById('images');

let leftimg = document.getElementById('leftimage');
let middleimg = document.getElementById('middleimage');
let rightimg = document.getElementById('rightimage');


let maxattempts = 10;
let userattemptscount = 0;

let picarray = [];
let leftimgindex;
let middleimgindex;
let rightimgindex;

let productsnames = [];
let votes = [];
let shown = [];

function Product(name, source) {
  this.name = name;
  this.source = source;
  this.votes = 0;
  this.imgshowen = 0;
  productsnames.push(this.name);
  Product.products.push(this);
}
Product.products = [];

new Product('bag', 'img/bag.jpg');
new Product('banana', 'img/banana.jpg');
new Product('bathroom', 'img/bathroom.jpg');
new Product('boots', 'img/boots.jpg');
new Product('breakfast', 'img/breakfast.jpg');
new Product('bubblegum', 'img/bubblegum.jpg');
new Product('chair', 'img/chair.jpg');
new Product('cthulhu', 'img/cthulhu.jpg');
new Product('dog-duck', 'img/dog-duck.jpg');
new Product('dragon', 'img/dragon.jpg');
new Product('pen', 'img/pen.jpg');
new Product('pet-sweep', 'img/pet-sweep.jpg');
new Product('scissors', 'img/scissors.jpg');
new Product('shark', 'img/shark.jpg');
new Product('sweep', 'img/sweep.png');
new Product('tauntaun', 'img/tauntaun.jpg');
new Product('unicorn', 'img/unicorn.jpg');
new Product('usb', 'img/usb.gif');
new Product('water-can', 'img/water-can.jpg');
new Product('wine-glass', 'img/wine-glass.jpg');



function updatestorage() {
  let string = JSON.stringify(Product.products);
  localStorage.setItem('Product', string);
}

function custselection() {
  let data = localStorage.getItem('Product');
  let productdata = JSON.parse(data);
  if (productdata !== null) {
    Product.products = productdata;
  }
  renderimages();
}

custselection();
function randomindex() {

  return Math.floor(Math.random() * Product.products.length);
}



function renderimages() {



  leftimgindex = randomindex();
  middleimgindex = randomindex();
  rightimgindex = randomindex();
  while ((leftimgindex === middleimgindex || middleimgindex === rightimgindex || leftimgindex === rightimgindex) || (picarray.includes(leftimgindex) || picarray.includes(middleimgindex) || picarray.includes(rightimgindex)
  )) {
    leftimgindex = randomindex();
    middleimgindex = randomindex();
    rightimgindex = randomindex();


  }
  picarray = [];
  picarray.push(leftimgindex);
  picarray.push(middleimgindex);
  picarray.push(rightimgindex);
  console.log(picarray);


  leftimg.src = Product.products[leftimgindex].source;
  middleimg.src = Product.products[middleimgindex].source;
  rightimg.src = Product.products[rightimgindex].source;

  Product.products[leftimgindex].imgshowen++;
  Product.products[middleimgindex].imgshowen++;
  Product.products[rightimgindex].imgshowen++;
  updatestorage();
}




renderimages();




console.log(Product.products[leftimgindex].source);
container.addEventListener('click', userclick);




function userclick(event) {
  userattemptscount++;

  if (userattemptscount <= maxattempts) {
    if (event.target.id === 'leftimage') {

      Product.products[leftimgindex].votes++;

    } else if (event.target.id === 'middleimage') {
      Product.products[middleimgindex].votes++;
    }
    else if (event.target.id === 'rightimg') {
      Product.products[rightimgindex].votes++;
    }
    // else {
    //   alert('please click on the showen images');
    //   userattemptscount--;
    // }
    renderimages();
  }


  else {
    let button = document.createElement('button');
    container.append(button);
    button.textContent = 'Show Results';
    button.id = 'btn';
    button.addEventListener('click', userclickforresults);

    container.removeEventListener('click', userclick);




    function userclickforresults() {
      let list = document.getElementById('results');
      for (let i = 0; i < Product.products.length; i++) {
        let productResult = document.createElement('li');

        list.append(productResult);

        productResult.textContent = `${Product.products[i].name} has ${Product.products[i].votes} votes and it's showen ${Product.products[i].imgshowen} times.`;

      }
      chart();
      button.removeEventListener('click', userclickforresults);
      console.log(Product.products);

    }

    for (let i = 0; i < Product.products.length; i++) {

      votes.push( Product.products[i].votes);
      shown.push( Product.products[i].imgshowen);
    }

  }
  
}

function chart() {
  console.log(shown);
  console.log(votes);
  let ctx = document.getElementById('mychart');
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productsnames,
      datasets: [{
        label: '# of Votes',
        data: votes,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      },
      {
        label: '# of Shown',
        data: shown,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

}
