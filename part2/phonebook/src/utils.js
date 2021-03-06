export const JSON_SERVER_URL = "http://localhost:3001/persons";

export function fetchFrom(url){
	return new Promise(function(resolve, reject){
		const request = new XMLHttpRequest();
  		request.open("GET", url, false);

  		request.onload = () => resolve(JSON.parse(request.responseText));
  		request.onerror = () => reject("ERROR LOADING DATA");

  		request.send();
	});
}