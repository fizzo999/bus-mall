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
// console.log(Product.allImages);
// grab the HTML elements and put them in 1 + 3 variables
var productContainer = document.getElementById('productImagesContainer');
var leftImage = document.getElementById('leftImage');
var middleImage = document.getElementById('middleImage');
var rightImage = document.getElementById('rightImage');
var resultsButton = document.getElementById('showResultsBtn');
var chartButton = document.getElementById('showChartBtn');
var resultsContainer = document.getElementById('resultsContainer');
var chartDisplay1 = document.getElementById('chartDisplay1');
var roundsCounterElement = document.getElementById('roundsCounter');
var sectionHeader = document.getElementById('sectionHeader');
var numberOfClicks = 0;
var rounds = 4;
var roundsInput = 0;
var lastImageIndexNumArray = [];
var tempImageIndexNumArray = [];

// var roundsInput = 0;
function askRounds() {
  roundsInput = prompt('Please select how many rounds of ProductSelection you would like to have displayed. Pick a number between 1 and 25');
  while ((roundsInput < 1) || (roundsInput > 25)) {
    roundsInput = prompt('Please only enter numbers from 1 to 25 !');
  }
  rounds = roundsInput - 1;

  // console.log(roundsInput);
  // roundsCounterElement.textContent = (roundsInput - 1) + ' rounds left';
  return rounds, roundsInput;
}

askRounds();

function genRandImage() {

  tempImageIndexNumArray[0] = genRanNum();
  var leftProduct = Product.allImages[tempImageIndexNumArray[0]];

  Product.allImages[tempImageIndexNumArray[0]].timesShown++;

  tempImageIndexNumArray[1] = genRanNum();
  var middleProduct = Product.allImages[tempImageIndexNumArray[1]];

  Product.allImages[tempImageIndexNumArray[1]].timesShown++;

  tempImageIndexNumArray[2] = genRanNum();
  var rightProduct = Product.allImages[tempImageIndexNumArray[2]];
  Product.allImages[tempImageIndexNumArray[2]].timesShown++;

  for (var i = 0; i < 3; i++) {
    lastImageIndexNumArray[i] = tempImageIndexNumArray[i];
  }

  return [leftProduct, middleProduct, rightProduct];

}

function genRanNum() {

  var randNumber = Math.floor(Math.random() * Product.allImages.length);

  while (lastImageIndexNumArray.includes(randNumber) || tempImageIndexNumArray.includes(randNumber)) {
    randNumber = Math.floor(Math.random() * Product.allImages.length);
  }
  return (randNumber);
}

// generate random number between 1 and the length of the array that contains all objects (=allImages)

function renderProduct(leftProduct, middleProduct, rightProduct) {

  leftImage.src = leftProduct.imagePath;
  middleImage.src = middleProduct.imagePath;
  rightImage.src = rightProduct.imagePath;
  roundsCounterElement.textContent = (roundsInput) + ' rounds left';

}

var randProd = genRandImage();
renderProduct(randProd[0], randProd[1], randProd[2]);

function handleImageClick(event) {
  roundsCounterElement.textContent = roundsInput + ' rounds left';
  roundsInput--;

  for (var i = 0; i < Product.allImages.length; i++) {
    if (event.target.src.includes(Product.allImages[i].imagePath)) {
      Product.allImages[i].timesClicked++;
    }
  }
  if (numberOfClicks < rounds) {
    var newProduct = genRandImage();
    renderProduct(newProduct[0], newProduct[1], newProduct[2]);
    numberOfClicks++;
    // console.log('the number of clicks ' + numberOfClicks);
  } else {
    // console.log('total has reached ' + numberOfClicks);
    leftImage.src = '';
    middleImage.src = '';
    rightImage.src = '';
    productContainer.removeEventListener('click', handleImageClick);
    // console.log('HAS IT STOPPED ALLOWING TO CLICK ????, ', event.target);
    return checkForResults();
  }
}
// everytime an image was clicked
productContainer.addEventListener('click', handleImageClick);

function checkForResults() {
  for (var k = 0; k < Product.allImages.length; k++) {
    if (Product.allImages[k].timesClicked > 0) {
      hasBeenClickedArray.push(Product.allImages[k].imageName);
    }
  }
  // console.log('HAS BEEN CLICKED YAYAYAY', hasBeenClickedArray);
  printResults();
  printChart();
}

resultsButton.addEventListener('click', function (event) {
  event.preventDefault();
  resultsContainer.style.display = 'block';
  chartDisplay1.style.display = 'none';
})

chartButton.addEventListener('click', function (event) {
  event.preventDefault();
  resultsContainer.style.display = 'none';
  chartDisplay1.style.display = 'block';
})

function printResults() {
  sectionHeader.style.display = 'none';
  resultsContainer.style.display = 'none';
  roundsCounterElement.style.display = 'none';
  resultsButton.style.display = 'block';
  chartButton.style.display = 'block';

  var ulElement = document.getElementById('results');

  for (var l = 0; l < Product.allImages.length; l++) {

    var imgResults = document.createElement('img');
    var liElement = document.createElement('li');
    // liElement.textContent = 'I love you, Fizzo';
    imgResults.src = Product.allImages[l].imagePath;
    ulElement.appendChild(imgResults);

    liElement.textContent = `${Product.allImages[l].imageName} had ${Product.allImages[l].timesClicked} votes, and was viewed ${Product.allImages[l].timesShown} times `;
    ulElement.appendChild(liElement);
    resultsContainer.appendChild(ulElement);
  }
}

// this grabs our canvas element and select a context called ('2d;);
//    this operation enables us to draw 2 dimensional shapes use the chartContext variable
var chartContext = document.getElementById('myChart').getContext('2d');

var votesByProduct = [];
var timesProductsAreShown = [];
var productsNamesArray = [];

// what is this for loop doing?
//  Is it required?
function printChart() {
  for (var i = 0; i < Product.allImages.length; i++) {
    votesByProduct.push(Product.allImages[i].timesClicked);
    timesProductsAreShown.push(Product.allImages[i].timesShown);
    productsNamesArray.push(Product.allImages[i].imageName);
  }
  // console.log('votesByProductASrray Values are : ', votesByProduct);
  // This is an object constructor, from chart.js.  Because we have installed our chart.js file from the cdn, we should have access to a new constructor
  var myChart = new Chart(chartContext, {
    type: 'bar',
    data: {
      labels: productsNamesArray, // array of strings goes here
      datasets: [{
        label: 'times clicked',
        // data: [15, 50, 3, 5, 2, 3], // array of numbers goes here
        data: votesByProduct,
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 1
      },
      {
        label: 'times displayed',
        data: timesProductsAreShown,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
};

