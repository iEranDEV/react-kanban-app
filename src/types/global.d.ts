export { };

declare global {
    type Category = {
        id: string,
        name: string,
        tables: Array<{name:string, color:string}>,
    }
}