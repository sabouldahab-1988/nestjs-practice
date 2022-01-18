import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
@Injectable()
export class TasksService {

  private tasks: Task[] = [];

  deleteTask(id:string):void{
    const index = this.tasks.findIndex(t=>t.id===id);
    if (index > -1) {
       this.tasks.splice(index, 1);
    }
  };

  getTaskById(id:string): Task {
    return this.tasks.filter(t=>t.id===id)[0];
  }

  getTasksWithFilters(filterDto:GetTasksFilterDto):Task[]{
    const {status,search}=filterDto;
    let tasks=this.getAllTasks();
    if(status){
      tasks=tasks.filter(t=>t.status===status);
    }
    if(search){
      tasks=tasks.filter(t=>{
        if(t.title.includes(search) || t.description.includes(search)){
          return true;
        }
        return false;
      })
    }
    return tasks;
  }

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(createTaskDto:CreateTaskDto): Task {
    const {title,description}=createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);

    return task;
  }

  updateTaskStatus(id:string,status: TaskStatus):Task {
    const task=this.getTaskById(id);
    task.status=status;
    return task;
  }
  
}
