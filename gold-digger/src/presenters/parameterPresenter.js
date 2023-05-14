import FilterView from "../views/filterView";
import ParameterView from "../views/parameterView";
import { useEffect, useState } from "react";

function Parameters (props) {
    // debug
    // props.model.debugModelState("/parameter init");

    // add observer for notifications for state changes
    useEffect(addObserverOnCreatedACB, [])
    const [, forceReRender ]= useState(); 

    function addObserverOnCreatedACB() {
        props.model.addObserver(notifyACB);

        function removeObserverOnDestroyACB() {
            props.model.removeObserver(notifyACB);
        }
        return removeObserverOnDestroyACB;
    }

    // rerender on state change
    function notifyACB() {
        forceReRender({});
        //props.model.debugModelState("/parameter rerender");
    }


    return (
        <div id="parameterMainGrid">
            <FilterView 
                filterType="parameter" 
                title="Select Parameters" 
                noTitle="Step 4 of 4" 
                nextTitle="Generate"
                loadingComplete={true}></FilterView>
            <ParameterView id="parameterGridPlacement" model={props.model} changeTempo={changeTempoACB} changeLoudness={changeLoudnessACB} changeInstrumentalness={changeInstrumentalnessACB} changeDanceable={changeDanceableACB} changeAcoustic={changeAcousticACB}></ParameterView>
        </div>
    );
    
    function changeTempoACB(arr) {
        props.model.setTempo(arr[0], arr[1]);
    }
    function changeLoudnessACB(arr) {
        props.model.setLoudness(arr[0], arr[1]);
    }
    function changeInstrumentalnessACB(arr) {
        props.model.setInstrumentalness(arr[0], arr[1]);
    }
    function changeDanceableACB(value) {
        props.model.setDanceable(value);
    }
    function changeAcousticACB(value) {
        props.model.setAcoustic(value);
    }
}

export default Parameters;