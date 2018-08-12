/**
 * chain: run a sequence of async action functions.  Results (id) can be passed along
 * the sequence.
 * @param {func ...} actions A set of action functions that will be run in sequence
 * @results { Promise<id: Int> } most recent id returned by an action,
 * or a rejected error object.
 */
const chain = (...actions) => new Promise(async (resolve, reject) => {
  let currentId;
  let currentError;
  let currentSuccess = true;
  try {
    for (const action of actions) {
      if (currentSuccess) {
        // console.info(`INPUTS: id = ${currentId}`); //
        const { success, id, error } = await action(currentId);
        currentSuccess = success;
        currentId = id || currentId;
        currentError = error || currentError;
        // console.info(`OUTPUTS: success = ${success}; id = ${id}; error = ${error}`); //
      } // TODO: Else block to reject?
      if (currentError) {
        reject(Error(currentError));
      }
    };
    resolve(currentId);
  } catch (e) {
    reject(e);
  }
});

// Simple working chain
// chain(
//   () => { console.log(`get:`); return { success: true, id: undefined } },
//   () => { console.log(`create:`); return { success: true, id: 100 } },
//   (id) => { console.log(`set meta: ${id}`); return { success: true }; },
//   (id) => { console.log(`publish: ${id}`); return { success: true }; }
// )
//   .then(id => console.log(`RESULT OF CHAIN = ${id}`))
//   .catch(err => console.error(err.message))

// Chain with error
chain(
  () => { console.log(`get:`); return { success: true, id: undefined } },
  () => { console.log(`create:`); return { success: true, id: 100 } },
  (id) => { console.log(`set meta: ${id}`); return {success: false, error: 'This is an error'}; },
  (id) => { console.log(`publish: ${id}`); return { success: true }; }
)
  .then(id => console.log(`RESULT OF CHAIN = ${id}`))
  .catch(err => console.error(err.message))
