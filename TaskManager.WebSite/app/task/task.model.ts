export class TaskListViewModel {
    public categoryID: string;
    public categoryName: string;
    public tasks: TaskItem[];
    constructor() {
        this.tasks = new Array<TaskItem>();
    }
}

export class TaskViewModel {
    public task: TaskItem;
    public categories: TaskCategory[];
}

export class TasksViewModel {
    public tasks: TaskItem[];
    public categories: TaskCategory[];
}

export class TaskItem {
    public taskItemID: string;
    public taskName: string;
    public taskCategoryID: string;
    public category: TaskCategory;
    public categories: TaskCategory[];
}

export class TaskCategory {
    public taskCategoryID: string;
    public categoryName: string;
}