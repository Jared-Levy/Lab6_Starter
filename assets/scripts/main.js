// main.js

// Here is where the recipes that you will fetch.
// Feel free to add your own here for part 2, if they are local files simply add their path as a string.
const recipes = [
  'https://introweb.tech/assets/json/ghostCookies.json',
  'https://introweb.tech/assets/json/birthdayCake.json',
  'https://introweb.tech/assets/json/chocolateChip.json',
  'assets/recipes/recipes_1.json',
  'assets/recipes/recipes_2.json',
  'assets/recipes/recipes_3.json'
];

// Once all of the recipes that were specified above have been fetched, their
// data will be added to this object below. You may use whatever you like for the
// keys as long as it's unique, one suggestion might but the URL itself
const recipeData = {}

window.addEventListener('DOMContentLoaded', init);

// This is the first function to be called, so when you are tracing your code start here.
async function init() {
  // fetch the recipes and wait for them to load
  let fetchSuccessful = await fetchRecipes();
  // if they didn't successfully load, quit the function
  if (!fetchSuccessful) {
    console.log('Recipe fetch unsuccessful');
    return;
  };
  // Add the first three recipe cards to the page
  createRecipeCards();
  // Make the "Show more" button functional
  bindShowMore();
}

async function fetchRecipes() {
  return new Promise((resolve, reject) => {
    // This function is called for you up above
    // From this function, you are going to fetch each of the recipes in the 'recipes' array above.
    // Once you have that data, store it in the 'recipeData' object. You can use whatever you like
    // for the keys. Once everything in the array has been successfully fetched, call the resolve(true)
    // callback function to resolve this promise. If there's any error fetching any of the items, call
    // the reject(false) function.

    // For part 2 - note that you can fetch local files as well, so store any JSON files you'd like to fetch
    // in the recipes folder and fetch them from there. You'll need to add their paths to the recipes array.

    // Part 1 Expose - TODO
    var fetched = 0
    for(const recipe of recipes) {
      fetch(recipe)
        .then(response => {
          return response.json()
        })
        .then(data => {
          fetched = fetched + 1
          recipeData[recipe] = data
          if(fetched == recipes.length) {
            resolve(true)
          }
        })
        .catch(error => {
          console.log(error)
          reject(false)
        })
    }
  });
}

function createRecipeCards() {
  // This function is called for you up above.
  // From within this function you can access the recipe data from the JSON 
  // files with the recipeData Object above. Make sure you only display the 
  // three recipes we give you, you'll use the bindShowMore() function to
  // show any others you've added when the user clicks on the "Show more" button.

  // Part 1 Expose - TODO
  // We only want to show 3 recipes
  var recipe_counter = 0
  for(const recipe of recipes) {
    var loc = document.querySelector('main')
    var recipe_card = document.createElement('recipe-card')
    recipe_card.data = recipeData[recipe]
    loc.appendChild(recipe_card)

    recipe_counter = recipe_counter + 1
    if(recipe_counter == 3) {
      break
    }
  }
}

function bindShowMore() {
  // This function is also called for you up above.
  // Use this to add the event listener to the "Show more" button, from within 
  // that listener you can then create recipe cards for the rest of the .json files
  // that were fetched. You should fetch every recipe in the beginning, whether you
  // display it or not, so you don't need to fetch them again. Simply access them
  // in the recipeData object where you stored them/

  // Part 2 Explore - TODO
  var show_more = document.querySelector('button')
  show_more.addEventListener('click', (event) => {
    if(show_more.textContent == 'Show more') {
      var recipe_counter = 0
      for(const recipe of recipes) {
        if(recipe_counter > 2) {
          var loc = document.querySelector('main')
          var recipe_card = document.createElement('recipe-card')
          recipe_card.data = recipeData[recipe]
          loc.appendChild(recipe_card)
        }
    
        recipe_counter = recipe_counter + 1
        if(recipe_counter == 6) {
          break
        }
      }
      show_more.textContent = 'Show less'
    } else {
      var recipe_cards = document.querySelectorAll('recipe-card')
      var recipe_counter = 0
      for(const recipe of recipe_cards) {
        if(recipe_counter > 2) {
          recipe.remove()
        }
        
        recipe_counter = recipe_counter + 1
      }
      show_more.textContent = 'Show more'
    }
  })
}