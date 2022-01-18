import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
export declare class TasksService {
    private tasks;
    deleteTask(id: string): void;
    getTaskById(id: string): Task;
    getTasksWithFilters(filterDto: GetTasksFilterDto): Task[];
    getAllTasks(): Task[];
    createTask(createTaskDto: CreateTaskDto): Task;
    updateTaskStatus(id: string, status: TaskStatus): Task;
}