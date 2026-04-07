/**
 * Функция получает с сервера назначения
 *
 * @param {String} url - url адрес сервера.
 * */
export async function getNaznachenie(url){
    try {
        const response = await fetch(`http://${url}/sprav/naznachenie`, {
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