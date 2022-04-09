const fetchFoodsNationalities = async () => {
  const endPoint = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  const response = await fetch(endPoint);
  const data = await response.json();
  return data;
};

export default fetchFoodsNationalities;
