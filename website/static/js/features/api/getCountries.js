/**
 * Функция получает с сервера список стран
 *
 * @param {String} url - url адрес сервера.
 * */
export async function getCountries(url){
    try {
        const response = await fetch(`http://${url}/sprav/country`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = await response.json();
        return result;
    }
    catch (error) {
        console.error("Error add row:", error);
    }
}