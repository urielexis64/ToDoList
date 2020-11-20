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
		private tasksService: TasksService,
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
				},
				{
					text: 'Create',
					handler: (data) => {
						const newListTitle = data.title.trim();
						if (newListTitle.length === 0) {
							return;
						}
						const repeatedName = this.lists.filter((list) => list.title === newListTitle).length;
						if (repeatedName !== 1) {
							const listID = this.tasksService.createList(newListTitle);
							this.router.navigateByUrl(`/tabs/tab1/add/${listID}`);
						} else {
							this.presentAlert('Hey!', 'You entered a name that is already in the list...');
						}
					},
				},
			],
		});

		alert.present();
		//this.router.navigateByUrl('tabs/tab1/add');
	}

	private async presentAlert(header: string, message: string) {
		const alert = await this.alertController.create({
			cssClass: 'my-custom-class',
			header,
			message,
			buttons: ['OK'],
		});

		await alert.present();
	}
}
