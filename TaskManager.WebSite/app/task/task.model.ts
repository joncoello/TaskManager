export class TaskViewModel {
    public task: TaskItem;
    public categories: TaskCategory[];
}

export class TaskItem {
    public taskItemID: string;
    public taskName: string;
    public taskCategoryID: string;
    public categories: TaskCategory[];
}

export class TaskCategory {
    public taskCategoryID: string;
    public categoryName: string;
}