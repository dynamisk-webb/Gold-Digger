/*
* waitForFirebase displays loading screen when we are waiting to retrieve data from firebase as well as during the process of getting the async data (suspense)
*/

function waitForFirebase(firebasePromiseState) {
    if(firebasePromiseState.promise) {
        if (!firebasePromiseState.data) {
            if (!firebasePromiseState.error) {
                return <img src="https://i.giphy.com/media/Rd755PrtAEhZLLTt2N/giphy.webp" alt="Loading" className="fullLoading"></img>
            }
            return <div >{firebasePromiseState.error.toString()}</div>
        }

        // firebasepromise has been resolved
        return false;
    }
    // firebasepromise hasn't been requested yet
    return <img src="https://i.giphy.com/media/Rd755PrtAEhZLLTt2N/giphy.webp" alt="Loading" className="fullLoading"></img>
}

export default waitForFirebase;