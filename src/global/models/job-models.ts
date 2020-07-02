import { Priority } from "../enums";

export interface JobResponse {
  id: string;
  name: string;
  description: string;
  recurring: boolean;
  managerId: string;
  priority: Priority;
  parentJobId?: string;
  dueDate: string;
  dateCreated: string;
  dateModified: string;
  active: boolean;
  assignedUserId?: string;
  zoneId: string;
}

export interface Job extends JobResponse {}

export interface AddJob {
  name: string;
  description: string;
  isRecurring: boolean;
  priority: Priority;
  dueDate: string;
  managerId: string;
  zoneId: string;
  assignedUserId: string | null;
  parentJobId: string | null;
}
