import {Component, Input, ViewChild} from '@angular/core';
import {TasksService} from '../../services/tasks.service';
import {ToDoList} from '../../models/todolist.model';
import {Router} from '@angular/router';
import {AlertController, IonList} from '@ionic/angular';

@Component({
	selector: 'app-lists',
	templateUrl: './lists.component.html',
	styleUrls: ['./lists.component.scss'],
})
export class ListsComponent {
	@ViewChild(IonList) ionList: IonList;
	@Input() done: boolean;

	constructor(
		public tasksService: TasksService,
		private router: Router,
		private alertController: AlertController
	) {}

	openList(id) {
		if (this.done) {
			this.router.navigateByUrl(`tabs/tab2/add/${id}`);
			return;
		}
		this.router.navigateByUrl(`tabs/tab1/add/${id}`);
	}

	async editList(list: ToDoList) {
		const alert = await this.alertController.create({
			header: 'Edit title',
			inputs: [
				{
					name: 'title',
					type: 'text',
					value: list.title,
				},
			],
			buttons: [
				{
					text: 'Cancel',
					role: 'cancel',
					handler: () => {
						this.ionList.closeSlidingItems();
					},
				},
				{
					text: 'OK',
					handler: (data) => {
						const newListTitle = data.title.trim();
						if (newListTitle.length === 0) {
							return;
						}
						const repeatedName = this.tasksService.lists.filter(
							(list) => list.title === newListTitle
						).length;
						if (repeatedName !== 1) {
							this.tasksService.editList(list, newListTitle);
						} else {
							this.presentAlert('Hey!', 'You can not add a repeated title...');
						}
						this.ionList.closeSlidingItems();
					},
				},
			],
		});

		alert.present();
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

	removeList(list: ToDoList) {
		this.tasksService.removeList(list);
	}
}
