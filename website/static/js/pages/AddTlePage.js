
import {startDateTimer} from '../components/Timer.js';
import { viewDefaulBc } from '../features/flows/viewDefaultBc.js';
import { viewDefaulTles } from '../features/flows/viewDefaulTles.js';
import { eventSend } from '../features/flows/eventSendFlow.js';
import {onBcFileChange} from "../features/flows/handleBcFile.js";
import { onTlesFileChange } from "../features/flows/handleTleFile.js";
import {getCountries} from "../features/api/getCountries.js";
import {getNaznachenie} from "../features/api/getNaznachenie.js";
import {getGroups} from "../features/api/getGroups.js";
import {getOrganization} from "../features/api/getOrganization.js";

/**
 * Функция инициализации страницы добавления и редактирование TLE и БЦ.
 * */
export function initPageAdd() {
    startDateTimer('#timer');
    setupEventListeners();
    mountCountry().then();
    mountNaznachenie().then();
    mountGroups().then();
    mountOrganizations().then();


}

/**
 * Функция инициализации обработчиков событий.
 * */
function setupEventListeners() {
    document.getElementById('task-btn-TLE').disabled = true;
    document.getElementById('download-tle-surr').addEventListener('click', viewDefaulTles);
    document.getElementById('download-bc-surr').addEventListener('click', viewDefaulBc);
    document.getElementById('task-btn-TLE').addEventListener('click', eventSend);
    document.getElementById('get_TLE').addEventListener('change', onBcFileChange);
    document.getElementById('get_TLEs').addEventListener('change', onTlesFileChange);
}
async function  mountCountry(){
    const selectedValue = document.querySelector('input[name="type_bd"]:checked').value;
    console.log(selectedValue);
    const country = await getCountries(selectedValue);
    const options = [];
    country.forEach(({ID,NAIM}) => {
        const option =document.createElement('option');
        option.value = ID;
        option.textContent = NAIM;
        options.push(option)
    })
    document.getElementById('country').append(...options)
    console.log(country,'country');
}
async function  mountNaznachenie(){
    const selectedValue = document.querySelector('input[name="type_bd"]:checked').value;
    console.log(selectedValue);
    const naznachenie = await getNaznachenie(selectedValue);
    const options = [];
    naznachenie.forEach(({ID,NAIM}) => {
        const option =document.createElement('option');
        option.value = ID;
        option.textContent = NAIM;
        options.push(option)
    })
    document.getElementById('type').append(...options)

}
async function  mountGroups(){
    const selectedValue = document.querySelector('input[name="type_bd"]:checked').value;
    console.log(selectedValue);
    const groups = await getGroups(selectedValue);
    const options = [];
    groups.forEach((group) => {
        const option =document.createElement('option');
        option.value = group;
        option.textContent = group;
        options.push(option)
    })
    document.getElementById('groups_TLE').append(...options)

}
async function  mountOrganizations(){
    const selectedValue = document.querySelector('input[name="type_bd"]:checked').value;
    console.log(selectedValue);
    const org = await getOrganization(selectedValue);
    const options = [];
    console.log('org',org)
    org.forEach(({ID,NAIM}) => {
        const option =document.createElement('option');
        option.value = ID;
        option.textContent = NAIM;
        options.push(option)
    })
    document.getElementById('organiztion').append(...options)

}

