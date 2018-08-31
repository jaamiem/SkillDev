import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PostsComponent } from './components/posts/posts.component';
import { CommentsComponent } from './components/comments/comments.component';
import { HomeComponent } from './components/home/home.component';

import { DataService } from './services/data.service';
import { SidebarComponent } from './components/sidebar/sidebar.component';

const appRoutes: Routes = [
	{ path:'', component:HomeComponent },
	{ path:'profile/:id', component:ProfileComponent },
	{ path:'posts', component:PostsComponent },
	{ path:'users', component:UsersComponent }
];

@NgModule({
	declarations: [
		AppComponent,
		UsersComponent,
		ProfileComponent,
		PostsComponent,
		CommentsComponent,
		HomeComponent,
		SidebarComponent
	],
	imports: [BrowserModule, RouterModule.forRoot(appRoutes), HttpClientModule],
	providers: [DataService],
	bootstrap: [AppComponent]
})
export class AppModule { }
