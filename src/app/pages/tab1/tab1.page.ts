import {Component} from '@angular/core';
import {TasksService} from '../../services/tasks.service';
import {TaskList} from '../../models/todolist.model';
import {Router} from '@angular/router';

@Component({
	selector: 'app-tab1',
	templateUrl: 'tab1.page.html',
	styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
	lists: TaskList[];

	constructor(public tasksService: TasksService, private router: Router) {
		this.lists = tasksService.lists;
	}

	addList() {
		this.router.navigateByUrl('tabs/tab1/add');
	}
}
