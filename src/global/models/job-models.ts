import { Priority } from "../enums";

export interface JobResponse {
  id: string;
  name: string;
  description: string;
  recurring: boolean;
  managerId: string;
  priority: Priority;
  parentJobId?: string;
  dueDate: number;
  dateCreated: Date;
  dateModified: Date;
  active: boolean;
  assignedUserId?: string;
  zoneId: string;
}

export interface Job extends JobResponse {}
