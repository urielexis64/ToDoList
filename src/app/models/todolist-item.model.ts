export class TaskListItem {
	description: string;
	done: boolean;

	constructor(description: string) {
		this.description = description;
		this.done = false;
	}
}
