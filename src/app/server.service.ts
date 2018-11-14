import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable()
export class ServerService{

    constructor(private http:Http){
        
    }
    
    AddNewTask(tasks:any[]){
        // this method is not used as it can add duplicate entries of tasks
        return this.http.post('https://amtsybex-c92a7.firebaseio.com/data.json',  tasks)
    }

    storeTasks(tasks:any[]){
        // this is used for updation of tasks
        const headers =  new Headers({'Content-Type':'application/json'});
        return this.http.put('https://amtsybex-c92a7.firebaseio.com/data.json',  tasks,{headers:headers})
    }

    deleteTask(name: string) {
        return this.http.delete('https://amtsybex-c92a7.firebaseio.com/data.json' + "/?name" + "=" +name)
    }	

    getServers(){
        //used for retirval of tasks records
       return this.http.get('https://amtsybex-c92a7.firebaseio.com/data.json')
       .map(
           (response:Response) => {
               const data = response.json();
               for(const task of data){
                task.name = task.name;
                task.description=task.description;
               }
               return data;
           }
       ).catch(
           (error:Response) => {
               return Observable.throw('Something Went wrong');
           }
       );
   }
   getAppName(){
    return this.http.get('https://amtsybex-c92a7.firebaseio.com/appName.json').map(
        (response:Response) => {
            return response.json();
        }
    )
  }
}