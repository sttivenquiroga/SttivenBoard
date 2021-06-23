import { Component, OnInit } from '@angular/core';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css'],
})
export class ListTaskComponent implements OnInit {
  public tasksData: any;
  public errorMessage: String;
  public successMessage: String;

  constructor(private board: BoardService) {
    this.tasksData = {};
    this.errorMessage = '';
    this.successMessage = '';
  }

  ngOnInit(): void {
    this.board.listTask().subscribe(
      (res) => {
        this.tasksData = res.board;
      },
      (err) => {
        this.errorMessage = err.error;
      }
    );
  }

  updateTask(task: any, status: String) {
    const tempStatus = task.status;
    task.status = status;
    this.board.updateTask(task).subscribe(
      (res) => {
        task.status = status;
      },
      (err) => {
        task.status = tempStatus;
        this.errorMessage = err.error;
        this.closeAlert();
      }
    );
  }

  deleteTask(task: any) {
    this.board.deleteTask(task).subscribe(
      (res) => {
        const index = this.tasksData.indexOf(task);
        if (index > -1) {
          this.tasksData.splice(index, 1);
          this.successMessage = res.message;
          this.closeAlert();
        }
      },
      (err) => {
        this.errorMessage = err.error;
        this.closeAlert();
      }
    );
  }

  closeAlert() {
    setTimeout(() => {
      this.errorMessage = '';
      this.successMessage = '';
    }, 2000);
  }

  closeX() {
    this.errorMessage = '';
    this.successMessage = '';
  }
}
