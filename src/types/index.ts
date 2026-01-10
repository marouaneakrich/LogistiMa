export class ConflictError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConflictError';
  }
}

export interface AssignPackageRequest {
  packageId: number;
  driverId: number;
}

export interface QueueJobData {
  packageId: number;
  driverId?: number;
}