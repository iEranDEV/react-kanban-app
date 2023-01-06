export { };

declare global {
    type Category = {
        id: string,
        name: string,
        tables: Array<{id: string, name:string, color:string}>,
    }

    type Task = {
        id: string,
        categoryID: string,
        tableID: string,
        name: string,
        description: string,
        subtasks: Array<{id: string, value: string, done: boolean}>,
    }
}