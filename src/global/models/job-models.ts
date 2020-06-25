import { Priority } from "../enums";

export interface JobResponse {
  id: string;
  name: string;
  description: string;
  recurring: boolean;
  managerId: number;
  priority: Priority;
  parentJobId: number;
  dueDate: number;
  dateCreated: Date;
  dateModified: Date;
  active: boolean;
  assignedUserId: number;
  zoneJobId: number;
}

export interface Job extends JobResponse {}
