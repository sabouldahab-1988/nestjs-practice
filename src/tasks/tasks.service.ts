import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './tasks.respository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './dto/task.entity';
import { TaskStatus } from './task-status.enum';
import { DeleteResult } from 'typeorm';
@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(TaskRepository)
    private tasksRepository:TaskRepository
    ){
  }


  async deleteTask(id:string):Promise<void>{
    const resp=await this.tasksRepository.delete(id);
    if(resp.affected===0) {
      throw new NotFoundException(`Task not found to delete`);
    }
    // return this.tasksRepository.delete(id).then((resp)=>{
    //   resp.affected;
    //   if(resp.affected===0){
    //   }
    // });
  };

  async getTaskById(id:string):Promise<Task> {
    const found=await this.tasksRepository.findOne(id);
    if(!found){
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return found;
  }

  // getTasksWithFilters(filterDto:GetTasksFilterDto):Task[]{
  //   const {status,search}=filterDto;
  //   let tasks=this.getAllTasks();
  //   if(status){
  //     tasks=tasks.filter(t=>t.status===status);
  //   }
  //   if(search){
  //     tasks=tasks.filter(t=>{
  //       if(t.title.includes(search) || t.description.includes(search)){
  //         return true;
  //       }
  //       return false;
  //     })
  //   }
  //   return tasks;
  // }

  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  createTask(createTaskDto:CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  async updateTaskStatus(id:string,status: TaskStatus):Promise<Task> {
    const task=await this.getTaskById(id);
    
    task.status=status;
    await this.tasksRepository.save(task);

    return task;
  }
  
}
