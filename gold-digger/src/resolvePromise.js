/**
 * Waiting for promise to resolve or reject to change the promise state
 */
function resolvePromise(promiseToResolve, promiseState){
	promiseState.promise=promiseToResolve;
    promiseState.data= null;         
    promiseState.error= null;

    function saveDataACB(result){ 
        if(promiseState.promise !== promiseToResolve) return; // there exists a new promise
        promiseState.data = result;
    } 
    
    function saveErrorACB(err)  { 
        if(promiseState.promise !== promiseToResolve) return; // there exists a new promise
        promiseState.error = err;
    }

    if (promiseState.promise === null) return;
    promiseToResolve.then(saveDataACB).catch(saveErrorACB);

}

export default resolvePromise;