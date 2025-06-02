// TimetableGrid with subject rendering for each cell
import AddClassModal from '@/components/add-modal';
import TableHeader from '@/components/table-header';
import { ScheduleType, TimeslotType } from '@/lib/utils';

import axios from 'axios';
import { useEffect, useState } from 'react';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function TimetableGrid() {
    const [schedules, setSchedules] = useState<ScheduleType[]>([]);
    const [timeslots, setTimeslots] = useState<TimeslotType[]>([]);

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedDay, setSelectedDay] = useState<string>();
    const [selectedTimeslot, setSelectedTimeslot] = useState<TimeslotType | null>(null);

    useEffect(() => {
        axios.get('http://localhost:8000/schedules').then((res) => {
            console.log('Fetched schedules:', res.data);
            setSchedules(res.data);
        });
        axios.get('http://localhost:8000/timeslots').then((res) => {
            console.log('Fetched timeslots:', res.data);
            setTimeslots(res.data);
        });
    }, [modalOpen]); // refetch when modal closes

    const findSchedule = (day: string, slotId: number) => {
        return schedules.find((s) => s.day_of_week === day && s.timeslot_id === slotId);
    };

    return (
        <div className="overflow-x-auto p-4">
            <table className="w-full table-auto border-collapse rounded-md shadow-lg">
                <TableHeader />
                <tbody>
                    {timeslots?.map((slot) => (
                        <tr key={slot.id}>
                            <td className="bg-blue-600 px-2 py-4 text-center text-sm font-medium text-white">
                                {slot.start_time} - {slot.end_time}
                            </td>

                            {days.map((day) => {
                                const schedule = findSchedule(day, slot.id);

                                return (
                                    <td key={`${day}-${slot.id}`} className="border border-gray-300 px-4 py-4 text-center">
                                        {schedule ? (
                                            schedule.is_break ? (
                                                <div className="font-medium text-red-500">Break</div>
                                            ) : (
                                                <div className="overflow-hidden text-sm text-gray-800">
                                                    <div>{schedule.subject?.name || 'Loading...'}</div>
                                                    <div className="text-xs text-gray-500">{schedule.teacher?.name || ''}</div>
                                                </div>
                                            )
                                        ) : (
                                            <button
                                                onClick={() => {
                                                    setSelectedDay(day);
                                                    setSelectedTimeslot(slot);
                                                    setModalOpen(true);
                                                }}
                                                className="text-sm text-blue-500 underline"
                                            >
                                                + Add
                                            </button>
                                        )}
                                    </td>
                                );
                            })}

                            <td className="bg-blue-600 px-2 py-4 text-center text-sm font-medium text-white">
                                {slot.start_time} - {slot.end_time}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <AddClassModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSave={() => setModalOpen(false)}
                day={selectedDay!}
                timeslot={selectedTimeslot!}
            />
        </div>
    );
}
