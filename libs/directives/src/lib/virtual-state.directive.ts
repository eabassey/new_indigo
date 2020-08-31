export const applyVirtualStates = (claims: any[]) => claims.map(runLogic);

const runLogic = (claim) => {
  jobCompleted = 0;
  paymentApproved = 0;
  repudiated = 0;
  watingRepudiation = 0;
  jobsCancelled = 0;
  j = 0;

  // if (claim.state === 15) {
  //   moveClaimIfAllJobsInPool(claim, jobCompletedStatePool, 55);
  // } else if ([3, 5, 102].includes(claim.state)) {
  //   moveClaimIfAllJobsInPool(claim, jobCompletedStatePool, 31);
  // } else if ([74, 73].includes(claim.state)) {
  //   if ((claim.valid_job = '0')) moveClaimIfAllJobsInPool(claim, jobCompletedStatePool, 55);
  // } else if (claim.state !== 14) {
  //   moveClaimIfAllJobsInPool(claim, jobStatesForCustomerRatingPool, 14);
  // }

  claim.jobs.every((job) => {
    checkAllJobsComplete(job, jobCompletedStates),
      checkPaymentInitiated(job, paymentStates),
      checkRepudiation(job, repudiationExceptions),
      checkAllJobsCancelled(job, jobCompletedStates);
  });

  if (paymentApproved === 0) {
    const exists = claimExceptions.includes(claim.state);
    if (exists === false) {
      checkJobException(claim, jobExceptions);
      if (j === 0) {
        claim.state = 14;
      }
    }
  }

  if (jobCompleted === 0) {
    const state = claim.state;

    switch (state) {
      case 3:
      case 5:
      case 102:
        claim.state = 12;
        break;
      case 15:
        claim.state = 55;
        break;
      case 73:
      case 74:
        if (claim.valid_job === 0) {
          claim.state = 55;
        }
        break;
    }
  }

  if (claim.jobs.length === 1) {
    if (claim.jobs[0].supplier_type === 2 || claim.jobs[0].supplier_type === 3) {
      if (claim.state != 55) {
        if (claim.jobs[0].state === 28) {
          claim.state = 12; //might be 14
        }
      }
    }
  }

  if (repudiated === 1 && watingRepudiation === 0) {
    claim.state = 71;
  }

  if (jobsCancelled === 0) {
    const exists = cancelledJobExceptions.includes(claim.state);

    if (exists === true) {
      claim.state = 44;
    }
  }

  return claim;
};

// const moveClaimIfAllJobsInPool = (claim: any, statePool: number[], destinationState: number) => {
//   const canMove = claim.jobs.every((job) => statePool.includes(job.state));
//   if (canMove) {
//     claim.state = destinationState;
//   }
// };

const checkAllJobsComplete = (job: any, statePool: number[]) => {
  const exists = statePool.includes(job.state);
  if (exists === false) {
    jobCompleted = -1; // job is not complete or cancelled
  }
};

const checkPaymentInitiated = (job: any, statePool: number[]) => {
  const exists = statePool.includes(job.state);
  if (exists === false) {
    if (job.supplier_type != 4) {
      paymentApproved = 1;
    }
  }
};

const checkJobException = (claim: any, statePool: number[]) => {
  const exists = claim.jobs.every((job) => statePool.includes(job.state));
  if (exists === true) {
    j = 1;
  }
};

const checkRepudiation = (job: any, statePool: number[]) => {
  const exists = statePool.includes(job.state);
  if (exists === true) {
    watingRepudiation = 1;
  }

  if (job.valid_job === 2) {
    repudiated = 1;
  }
};

const checkAllJobsCancelled = (job: any, statePool: number[]) => {
  if (job.state != 41 || job.state != 45) {
    jobsCancelled = -1;
  }
};

// POOLS

var jobCompleted = 0;
var paymentApproved = 0;
var repudiated = 0;
var watingRepudiation = 0;
var jobsCancelled = 0;
var j = 0;

const jobStatesForCustomerRatingPool = [26, 27, 30, 34, 38, 40, 50, 51, 52];
const jobCompletedStates = [28, 41, 45, 154];

const jobExceptions = [45, 56, 58, 59, 60, 72, 89, 154];
const claimExceptions = [12, 15, 18, 31, 55, 150];
const paymentStates = [25, 26, 27, 28, 30, 34, 38, 40, 45, 50, 51, 52];
const repudiationExceptions = [20, 21, 22, 23, 32, 37];
const cancelledJobExceptions = [1, 2, 3, 15, 102];
