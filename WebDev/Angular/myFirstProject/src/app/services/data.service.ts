import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class DataService {

	constructor(public http: HttpClient) {
	}

	getAllUsers(){
		return this.http.get('https://jsonplaceholder.typicode.com/users');
	}

	getUser(id){
		return this.http.get('https://jsonplaceholder.typicode.com/users/'+id)
	}

	getAvatar(width, height){
		return this.http.get('http://placekitten.com/'+width+'/'+height)
	}
}
