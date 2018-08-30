import { Component, OnInit } from '@angular/core';
import {  DataService } from '../../services/data.service';

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

	users$: Object;

	constructor(private dataService: DataService) {
		console.log('User constructor...')
	}

	ngOnInit() {
		this.dataService.getUsers().subscribe(
			data => this.users$ = data
		);
	}

}
