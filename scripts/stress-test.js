const axios = require('axios');

const API_URL = process.env.API_URL || 'http://localhost:3000';
const CONCURRENT_REQUESTS = 50;

async function runStressTest() {
  console.log(`🎯 Running stress test with ${CONCURRENT_REQUESTS} concurrent requests...`);
  
  const promises = Array.from({ length: CONCURRENT_REQUESTS }, (_, i) => 
    axios.post(`${API_URL}/api/deliveries/assign`, {
      packageId: i + 1,
      driverId: 1
    }).catch(err => ({
      status: err.response?.status,
      data: err.response?.data
    }))
  );

  const results = await Promise.all(promises);
  
  const successCount = results.filter(r => r.status === 201).length;
  const conflictCount = results.filter(r => r.status === 409).length;
  
  console.log(`✅ Successes: ${successCount}`);
  console.log(`❌ Conflicts: ${conflictCount}`);
  
  if (successCount === 1 && conflictCount === CONCURRENT_REQUESTS - 1) {
    console.log('🎉 STRESS TEST PASSED!');
    process.exit(0);
  } else {
    console.log('💥 STRESS TEST FAILED!');
    process.exit(1);
  }
}
runStressTest();