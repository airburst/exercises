/**
 * conditionalChain: run an initial action and test the result for truth. Based
 * on the test result, carry out one of two actions.
 * @param {func} firstAction The first function to run
 * @param {func} test The truth test, which accepts result object as param
 * @param {func} trueAction Invoke if truth test is true
 * @param {func} falseAction Invoke if truth test is false
 * @results { Promise<result: Object> } result of final action
 */
const conditionalChain = (firstAction, test, trueAction, falseAction) =>
  new Promise(async (resolve, reject) => {
    const checkForError = result => {
      if (!result || !result.success || result.error) {
        reject(Error(result.error || 'Unable to run first action'));
      }
    };
    let result;

    try {
      result = await firstAction();
      checkForError(result);
      const testResult = test(result);
      if (testResult) {
        result = await trueAction(result);
        checkForError(result);
      } else {
        result = await falseAction(result);
        checkForError(result);
      }
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });

// Simple upsert conditionalChain with true test
conditionalChain(
  () => { console.log(`get:`); return { success: true, id: 101 } },
  (result) => !!result.id,
  (result) => { console.log(`update: id=${result.id}`); return { success: true } },
  () => { console.log(`insert:`); return { success: true, id: 200 }; }
)
  .then(result => console.log(`RESULT OF conditionalChain = ${JSON.stringify(result)}`))
  .catch(err => console.error(err.message))

// Simple upsert conditionalChain with false test
// conditionalChain(
//   () => { console.log(`get:`); return { success: true, id: undefined } },
//   (result) => !!result.id,
//   (result) => { console.log(`update: id=${result.id}`); return { success: true } },
//   () => { console.log(`insert:`); return { success: true, id: 200 }; }
// )
//   .then(result => console.log(`RESULT OF conditionalChain = ${JSON.stringify(result)}`))
//   .catch(err => console.error(err.message))

// conditionalChain with error
// conditionalChain(
//   () => { console.log(`get:`); return { success: true, id: 100 } },
//   (result) => !!result.id,
//   (result) => { console.log(`update: id=${result.id}`); return { success: false, error: 'It broke' } },
//   () => { console.log(`insert:`); return { success: true, id: 200 }; }
// )
//   .then(result => console.log(`RESULT OF conditionalChain = ${JSON.stringify(result)}`))
//   .catch(err => console.error(err.message))
