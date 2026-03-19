

export interface TaskType {
    id: string;
    title: string | null;
    done: boolean;
}

export type TaskFilter = "all" | "todo" | "done";