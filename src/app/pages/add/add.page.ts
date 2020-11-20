import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TasksService} from '../../services/tasks.service';
import {ToDoList} from '../../models/todolist.model';
import {ToDoItem} from '../../models/todolist-item.model';

@Component({
	selector: 'app-add',
	templateUrl: './add.page.html',
	styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
	list: ToDoList;
	itemName: string;

	constructor(private tasksService: TasksService, private route: ActivatedRoute) {
		const listID = this.route.snapshot.paramMap.get('listID');
		this.list = this.tasksService.getList(listID);
	}

	ngOnInit() {}

	addItem() {
		if (this.itemName.trim().length === 0) {
			return;
		}

		const newItem = new ToDoItem(this.itemName);
		this.list.items.push(newItem);
		this.itemName = '';
		this.tasksService.saveStorage();
	}

	changeCheck() {
		const pendings = this.list.items.filter((itemData) => !itemData.done).length;
		if (pendings === 0) {
			this.list.finishedIn = new Date();
			this.list.done = true;
		} else {
			this.list.finishedIn = null;
			this.list.done = false;
		}
		console.log(this.list);
		this.tasksService.saveStorage();
	}
}
