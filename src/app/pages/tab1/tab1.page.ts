import {Component} from '@angular/core';
import {TasksService} from '../../services/tasks.service';
import {ToDoList} from '../../models/todolist.model';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';

@Component({
	selector: 'app-tab1',
	templateUrl: 'tab1.page.html',
	styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
	lists: ToDoList[];

	constructor(
		public tasksService: TasksService,
		private router: Router,
		private alertController: AlertController
	) {
		this.lists = tasksService.lists;
	}

	async addList() {
		const alert = await this.alertController.create({
			cssClass: 'my-custom-class',
			header: 'New List',
			inputs: [
				{
					name: 'title',
					type: 'text',
					placeholder: 'List name',
				},
			],
			buttons: [
				{
					text: 'Cancel',
					role: 'cancel',
					handler: () => {},
				},
				{
					text: 'Create',
					handler: (data) => {
						if (data.title.trim().length === 0) {
							return;
						} else {
							this.tasksService.createList(data.title);
						}
					},
				},
			],
		});

		alert.present();
		//this.router.navigateByUrl('tabs/tab1/add');
	}
}
