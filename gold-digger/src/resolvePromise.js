/**
 * Waiting for promise to resolve or reject to change the promise state
 */
function resolvePromise(promiseToResolve, promiseState, setState){
	promiseState.promise=promiseToResolve;
    promiseState.data= null;         
    promiseState.error= null;

    function saveDataACB(result){ 
        console.log("Data!");
        if(promiseState.promise !== promiseToResolve) return; // there exists a new promise

        console.log("Attempting to set data containing for example: " + result.id);
        setState({promise: promiseState.promise, error: promiseState.error, data: result});
        console.log("After attempting to set data, promiseState.data is: " + promiseState.data);
    } 
    
    function saveErrorACB(err)  { 
        console.log("Error!");
        if(promiseState.promise !== promiseToResolve) return; // there exists a new promise
        setState({promise: promiseState.promise, error: err, data: promiseState.data});
    }

    if (promiseState.promise === null) return;
    return promiseToResolve.then(saveDataACB).catch(saveErrorACB);
}

export default resolvePromise;