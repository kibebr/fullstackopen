import {fetchFrom, JSON_SERVER_URL} from '../utils.js';

export function putPersonInServer(personObj){
    return new Promise(function(resolve, reject){
        const data = JSON.stringify(personObj);
        const request = new XMLHttpRequest();

        request.open("POST", JSON_SERVER_URL, true);
        request.setRequestHeader("Content-type","application/json");

        request.onload = () => resolve(console.log("REQUEST POST SUCCCESSFUL"));
        request.onerror = () => reject(console.log("REQUEST POST UNSUCCESSFUL"));

        request.send(data);
    });
}

export function removePersonFromServer(personID){
    return new Promise(function (resolve, reject){
        const request = new XMLHttpRequest();
        request.open("DELETE", `${JSON_SERVER_URL}/${personID}`, true);

        if(request.status == 404){
            reject(console.log("404"));
        }else{
            resolve(console.log("REQUEST SUCCESSFUL"));
        }

        request.send(void 0);
    })
}
