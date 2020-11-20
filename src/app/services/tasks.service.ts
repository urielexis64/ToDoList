import {Injectable} from '@angular/core';
import {ToDoList} from '../models/todolist.model';

@Injectable({
	providedIn: 'root',
})
export class TasksService {
	lists: ToDoList[] = [];

	constructor() {
		this.loadStorage();
	}

	createList(title: string) {
		const newList = new ToDoList(title);
		this.lists.push(newList);
		this.saveStorage();
		return newList.id;
	}

	getList(id: string | number) {
		id = Number(id);

		return this.lists.find((datalist) => datalist.id === id);
	}

	saveStorage() {
		localStorage.setItem('data', JSON.stringify(this.lists));
	}

	loadStorage() {
		const dataFromStorage = localStorage.getItem('data');

		if (dataFromStorage) {
			this.lists = JSON.parse(localStorage.getItem('data'));
		}
	}
}
