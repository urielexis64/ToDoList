import {Injectable} from '@angular/core';
import {TaskList} from '../models/todolist.model';

@Injectable({
	providedIn: 'root',
})
export class TasksService {
	lists: TaskList[] = [];

	constructor() {
		const list1 = new TaskList('Task1');
		const list2 = new TaskList('Task2');

		this.lists.push(list1, list2);
	}
}
