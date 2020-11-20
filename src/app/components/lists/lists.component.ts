import {Component, Input} from '@angular/core';
import {TasksService} from '../../services/tasks.service';
import {ToDoList} from '../../models/todolist.model';
import {Router} from '@angular/router';

@Component({
	selector: 'app-lists',
	templateUrl: './lists.component.html',
	styleUrls: ['./lists.component.scss'],
})
export class ListsComponent {
	lists: ToDoList[];
	@Input() done: boolean;

	constructor(private tasksService: TasksService, private router: Router) {
		this.lists = tasksService.lists;
	}

	openList(id) {
		if (this.done) {
			this.router.navigateByUrl(`tabs/tab2/add/${id}`);
			return;
		}
		this.router.navigateByUrl(`tabs/tab1/add/${id}`);
	}

	removeList(list: ToDoList) {
		this.tasksService.removeList(list);
	}
}
