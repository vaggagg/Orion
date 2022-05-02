import '../Styling/Basic.scss'
function Checkbox( props ) {
    const { label, type, icon } = props;
    const typeOfInput = type == undefined ? "text" : type
    const hasIconClass = icon == undefined ? false : true; 
    return (
        <div class="checkbox-container">
            <label><input type="checkbox"  onChange={props.onChange} data-name='test'/>Test1</label>
            <label><input type="checkbox"  onChange={props.onChange} data-name='test2'/>test2</label>
      </div>
    );
  }
  
  export default Checkbox;