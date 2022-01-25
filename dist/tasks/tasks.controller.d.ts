import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './dto/task.entity';
import { TaskStatus } from './task-status.enum';
import { TasksService } from './tasks.service';
export declare class TasksController {
    private tasksService;
    constructor(tasksService: TasksService);
    getTaskById(id: string): Promise<Task>;
    deleteTask(id: string): Promise<any>;
    createTask(createTaskDto: CreateTaskDto): Promise<Task>;
    update(id: string, status: TaskStatus): Promise<Task>;
}
