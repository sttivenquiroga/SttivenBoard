import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-save-task',
  templateUrl: './save-task.component.html',
  styleUrls: ['./save-task.component.css'],
})
export class SaveTaskComponent implements OnInit {
  public taskData: any;
  public errorMessage: String;
  constructor(private auth: AuthService, private router: Router) {
    this.taskData = {};
    this.errorMessage = '';
  }

  ngOnInit(): void {}
  saveTask(){
  }
  closeAlert() {
    setTimeout(() => {
      this.errorMessage = '';
    }, 2000);
  }
  closeX() {
    this.errorMessage = '';
  }
}
