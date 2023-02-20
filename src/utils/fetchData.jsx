// ----------------
// Fetch data utils
// ----------------

// -------------------
// fetch data from api
// -------------------
export async function fetchData(arr) {
  const allData = await Promise.all(
    arr.map(async (el) => {
      const data = fetch(el.url)
        .then((response) => response.json())
        .then((data) => ({ ...data, id: el.id }))
        .catch((err) => console.log("Error: ", err));
      return data;
    })
  );
  return allData;
}
