/*
* waitForFirebase displays loading screen when we are waiting to retrieve data from firebase as well as during the process of getting the async data (suspense)
*/

function waitForFirebase(firebasePromiseState) {
    if(firebasePromiseState.promise) {
        if (!firebasePromiseState.data) {
            if (!firebasePromiseState.error) {
                return <center><img src="https://media.giphy.com/media/VbnUQpnihPSIgIXuZv/giphy.gif" class="center"></img></center>
            }
            return <div >{firebasePromiseState.error.toString()}</div>
        }

        // firebasepromise has been resolved
        return false;
    }
    // firebasepromise hasn't been requested yet
    return <center><img src="https://media.giphy.com/media/VbnUQpnihPSIgIXuZv/giphy.gif"></img></center>
}

export default waitForFirebase;