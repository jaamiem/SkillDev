import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class DataService {

	constructor(public http: HttpClient) {
	}

	getUsers(){
		return this.http.get('https://jsonplaceholder.typicode.com/users');
	}

	// getAvatars(width, height){
	// 	return this.http.get('http://placekitten.com/'+width+'/'+height)
	// }
}
