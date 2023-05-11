/*
* promiseNoData displays loading screen when retrieving asynchronous data (suspense)
*/

function promiseNoData(searchPromiseState) {
    console.log("in promise:",searchPromiseState);
    if(searchPromiseState.promise) {
        if (!searchPromiseState.data) {
            if (!searchPromiseState.error) {
                return <img src="https://i.giphy.com/media/Rd755PrtAEhZLLTt2N/giphy.webp" alt="Loading" id="loading"></img>
            }

            return <div >{searchPromiseState.error.toString()}</div>
        }

        return false;
    }
    
    return <div>No data</div>    
}

export default promiseNoData;