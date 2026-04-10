/**
 * Функция получает с сервера список организаций
 *
 * @param {String} url - url адрес сервера.
 * */
export async function getOrganization(url){
    try {
        const response = await fetch(`http://${url}/sprav/organization`, {
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