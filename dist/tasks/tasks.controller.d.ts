import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';
export declare class TasksController {
    private tasksService;
    constructor(tasksService: TasksService);
    getTasks(filterDto: GetTasksFilterDto): Task[];
    getTaskById(id: string): Task;
    deleteTask(id: string): void;
    createTask(createTaskDto: CreateTaskDto): Task;
    update(id: string, status: TaskStatus): Task;
}