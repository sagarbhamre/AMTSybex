import { Component } from '@angular/core';
import { ServerService } from './server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  appName = "amtsybex";
  tasks = [
    {
      name: 'mock Task',
      description: "my mock Task"
    }
  ];

  constructor(private serverService:ServerService){}

  onAddTask(name: string, description: string) {
    if(name ==""){
     name = "Mock Task"   
    }
    if(description == ""){
      description = "Mock Description"
    }
    this.tasks.push({
      name: name,
      description: description
    });
    this.serverService.storeTasks(this.tasks).subscribe(
      (response) => {
        console.log(response)
      },
      (error) => console.log(error)
    );
  }
  
  onUpdate(){
    this.serverService.storeTasks(this.tasks).subscribe(
      (response) => {
        console.log(response)
      },
      (error) => console.log(error)
    );
  }

  onGet(){
    this.serverService.getServers().subscribe(
      (tasks:any[]) => this.tasks = tasks,
      (error) => console.log(error)
    );
  }

  onDelete(name: string) {
    this.serverService.deleteTask(name).subscribe(
      (response) => {
        console.log(response)
      },
      (error) => console.log(error)
    )  
 }

}