import { CreateTaskDto } from './dto/create-task.dto';
import { TaskRepository } from './tasks.respository';
import { Task } from './dto/task.entity';
import { TaskStatus } from './task-status.enum';
export declare class TasksService {
    private tasksRepository;
    constructor(tasksRepository: TaskRepository);
    deleteTask(id: string): Promise<void>;
    getTaskById(id: string): Promise<Task>;
    createTask(createTaskDto: CreateTaskDto): Promise<Task>;
    updateTaskStatus(id: string, status: TaskStatus): Promise<Task>;
}
