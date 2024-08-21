import { Component, OnInit } from '@angular/core';
import { Task } from '../../Models/Task.model';
import { EtudiantService } from '../../Services/etudiant.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit{
  isModalOpen = false;
  updateModal=false;
  tasks: Task[] = [];
  newTask!: Task;
  updatedTask!: Task;
  etudiantId: number = 39;
  days: { number: number, date: Date }[] = [];
  activeDropdownTaskId: number | null = null;
  taskForm!: FormGroup;
  updateTaskForm!: FormGroup;

  constructor(private service: EtudiantService,private formBuilder:FormBuilder,private updateformBuilder:FormBuilder) { }
  ngOnInit(): void {
    this.loadTasks();
    this.taskForm = this.formBuilder.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      startDateTime: [null, Validators.required],
      endDateTime: [null, Validators.required],
      completed: [false],
    });
    this.updateTaskForm = this.updateformBuilder.group({
      id: [''],
      title: [null],
      description: [null],
      startDateTime: [null],
      endDateTime: [null],
    });
  }
  loadTasks(){
    this.service.getStudentTasks(this.etudiantId).subscribe(
      data => {
        console.log(data);
        this.tasks = data;
        this.generateCalendar();
      }
    );
  }
  addTask(){
    this.newTask = this.taskForm.value;
    this.service.addTask(this.newTask,this.etudiantId).subscribe(
      data => {
        console.log(data);
        this.loadTasks();
        location.reload();
      }
    );
  }
  markTaskAsComplete(taskId: number): void {
    this.service.markTaskAsComplete(taskId).subscribe(
      data => {
        console.log(data);
        this.loadTasks();
      }
    );
  }
  updateTask(): void {
    this.updatedTask = this.updateTaskForm.value;
    this.service.updateTask(this.updatedTask,this.updatedTask.id).subscribe(
      data => {
        console.log(data);
        this.loadTasks();
        location.reload();
      },
      error => {
        console.log(error);
      }
    );
  }
  deleteTask(taskId: number): void {
    this.service.deleteTask(taskId).subscribe(
      data => {
        console.log(data);
        this.loadTasks();
      });
  }

  generateCalendar(): void {
    const currentDate = new Date();
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    
    const daysInMonth = endOfMonth.getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      this.days.push({ 
        number: i, 
        date: new Date(currentDate.getFullYear(), currentDate.getMonth(), i) 
      });
    }
  }

  isSameDay(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }
  toggleDropdown(taskId: number): void {
    if (this.activeDropdownTaskId === taskId) {
      this.activeDropdownTaskId = null;
    } else {
      this.activeDropdownTaskId = taskId;
    }
  }

  isDropdownOpen(taskId: number): boolean {
    return this.activeDropdownTaskId === taskId;
  }
  openModal() {
    this.isModalOpen = true;
    //duration and animation
  }

  closeModal() {
    this.isModalOpen = false;
  }
  openUpdateModal(task: Task): void {
    this.updateModal = true;
    this.updateTaskForm.patchValue({
      id: task.id, 
      title: task.title,
      description: task.description,
      startDateTime: task.startDateTime,
      endDateTime: task.endDateTime
    });
  }

  closeUpdateModal() {
    this.updateModal = false;
  }
}
