import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export type SubjectType = {
    id: number;
    name: string;
};
export type TeacherType = {
    id: number;
    name: string;
    email: string;
};

export type ScheduleType = {
    id: number;
    day_of_week: string;
    timeslot_id: number;
    subject_id: number;
    teacher_id: number;
    is_break: boolean;
    subject?: SubjectType;
    teacher?: TeacherType;
};

export type TimeslotType = {
    id: number;
    start_time: string;
    end_time: string;
};

export type addClassModalType = {
    isOpen: boolean;
    onClose: () => void;
    onSave: () => void;
    day: string;
    timeslot: TimeslotType;
};
