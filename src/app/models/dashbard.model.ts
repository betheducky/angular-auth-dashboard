import { User } from "./user.model";

export interface DashboardData {
    user: User,
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