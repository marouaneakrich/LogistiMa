import { Worker, Job } from 'bullmq';
import { redisConnection } from './config/redis';
import { calculateOptimalRoute } from './services/QueueService';

const worker = new Worker(
  'logistima',
  async (job: Job) => {
    console.log(`Processing job: ${job.name} (${job.id})`);
    
    switch (job.name) {
      case 'calculate-route':
        await calculateOptimalRoute(job.data);
        break;
      case 'generate-receipt':
        await generateReceipt(job.data);
        break;
      default:
        throw new Error(`Unknown job type: ${job.name}`);
    }
  },
  { connection: redisConnection }
);

const generateReceipt = async (data: any) => {
  console.log(`📄 Generating receipt for package ${data.packageId}`);
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log(`✅ Receipt generated for package ${data.packageId}`);
};

worker.on('completed', job => {
  console.log(`✅ Job ${job.id} completed successfully`);
});

worker.on('failed', (job, err) => {
  console.error(`❌ Job ${job?.id} failed:`, err.message);
});

console.log('🔄 Worker process started and listening for jobs');