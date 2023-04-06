import Slider from '@mui/material/Slider';
import Switch from '@mui/material/Switch';

function ParameterView(props){
    return (<div>
        {getSlider()}
        {getSlider()}
        {getSlider()}
        {getSwitch()}
        {getSwitch()}
        
    </div>);

    //TODO: get things
    function getSwitch(){
        function onChangeACB(){

        }

        return(<Switch 
                checked={checked}
                onChange={onChangeACB}/>);

    }

    //TODO: get things
    function getSlider(){
        function onChangeACB(){

        }

        return (<Slider
            getAriaLabel={() => 'Temperature range'}
            value={value}
            onChange={onChangeACB}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            />);
    }

    
}

export default ParameterView;