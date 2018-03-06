import React, {Component} from "react";

/**
 * @param value - string default value
 * @param onSave* - callback require call on save data
 * @param large - bool styles for large field
 *
 * */
export default class FieldEditor extends Component {
    constructor() {
        super();

        this.state = {
            value: "",
            newValue: false,
            option: "",
            isActive: false
        };

        this.handleChangeValue  = this.handleChangeValue.bind(this);
        this.handleSaveValue    = this.handleSaveValue.bind(this);
        this.handleActiveEditor = this.handleActiveEditor.bind(this);
        this.handleCancel       = this.handleCancel.bind(this);
        this.handleChangeOption = this.handleChangeOption.bind(this);
    }

    componentWillMount() {
        if (typeof this.props.onSave !== 'function') {
            console.log("Missing required param onSave");
        }

        this.setState({value: this.props.value ? this.props.value : ""});
    }

    componentDidMount() {
        if (this.props.optionsSelect && this.props.optionsSelect.length) {

            this.setState({ option: this.props.optionsSelect[0] })
        }

        if (this.props.withFocus) {
            this.textField.focus();
        }
    }

    componentWillReceiveProps(newProps, oldProps) {
        if (newProps.value !== oldProps.value) {
            this.setState({value: newProps.value})
        }
    }

    handleChangeValue(e) {
        this.setState({newValue: e.target.value});
    }

    handleSaveValue() {

        if (!this.state.isActive) {
            return false;
        }

        let value = this.state.newValue;

        this.setState({
            newValue: false,
            isActive: false
        });

        this.props.onSave && this.props.onSave(value, this.props.name, this.state.option);
        this.props.onClose && this.props.onClose();
    }

    handleActiveEditor() {
        if (!this.state.isActive) {
            let value = this.state.value;

            this.setState({
                isActive: true,
                newValue: value
            });
        }
    }

    handleCancel() {
        this.setState({
            newValue: false,
            isActive: false
        });

        this.props.onClose && this.props.onClose();
    }

    handleChangeOption(e) {
        this.setState({ option: e.target.value });
    }

    render() {
        let large = this.props.large ? " large" : "";
        let smallBtn = this.props.smallBtn ? " btn-small" : "";
        let optionsSelect = this.props.optionsSelect && this.props.optionsSelect.length ? " has-select" : "";

        return (
            <div className={`edit-field${large}${this.state.isActive ? ' focus' : ''}${optionsSelect}`}>
                <input className="hover-borders text-field" type="text" name="name"
                       ref={field => this.textField = field}
                       value={this.state.newValue || this.state.newValue !== false ? this.state.newValue : this.state.value}
                       onFocus={this.handleActiveEditor}
                       onChange={this.handleChangeValue}
                />
                <div className="actions">
                    {
                        this.props.optionsSelect && this.props.optionsSelect.length && (
                            <select name="" id="" onChange={this.handleChangeOption}>
                                {
                                    this.props.optionsSelect.map((el, ind) => <option value={el} key={ind}>{ el }</option>)
                                }
                            </select>
                        )
                    }

                    <button className={`btn-field btn-field-success${smallBtn}`} onClick={this.handleSaveValue}/>
                    <button className={`btn-field btn-field-cancel icon-close${smallBtn}`} onClick={this.handleCancel}/>
                </div>
            </div>
        )
    }
}