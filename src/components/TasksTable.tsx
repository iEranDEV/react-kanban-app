type TasksTableProps = {
    table: {
        name: string,
        color: string
    },
}

function TasksTable({ table }: TasksTableProps) {

    const tableColor = {
        backgroundColor: table.color
    }

    return (
        <div className="h-full px-4 flex flex-col gap-2 w-full md:w-60 overflow-y-auto">
            {/* Table header */}
            <div className="w-full flex items-center justify-between">
                {/* Table name and color */}
                <div className="flex gap-2 items-center">
                    <div className="rounded-full h-6 w-6 border-2 border-stone-100" style={tableColor}></div>
                    <p className=" text-sm uppercase font-semibold text-stone-700">{table.name}</p>
                </div>
            </div>
        </div>
    )
}

export default TasksTable;