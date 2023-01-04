export { };

declare global {
    type Category = {
        id: string,
        name: string,
        tables: Array<{id: string, name:string, color:string}>,
    }
}