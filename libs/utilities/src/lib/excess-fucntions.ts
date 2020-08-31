// ====================================== Business Methods for Excess Upload with Form ======================================
//  export function setExcess(excessAmount: any) {
//   if (this.claimExcess !== null) {
//     const jobExcess = this.findExcessRow(this.claimExcess);
//     console.log({ JobExcess: jobExcess });
//     let params = {};
//     const excessVal = getExcessCalculationValue(excessAmount);
//     if (jobExcess.length === 0) {
//       params = { job_id: this.jobID, new_excess: this.makeExcessCard(excessVal) }; // Attach new excess to job
//     } else if (jobExcess.length >= 1) {
//       params = { excess_id: jobExcess[0].excess_id, new_value: excessVal }; // change existing excess
//     }
//     return params;
//   }
// }

export function findExcessRow(jobId: any, excess: any[]): any {
  // console.log({ search: excess, for: jobId });
  const res = [];
  excess.forEach((entry) => {
    if (entry['job_id'] === jobId) {
      if (entry['reason'] === 'Standard Excess') {
        res.push(entry);
      }
    }
  });
  return res;
}

export function makeExcessCard(excessAmount: number): object {
  return {
    amount: excessAmount,
    reason: 'Standard Excess',
    who_collects: 1,
    how_collect: 2,
  };
}

export function getExcessCalculationValue(fullValue: any, excessAmount: string): number {
  if (excessAmount.match(/[%]/g)) {
    const sNum = excessAmount.replace('%', '');
    const num = Number(sNum) / 100;
    const res = num * Number(fullValue);
    return res;
  } else {
    return Number(excessAmount);
  }
}
