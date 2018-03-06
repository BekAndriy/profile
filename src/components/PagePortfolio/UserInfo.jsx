import React, {Component} from "react";

// components
import FieldEditor from '../ui/FieldEditor.jsx';
import PointItem from '../ui/PointItem.jsx';
import {actionProfiles} from "../../store/actions";
import {connect} from "react-redux";

class _UserInfo extends Component {
    constructor() {
        super();

        this.state = {
            data: {},
            addSkillsActive: false
        };

        this.handleRemoveTechnologyItem = this.handleRemoveTechnologyItem.bind(this);
        this.handleAddSkillsSwitchField = this.handleAddSkillsSwitchField.bind(this);
        this.handleAddSkill             = this.handleAddSkill.bind(this);
        this.handleSaveData             = this.handleSaveData.bind(this);
        this.handleCloseEditSkills      = this.handleCloseEditSkills.bind(this);
    }

    componentDidMount() {
        this.setState({ data: this.props.data })
    }

    componentWillReceiveProps(newProps) {
        if (newProps.data) {
            this.setState({ data: newProps.data })
        }
    }

    handleSaveData(value, fieldName = "") {
        if (value) {
            let profile = {...this.state.data, fieldName: value};
            profile[fieldName] = value;

            this.props.profiles(profile, this.props.reduxProfiles);
        }
    }

    handleRemoveTechnologyItem(value, index) {
        let skills = this.state.data.skills.slice();
        skills = skills.filter(el => el.technology.toLowerCase() !== value.toLowerCase());

        this.props.profiles({...this.state.data, skills}, this.state.reduxProfiles)
    }

    handleAddSkillsSwitchField() {
        this.setState({addSkillsActive: true})
    }

    handleAddSkill(value, index, option) {
        this.props.data.skills.push({
            technology: value.toUpperCase(),
            strong: option
        });

        this.props.profiles(this.props.data, this.props.reduxProfiles);
    }

    handleCloseEditSkills() {
        this.setState({addSkillsActive: false})
    }

    render() {
        return (
            <header className="header">
                <div className="row">
                    <div className="preview-image">
                        <img className="full-width" src={require('../../images/pic_01.png')} alt="John Smith"/>
                    </div>
                    <div className="preview-info">

                        <div className="editor-info-wrap">
                            <div className="info-user-name">
                                <FieldEditor name="name" value={this.state.data && this.state.data.name} large={true} onSave={this.handleSaveData}/>
                            </div>

                            <div className="info-user-address">
                                <FieldEditor name="address" value={this.state.data && this.state.data.address} smallBtn={true} onSave={this.handleSaveData}/>
                            </div>

                            <div className="language">
                                <FieldEditor name="language" value={this.state.data && this.state.data.language} smallBtn={true} onSave={this.handleSaveData}/>
                            </div>

                            <div className="technology-list">
                                {
                                    this.props.data && this.props.data.skills && this.props.data.skills.length && this.props.data.skills.map((el, ind) =>
                                        <PointItem strong={el.strong} key={ind} index={ind} value={el.technology}
                                                   onRemove={this.handleRemoveTechnologyItem}/>
                                    )
                                }
                            </div>

                            <div className="add-skills-wrap">
                                {
                                    this.state.addSkillsActive ?
                                        <div className="add-skills-field">
                                            <FieldEditor name="skills"
                                                         optionsSelect={["average", "low", "strong"]}
                                                         value=""
                                                         smallBtn={true}
                                                         withFocus={true}
                                                         onClose={this.handleCloseEditSkills}
                                                         onSave={this.handleAddSkill}/>
                                        </div>
                                        :
                                        <button onClick={this.handleAddSkillsSwitchField}>Add skills</button>
                                }
                            </div>
                        </div>

                        <button className="btn btn-black btn-print-page" onClick={() => {
                            window.print()
                        }}>PRINT THIS PAGE
                        </button>

                    </div>
                </div>
            </header>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        reduxProfiles: state.profiles
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        profiles: (profile, reduxProfiles) => dispatch(actionProfiles(profile, reduxProfiles)),
    }
};

const UserInfo = connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    {pure: false}
)(_UserInfo);

export default UserInfo;