import { Queue } from 'bullmq';
import { redisClient } from '../config/redis';

const queue = new Queue('logistima', { connection: redisClient });

export class QueueService {
    static async addRouteCalculationJob(data: any): Promise<void> {
        await queue.add('calculate-route', data, {
            attempts: 3,
            backoff: {
                type: 'exponential',
                delay: 1000
            }
        });
    }

    static async addReceiptGenerationJob(data: any): Promise<void> {
        await queue.add('generate-receipt', data, {
            attempts: 3,
            backoff: {
                type: 'fixed',
                delay: 2000
            }
        });
    }

    static async getJobCounts(): Promise<any> {
        return await queue.getJobCounts();
    }
}

export const calculateOptimalRoute = async (data: any) => {
    console.log(`🗺️  Calculating route for package ${data.packageId}`);
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(`✅ Route calculated for package ${data.packageId}`);
    return { route: 'optimized_path', distance: 15.5 };
};