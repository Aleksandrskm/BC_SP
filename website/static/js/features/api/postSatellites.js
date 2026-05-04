/**
 * Функция отправки данных КА на сервер.
 *
 * @param {Object} data - тело запроса со всеми данными.
 * @param {String} url - url адрес сервера.
 * @param {String} group - группировка КА
 * @param {Number} country_id - id страны КА
 * @param {Number} purpose_id - id назначения КА
 * @param {Number} organization_id - id организации КА
 *
 *
 * */
export async function postSatellites(data,url,{group,country_id,purpose_id,organization_id  }){
    try {
        const response = await fetch(`http://${url}/satellites/from_bc?group=${group}&country_id=${Number(country_id)}&purpose_id=${Number(purpose_id)}&organization_id=${Number(organization_id)}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        return result;
    }
    catch (error) {
        console.error("Error add row:", error);
    }
}