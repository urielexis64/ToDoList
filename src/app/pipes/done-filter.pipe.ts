import {Pipe, PipeTransform} from '@angular/core';
import {ToDoList} from '../models/todolist.model';

@Pipe({
	name: 'doneFilter',
	pure: false,
})
export class DoneFilterPipe implements PipeTransform {
	transform(lists: ToDoList[], done: boolean = true): ToDoList[] {
		return lists.filter((list) => list.done === done);
	}
}
