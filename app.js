'use strict';
// create the product constructor
function Product(imagePath, imageName) {
  this.timesClicked = 0;
  this.timesShown = 0;
  this.imagePath = imagePath;
  this.imageName = imageName;
  // this.hasBeenClickedArray = [];
  Product.allImages.push(this);
}
Product.allImages = [];
var hasBeenClickedArray = [];
// create all 20 image objects
new Product('img/bag.jpg', 'bag');
new Product('img/banana.jpg', 'banana');
new Product('img/bathroom.jpg', 'bathroom');
new Product('img/boots.jpg', 'boots');
new Product('img/breakfast.jpg', 'breakfast');
new Product('img/bubblegum.jpg', 'bubblegum');
new Product('img/chair.jpg', 'chair');
new Product('img/cthulhu.jpg', 'cthulhu');
new Product('img/dog-duck.jpg', 'dog-duck');
new Product('img/dragon.jpg', 'dragon');
new Product('img/pen.jpg', 'pen');
new Product('img/pet-sweep.jpg', 'pet-sweep');
new Product('img/scissors.jpg', 'scissors');
new Product('img/shark.jpg', 'shark');
new Product('img/sweep.png', 'sweep');
new Product('img/tauntaun.jpg', 'tauntaun');
new Product('img/unicorn.jpg', 'unicorn');
new Product('img/usb.gif', 'usb');
new Product('img/water-can.jpg', 'water-can');
new Product('img/wine-glass.jpg', 'wine-glass');
console.log(Product.allImages);
// grab the HTML elements and put them in 1 + 3 variables
var productContainer = document.getElementById('productImagesContainer');
var leftImage = document.getElementById('leftImage');
var middleImage = document.getElementById('middleImage');
var rightImage = document.getElementById('rightImage');
// generate random number between 1 and the length of the array that contains all objects (=allImages)

function genRandProduct() {
  var leftIndex = Math.floor(Math.random() * Product.allImages.length);
  var middleIndex = Math.floor(Math.random() * Product.allImages.length);
  // make sure the 2nd number doesn match the first
  while (middleIndex === leftIndex) {
    middleIndex = Math.floor(Math.random() * Product.allImages.length)
  }
  // make sure the 3rd number doesnt match the first or second
  var rightIndex = Math.floor(Math.random() * Product.allImages.length);
  while ((rightIndex === leftIndex) || (rightIndex === middleIndex)) {
    rightIndex = Math.floor(Math.random() * Product.allImages.length)
  }

  var leftProduct = Product.allImages[leftIndex];
  Product.allImages[leftIndex].timesShown++;
  // console.log('times Shown just increased to: ' + Product.allImages[leftIndex].timesShown);
  var middleProduct = Product.allImages[middleIndex];
  Product.allImages[middleIndex].timesShown++;

  var rightProduct = Product.allImages[rightIndex];
  Product.allImages[rightIndex].timesShown++;


  return [leftProduct, middleProduct, rightProduct];
}

function renderProduct(leftProduct, middleProduct, rightProduct) {
  // leftProduct.setAttribute('src', leftProduct.image);
  leftImage.src = leftProduct.imagePath;
  leftImage.setAttribute('data-id', leftProduct.imagePath);

  middleImage.src = middleProduct.imagePath;
  middleImage.setAttribute('data-id', middleProduct.imagePath);

  rightImage.src = rightProduct.imagePath;
  rightImage.setAttribute('data-id', rightProduct.imagePath);
}

var randProd = genRandProduct();
renderProduct(randProd[0], randProd[1], randProd[2]);
var numberOfClicks = 0;
var rounds = 5;

// everytime an image was clicked
productContainer.addEventListener('click', function (event) {
  event.preventDefault();
  // console.log(event.target);
  // console.log(event.target.src);
  for (var i = 0; i < Product.allImages.length; i++) {
    if (event.target.src.includes(Product.allImages[i].imagePath)) {
      Product.allImages[i].timesClicked++;
    }
  }
  if (numberOfClicks < rounds) {
    var newProduct = genRandProduct();
    renderProduct(newProduct[0], newProduct[1], newProduct[2]);
    numberOfClicks++;
    console.log('the number of clicks ' + numberOfClicks);
  } else {
    console.log('total has reached ' + numberOfClicks);
    leftImage.src = '';
    middleImage.src = '';
    rightImage.src = '';
    return checkForResults();
  }
})
// productContainer.removeEventListener('click', function (event) { });
function checkForResults() {
  for (var k = 0; k < Product.allImages.length; k++) {
    if (Product.allImages[k].timesClicked > 0) {
      hasBeenClickedArray.push(Product.allImages[k].imageName);
    }
  }
  console.log('HAS BEEN CLICKED YAYAYAY', hasBeenClickedArray);
  printResults();
}
function printResults() {

  var ulElement = document.getElementById('results');

  for (var l = 0; l < Product.allImages.length; l++) {

    var liElement = document.createElement('li');

    console.log("Hello ----- ", Product.allImages[l].imageName);

    // liElement.textContent = `${Product.allImages[l].imageName} had ${Product.allImages[l].timesClicked} votes, and was viewed ${Product.allImages[l].timesShown} times`;

    liElement.textContent = Product.allImages[l].imageName + ' had ' + Product.allImages[l].timesClicked + ' votes, and was viewed ' + Product.allImages[l].timesShown + ' times';


    liElement.textContent = Product.allImages[l].imageName;

    ulElement.appendChild(liElement);

  }
}

