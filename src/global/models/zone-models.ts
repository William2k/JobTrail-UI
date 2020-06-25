export interface ZoneResponse {
  id: string;
  name: string;
  description: string;
  public: boolean;
  managerId: number;
  parentZoneId: number;
  dateCreated: Date;
  dateModified: Date;
  active: boolean;
}

export interface Zone extends ZoneResponse {}
