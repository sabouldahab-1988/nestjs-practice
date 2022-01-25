import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './dto/task.entity';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus } from './task-status.enum';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto:GetTasksFilterDto): Task[] {
return this.tasksService.getTasks(filterDto);    
  }


 
  @Get('/:id')
  getTaskById(@Param('id') id:string):Promise<Task>{
    return this.tasksService.getTaskById(id);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id:string):Promise<any>{
    return this.tasksService.deleteTask(id);
  }


  // // we made the body have title and description sperated so the request doesn't come with additional parameter that we don't know about
  @Post()
  createTask(@Body() createTaskDto:CreateTaskDto):Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Patch('/:id/status')
  update(@Param('id') id: string, @Body('status') status: TaskStatus):Promise<Task> {
    return this.tasksService.updateTaskStatus(id,status);
  }
}
