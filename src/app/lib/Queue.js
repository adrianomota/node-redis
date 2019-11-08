import Queue from 'bull';
import redisConfig from '../../config/redis';

import * as jobs from '../jobs';

const queues = Object.values(jobs).map(job => ({
  bull: new Queue(job.key, redisConfig),
  name: job.key,
  handle: job.handle,
  options: job.options,
}));

export default {
  queues,
  add(name, data) {
    const queue = queues.find(q => q.name === name);
    return queue.bull.add(data, queue.options);
  },

  process() {
    return this.queues.forEach(q => {
      q.bull.process(q.handle);
      q.bull.on('failed', (job, err) => {
        console.log('job failed', job.name, job.data);
        console.log(err);
      });
    });
  },
};
// import RegistrationMail from '../jobs/RegistrationMail';

// const mailQueue = new Queue(RegistrationMail.key, redisConfig);

// mailQueue.on('failed', job => {
//   console.log('job failed', job.name, job.data);
// });
// export default mailQueue;
