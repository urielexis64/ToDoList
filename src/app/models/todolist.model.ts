import {TaskListItem} from './todolist-item.model';
export class TaskList {
	id: number;
	title: string;
	createdIn: Date;
	finishedIn: Date;
	done: boolean;
	items: TaskListItem[];

	constructor(title) {
		this.title = title;
		this.createdIn = new Date();
		this.done = false;
		this.items = [];

		this.id = new Date().getTime();
	}
}
