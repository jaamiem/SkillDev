import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-pr1ofile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

	user$: Object;

	constructor(private route: ActivatedRoute, private data: DataService) {
		this.route.params.subscribe( params => this.user$ = params.id );
	}

	ngOnInit() {
		// this.id = this.route.snapshot.params.id;
		//
		this.data.getUser(this.user$).subscribe(
			data => this.user$ = data
		)
	}
}
