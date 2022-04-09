const alertZeroRecipe = 'Sorry, we haven\'t found any recipes for these filters.';
async function fetchFoodByIngredient(ingredient) {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    global.alert(alertZeroRecipe);
  }
}

export async function fetchFoodByName(name) {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    const data = await response.json();
    return data;
  } catch (error) {
    global.alert(alertZeroRecipe);
  }
}

export async function fetchFoodByFirstLetter(firstLetter) {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);
    const data = await response.json();
    return data;
  } catch (error) {
    global.alert(alertZeroRecipe);
  }
}

export default fetchFoodByIngredient;
