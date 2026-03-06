import { Observable } from "rxjs";
import { User } from "./user.model";

export interface DashboardData {
    user: Observable <User | null>,
    projects: string[],
    tasks: string[],
    alerts: string[],
    stats: {
        infoMessage: string,
        projectCount: number,
        taskCount: number,
        alertCount: number
    }
}