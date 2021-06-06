'use strict';

let container = document.getElementById('images');

let leftimg = document.getElementById('leftimage');
let middleimg = document.getElementById('middleimage');
let rightimg = document.getElementById('rightimage');


let maxattempts = 10;
let userattemptscount = 0;


let leftimgindex;
let middleimgindex;
let rightimgindex;


function Product(name, source) {
  this.name = name;
  this.source = source;
  this.votes = 0;
  this.imgshowen = 0;

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



function randomindex() {

  return Math.floor(Math.random() * Product.products.length);
}



function renderimages() {
  leftimgindex = randomindex();
  middleimgindex = randomindex();
  rightimgindex = randomindex();
  while (leftimgindex === middleimgindex || middleimgindex === rightimgindex || leftimgindex === rightimgindex) {
    middleimgindex = randomindex();
    rightimgindex = randomindex();
  }
  leftimg.src = Product.products[leftimgindex].source;
  middleimg.src = Product.products[middleimgindex].source;
  rightimg.src = Product.products[rightimgindex].source;
  Product.products[leftimgindex].imgshowen++;
  Product.products[middleimgindex].imgshowen++;
  Product.products[rightimgindex].imgshowen++;
}




renderimages();




console.log(Product.products[leftimgindex].source);
container.addEventListener('click', userclick);




function userclick(event) {
  userattemptscount++;

  if (userattemptscount<=maxattempts)
  {
    if (event.target.id==='leftimage') {

      Product.products[leftimgindex].votes++;

    }else if(event.target.id==='middleimage'){
      Product.products[middleimgindex].votes++;
    }
    else{
      Product.products[rightimgindex].votes++;
    }
    renderimages();
  }


  else{
    let button=document.createElement('button');
    container.append(button);
    button.textContent='Show Results';
    button.id='btn';
    button.addEventListener('click', userclickforresults);

  }

}
function userclickforresults()
{
  let list=document.getElementById('results');
  for (let i = 0; i < Product.products.length; i++) {
    let productResult=document.createElement('li');

    list.append(productResult);

    productResult.textContent=`${Product.products[i].name} has ${Product.products[i].votes} votes and it's showen ${Product.products[i].imgshowen} times.`;

  }
  console.log(Product.products);
  container.removeEventListener('click', userclick);
}
