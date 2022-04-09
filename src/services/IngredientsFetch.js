const errorAlert = 'API call error';
async function fetchFoodIngredients() {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    global.alert(errorAlert);
  }
}

export default fetchFoodIngredients;

export async function fetchDrinkIngredients() {
  try {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
    const data = await response.json();
    console.log('drink', data);
    return data;
  } catch (error) {
    global.alert(errorAlert);
  }
}
