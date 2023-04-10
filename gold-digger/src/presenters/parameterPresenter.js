import FilterView from "../views/filterView";
import ParameterView from "../views/parameterView";

function Parameters (props) {

    return (
        <div id="parameterMainGrid">
            <FilterView filterType="parameter" title="Additional Parameters" nextTitle="Generate"></FilterView>
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