import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto:GetTasksFilterDto): Task[] {
    if(Object.keys(filterDto).length){
      return this.tasksService.getTasksWithFilters(filterDto);
    }else{
      return this.tasksService.getAllTasks();
    }
    
  }


 
  @Get('/:id')
  getTaskById(@Param('id') id:string):Task{
    return this.tasksService.getTaskById(id);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id:string):void{
    this.tasksService.deleteTask(id);
  }


  // we made the body have title and description sperated so the request doesn't come with additional parameter that we don't know about
  @Post()
  createTask(@Body() createTaskDto:CreateTaskDto):Task {
    console.log('title', createTaskDto.title);
    console.log('description', createTaskDto.description);
    return this.tasksService.createTask(createTaskDto);
  }

  @Patch('/:id/status')
  update(@Param('id') id: string, @Body('status') status: TaskStatus):Task {
    console.log('status',status);
    return this.tasksService.updateTaskStatus(id,status);
  }
}
