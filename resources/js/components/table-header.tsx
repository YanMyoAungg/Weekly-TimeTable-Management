const TableHeader = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <>
            <thead>
                <tr>
                    <th className="rounded-tl-md bg-blue-800 px-4 py-2 text-white">Time</th>
                    {days.map((day) => (
                        <th key={day} className={`px-4 py-2 text-white ${day === 'Sat' ? 'bg-red-500' : 'bg-blue-600'}`}>
                            {day}
                        </th>
                    ))}
                    <th className="rounded-tr-md bg-blue-800 px-4 py-2 text-white">Time</th>
                </tr>
            </thead>
        </>
    );
};

export default TableHeader;
