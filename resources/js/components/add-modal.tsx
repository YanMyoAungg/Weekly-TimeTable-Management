// ✅ Revised version of AddClassModal using useRef, isBreak state, and Tailwind toggle
import { addClassModalType, SubjectType, TeacherType } from '@/lib/utils';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

export default function AddClassModal({ isOpen, onClose, onSave, day, timeslot }: addClassModalType) {
    const [subjects, setSubjects] = useState<SubjectType[] | null>(null);
    const [teachers, setTeachers] = useState<TeacherType[] | null>(null);
    const [isBreak, setIsBreak] = useState<boolean>(false);

    const subjectRef = useRef<HTMLSelectElement | null>(null);
    const teacherRef = useRef<HTMLSelectElement | null>(null);
    const isBreakRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (!isOpen) return;
        axios.get('http://localhost:8000/subjects').then((res) => setSubjects(res.data));
        axios.get('http://localhost:8000/teachers').then((res) => setTeachers(res.data));
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            day_of_week: day,
            timeslot_id: timeslot.id,
            subject_id: subjectRef.current?.value,
            teacher_id: teacherRef.current?.value,
            is_break: isBreakRef.current?.checked,
        };

        await axios.post('http://localhost:8000/schedules', payload);
        onSave();
        onClose();
    };

    return isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-brightness-20">
            <div className="w-full max-w-md rounded-md bg-black p-6 text-white shadow-md">
                <h2 className="mb-2 text-lg font-semibold">Create new schedule</h2>
                <p className="mb-1 text-sm font-medium">Day: {day}</p>
                <p className="mb-4 text-sm font-medium">
                    Time: {timeslot.start_time} - {timeslot.end_time}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex items-center space-x-3">
                        <span className="text-sm">IsBreak</span>
                        <div className="relative inline-block h-5 w-11">
                            <input
                                id="switch-is-break"
                                type="checkbox"
                                ref={isBreakRef}
                                checked={isBreak}
                                onChange={() => setIsBreak(!isBreak)}
                                className="peer h-5 w-11 cursor-pointer appearance-none rounded-full bg-slate-100 transition-colors duration-300 checked:bg-blue-600"
                            />
                            <label
                                htmlFor="switch-is-break"
                                className="absolute top-0 left-0 h-5 w-5 cursor-pointer rounded-full border border-slate-300 bg-gray-900 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-blue-600 peer-checked:bg-white"
                            ></label>
                        </div>
                    </div>

                    <div>
                        <select ref={subjectRef} className="w-full rounded border p-2" required>
                            <option className="bg-black" value="">
                                Select Subject
                            </option>
                            {subjects?.map((subject) => (
                                <option className="bg-black" key={subject.id} value={subject.id}>
                                    {subject.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="mb-1 block text-sm">Teacher</label>
                        <select ref={teacherRef} className="w-full rounded border p-2" required>
                            <option className="bg-black" value="">
                                Select Teacher
                            </option>
                            {teachers?.map((teacher) => (
                                <option className="bg-black" key={teacher.id} value={teacher.id}>
                                    {teacher.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={onClose} className="rounded border px-4 py-2">
                            Cancel
                        </button>
                        <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-white">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    ) : null;
}
