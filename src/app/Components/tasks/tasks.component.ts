import { Component, OnInit } from '@angular/core';
import { Task } from '../../Models/Task.model';
import { MatDialog } from '@angular/material/dialog';
import { EtudiantService } from '../../Services/etudiant.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Etudiant } from '../../Models/Etudiant.model';
import { AuthService } from '../../Services/auth.service';

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
  
  etudiant!:Etudiant;
  AllEtudiant!:Etudiant[];
  activeDropdownTaskId: number | null = null;
  taskForm!: FormGroup;
  updateTaskForm!: FormGroup;
  imageUrl!: SafeUrl;
  email!:string;

  constructor(private service: EtudiantService,private formBuilder:FormBuilder,private updateformBuilder:FormBuilder,
    public dialog: MatDialog,private route: Router, private sanitizer: DomSanitizer,private authService: AuthService
   ) { }
  ngOnInit(): void {
    this.getUser(this.authService.getAuthenticatedUser()).then(()=>{
      this.loadAuthStudentImage();
      
      this.loadTasks();
    });
    

   
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
 
  loadAuthStudentImage(){
    if(this.etudiant){    
    this.service.getEtudiant(this.etudiant.id).subscribe(
      data => {
        this.etudiant = data;
        this.fetchImage(this.etudiant.image.name);
      },
      error => {
        console.log(error);
      })
    }
  }
  getUser(email:string): Promise<void> {
    email=this.authService.getAuthenticatedUser();
    return new Promise((resolve, reject) =>{
      this.service.getEtudiants().subscribe(
        data => {
          this.AllEtudiant = data;
          for(let i=0;i<this.AllEtudiant.length;i++){
            if(this.AllEtudiant[i].email===email){
              this.etudiant=this.AllEtudiant[i];
              break;
            }
            resolve();
          }
          console.log(this.etudiant);
        },
        error => {
          console.log(error);
          reject(error);
        }
      );
    })
  }
  
  loadTasks(){
    if(this.etudiant){
      this.service.getStudentTasks(this.etudiant.id).subscribe(
        data => {
          console.log(data);
          this.tasks = data;
         
        }
      );
    }
 
  }
  addTask(){
    this.newTask = this.taskForm.value;
    this.service.addTask(this.newTask,this.etudiant.id).subscribe(
      data => {
        console.log(data);
        this.closeModal();
        this.loadTasks();
        this.taskForm.reset();
      }
    );
  }
  markTaskAsComplete(taskId: number): void {
    const alert=window.confirm("Etes-vous sur de marquer la tache comme terminée?");
    if(alert===true){
      this.service.markTaskAsComplete(taskId).subscribe(
        data => {
          console.log(data);
          this.loadTasks();
        }
      );
    }else{
      window.alert("Tache n'est pas marquer terminée");
    }
   
  }
  updateTask(): void {
    this.updatedTask = this.updateTaskForm.value;
    this.service.updateTask(this.updatedTask,this.updatedTask.id).subscribe(
      data => {
        console.log(data);
        this.updateTaskForm.reset();
        this.closeUpdateModal();
        this.loadTasks();
      
      },
      error => {
        console.log(error);
      }
    );
  }
  deleteTask(taskId: number): void {
    const alert=window.confirm("Voulez-vous vraiment suprrimer cette tache?");
    if(alert===true){
      this.service.deleteTask(taskId).subscribe(
        data => {
          console.log(data);
          this.loadTasks();
        });
    }
 
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
  fetchImage(fileName: string): void {
    this.service.getImage(fileName).subscribe(
      (blob: Blob) => {
        const objectURL = URL.createObjectURL(blob);
        this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      },
      error => {
        console.error('Error fetching image', error);
      }
    );
  }
}
