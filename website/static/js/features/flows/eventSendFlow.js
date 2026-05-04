import {TleParser} from "../parsers/TleParser.js";
import {renderPopup} from "../../components/Popup.js";
import {LogView} from "../../components/LogView.js";
import {postKA} from "../api/postKa.js";
import {postSatellites} from "../api/postSatellites.js"
import {recalculateKas} from "../api/recalculateKas.js";
/**
 * Функция отправляет распаршенные данные по всем КА и после отправки пересчитывает по этим данным значения на сервере.
 * */
export function eventSend(){
    const parserTle=    new TleParser();
    let arr;
    const selectedValue = document.querySelector('input[name="type_bd"]:checked').value;
    let idElem='';
    if (document.getElementById('BC-document').innerHTML===''){
        idElem='get_TLE'
    }else {
        idElem='get_TLEs'
    }
    const arrTles=[...document.querySelectorAll('.data-doc textarea')].map(dataTle=>dataTle.value);
    console.log(arrTles,'arrTles');
    arr= parserTle.parseTLEFile(arrTles);
    document.getElementById('task-btn-TLE').disabled=true;
    arr.forEach(dataTle=>{
        dataTle.NAIM = dataTle.NAIM.replace(/\n/g, "");
        dataTle.NAIM_RUS = dataTle.NAIM_RUS.replace(/\n/g, "")
        dataTle.TLE_NAME = dataTle.TLE_NAME.replace(/\n/g, "")
    })
    const newArrTle=[]
    const  selectedValues = document.querySelector('input[name="type_group"]:checked').value;
    const group = selectedValues === '1'?document.getElementById('groups_TLE').value ?? '':document.getElementById('group_TLE').value ?? '';

    const paramRequest={
        group,
        country_id:Number(document.getElementById('country').value ?? ''),
        purpose_id:Number(document.getElementById('type').value ?? ''),
        organization_id:Number(document.getElementById('organiztion').value ?? '')
    }
    console.log('paramsRequest',paramRequest);
    arr.forEach(dataTle=>{
        const newBodyTle={}
        newBodyTle.name=dataTle.NAIM;
        newBodyTle.norad_id=dataTle.KOD_NORAD;
        newBodyTle.tle_created_at=dataTle.DATA_BEG;
        newBodyTle.tle_line_1=dataTle.TLE_LINE1;
        newBodyTle.tle_line_2=dataTle.TLE_LINE2;
        newArrTle.push(newBodyTle)
    })
    console.log('newArrTle',newArrTle);
    postSatellites(newArrTle,selectedValue,paramRequest).then((res)=>{
        LogView.showBegLogRequest(arr,'#comtainer-logs');
        renderPopup(document.querySelector('#dialog-res'),`Данные  отправлены <br> Ожидайте сообщения о пересчете местоположения КА`)
        LogView.showEndLogRequest('#comtainer-logs');
    })
    // postKA(arr,selectedValue)
    //     .then(()=>{
    //         console.log(idElem)
    //         LogView.showBegLogRequest(arr,'#comtainer-logs');
    //         renderPopup(document.querySelector('#dialog-res'),`Данные  отправлены <br> Ожидайте сообщения о пересчете местоположения КА`)
    //         if(document.getElementById('clear').checked){
    //             recalculateKas(selectedValue).then((res)=>{
    //                 LogView.showEndLogRequest('#comtainer-logs');
    //             })
    //         }
    //
    //     })
    document.getElementById('task-btn-TLE').disabled=true;
}