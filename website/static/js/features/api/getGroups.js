/**
 * Функция получает с сервера список Группировок
 *
 * @param {String} url - url адрес сервера.
 * */
export async function getGroups(url){
    try {
        const response = await fetch(`http://${url}/ka/grups`, {
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