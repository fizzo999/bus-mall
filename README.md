# bus-mall
lab11 Codefellows 201 create a digital product test to evaluate consumer preferences

## update 01/30/2021
I finished the styling of the catalog and shopping cart. Lots of times using the inspector to see which elements to find and grab onto. Had to change some lines of JS code. The elements were not correctly appended (in the shopping cart I nedded to add a td element and put the image of the x button into that td element). Also had to change the shopping cart flow to make the input form disappear after clicking the submit button. Also changed styling on that. Finally I wrapped the event listener for the submit button into a seperate function and called it off after clicking so the button is no longer active.

Still unclear how to make the pseudo class of button:hover disappear.

projects to come back to:
+ make the input form on the cart page;
+ create a CSS animation for yay you submitted your order (maybe let one random image from the cart fly across the screen);
+ add images both to the catalog as well as the cart;
+ add price to the whole thing (catalog, cart);
+ add the abilityh to de crease product amount inside the shopping cart;
+ add newsletter sign-up;



## update 01/29/2021
I merged all my work I had done with Matt Simms (catalog and shopping cart) to my bus mall survey site. I worked more on the styling. Specifically catalog and shopping cart.


## update 01/28/2021
morning study of CSS transitions - I try it on the images the user can click. I notice the delay of the transition hangs up the image reload and I decide to take it off again. Instead I apply a gentle background-color transition to all the buttons - on the hover state and that works and looks nice.


## update 01/27/2021
another great day !!! I implemented the local storage. After struggling with it for a bit here and there. I went back to the simple solution of changing the constructor function (4variables instead of 2), and setting 0, 0, infront of all 20 images.
What I learned was running the JSON parsed string array back throught the constructor function required to be dataFromStorageAraay[i].timesClicked,..... for all 4 variables as parameters to feed into the function.
I also made the check (dataFromStorageArray for empty) work (note as operator it needs == null - NOT =)
I also made the reset button work (I added another event listener, so that when clicked - it would delete the data and start at 0) YAY.


## update 01/26/2021
I woke up at 5.15am with an inspiration on how to display the results of the survey INCLUDING the images. Yesterday I had only compiled the results into a list `<li>` - I thought about adding them as bullet-images in CSS. I couldn`t figure that out but it led me to go back to basics. Just looking over my code on how we had displayed the random images in class. And then translate that to the results images. And it worked.

Then I continued on to implement the solution I observed TA Chance Harmon give to Matt Simms yesterday. Displaying content with the CSS property of display: none. And then changing that dynamically in JS through a button. define a variable that grabs onto the `id=buttonShow` and then `buttonShow.addEventListener` on the button. And in the function simply set the `buttonShow.style.display='block'`

I LOVE THAT. Having a new idea and following it. Until it all works out. Beautiful.

afternoon/evening: I added the chart with CDN chart, from class this morning, just had to push the image names into an array so it would be an array.
Then I added another button and styled it and implemented - either display the image-list - OR do the chart. Yay.
Then I added Tedd Knechts math check. Makeing sure that the 3 images are unique and new. Difficult task since I had to break up my math function. Got stuck and asked TA Nicco for help. Sout out to Nicco. What I learned - if you return sth from a function that is an array - you ll have to put that return value into square brackets !!!
Then I had to do it again to split a function - or better to say wrap the eventListener on the images into a named function so I could removeEventListener. - And it worked.
Then I made the li list elements display into 2 columns.
Finally I tried to implement a customer input for deciding how many rounds they want to look at images. Still working on.
Update - I just made it work. Had another typo in the ID to grab onto. Fixed that, made the counter work correctly, made the button disappear when done.... YAY.
