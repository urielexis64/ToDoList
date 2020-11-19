import {ToDoItem} from './todolist-item.model';
export class ToDoList {
	id: number;
	title: string;
	createdIn: Date;
	finishedIn: Date;
	done: boolean;
	items: ToDoItem[];

	constructor(title) {
		this.title = title;
		this.createdIn = new Date();
		this.done = false;
		this.items = [];

		this.id = new Date().getTime();
	}
}
