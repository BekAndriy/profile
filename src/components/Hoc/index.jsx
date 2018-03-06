import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
// import { Link } from 'react-router-dom';
import {Request} from 'react-axios';

import {actionProfiles} from '../../store/actions';

import {API_URL} from "../../constants";

import Spinner from '../ui/Spinner.jsx';

class _Hoc extends Component {
    constructor(props) {
        super();

        this.state = {
            url: props.url,
            method: props.method ? props.method : "get"
        };

        this.handleSuccess = this.handleSuccess.bind(this);
    }

    shouldComponentUpdate(nextProps, oldProps) {
        return nextProps.url !== oldProps.url || nextProps.method !== this.props.method;
    }

    handleSuccess(response) {
        this.props.profiles(response, this.props.reduxProfiles);
    }

    render() {
        let _data = this.props.data ? this.props.data : {},
            profile = false,
            childrenWithProps = undefined;

        // Check if current profile exist in store
        if (this.props.reduxState && this.props.reduxProfiles.length && this.props.match) {
            profile = this.props.reduxProfiles.find(el => el.url === this.props.match.params.id);
            if (profile) {
                childrenWithProps = React.Children.map(this.props.children,
                    (child) => React.cloneElement(child, {
                        response: profile
                    }));
            }
        }

        return (
            <Fragment>
                {
                    profile ? (
                            <Fragment>{childrenWithProps}</Fragment>
                        ) :
                        (
                            <Request
                                // instance={axios.create({})} /* custom instance of axios - optional */
                                method={this.state.method} /* get, delete, head, post, put and patch - required */
                                url={`${API_URL}${this.state.url}`} /*  url endpoint to be requested - required */
                                data={_data} /* post data - optional */
                                // params={{}} /* queryString data - optional */
                                // config={{}} /* axios config - optional */
                                debounce={200} /* minimum time between requests events - optional */
                                debounceImmediate={true} /* make the request on the beginning or trailing end of debounce - optional */
                                isReady={true} /* can make the axios request - optional */
                                onSuccess={response => {
                                    this.handleSuccess(response);
                                }} /* called on success of axios request - optional */
                                onError={error => {
                                    this.handleSuccess(fakeResponse);
                                }} /* called on error of axios request - optional */
                            >
                                {(error, response, isLoading, onReload) => {
                                    if (error) { /* called on error of axios request - optional */

                                        //TODO: remove after included API
                                        /* Only for testing without API, remove after included API */
                                        let childrenWithProps = React.Children.map(this.props.children,
                                            (child) => React.cloneElement(child, {
                                                response: fakeResponse
                                            })
                                        );
                                        return (
                                            <Fragment>{childrenWithProps}</Fragment>
                                        )
                                        /* END */

                                        // uncommit if include API backend
                                        // return (<div>Something bad happened: {error.message} <button onClick={() => onReload({ params: { reload: true } })}>Retry</button><Link to='/'>Home Page</Link></div>)

                                    } else if (isLoading) { /* called on start of axios request - optional */
                                        return Spinner

                                    } else if (response !== null) { /* called on success of axios request - optional */
                                        let childrenWithProps = React.Children.map(this.props.children,
                                            (child) => React.cloneElement(child, {
                                                response
                                            })
                                        );

                                        return (
                                            <Fragment>{childrenWithProps}</Fragment>
                                        )
                                    }
                                    return ""
                                }}
                            </Request>

                        )
                }
            </Fragment>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        reduxState: state,
        reduxProfiles: state.profiles
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        profiles: (profile, reduxProfiles) => dispatch(actionProfiles(profile, reduxProfiles)),
    }
};

const Hoc = connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    {pure: false}
)(_Hoc);

export default Hoc;

const fakeResponse = {
    id: "0000001",
    url: "john-smith",
    name: "John Smith",
    address: "Portland, Oregon, USA",
    language: "English",
    skills: [{
        technology: "PHP",
        strong: "average"
    }, {
        technology: "RUBY",
        strong: "low"
    }, {
        technology: "JAVASCRIPT",
        strong: "low"
    }, {
        technology: "ACTIONSCRIPT",
        strong: "strong"
    }],
    blocks: [
        {
            type: "portfolio",
            technology: ["PHP", "Ruby", "Javascript"],
            projects: [{
                name: "NavalPlan",
                use: ["PHP", "Ruby"]
            }, {
                name: "MyTime",
                use: ["Javascript"]
            }, {
                name: "Formidable",
                use: ["PHP", "Ruby"]
            }, {
                name: "MyTime",
                use: ["Javascript"]
            }, {
                name: "Monsoon",
                use: ["ActionScript"]
            }]
        }, {
            type: "experience",
            technology: [{
                name: "PHP",
                time: "6 years"
            }, {
                name: "Ruby",
                time: "7 years"
            }, {
                name: "Javascript",
                time: "4 years"
            }, {
                name: "ActionScript",
                time: "3 years"
            }]
        }, {
            type: "code",
            language: "html",
            code: "<body data-gr-c-s-loaded=\"true\">\n" +
            "   <noscript>\n" +
            "      You need to enable JavaScript to run this app.\n" +
            "   </noscript>\n" +
            "   <div id=\"root\">\n" +
            "      <div class=\"App container\">\n" +
            "         <div>\n" +
            "            <div>\n" +
            "               <div>\n" +
            "                  <header class=\"header\">\n" +
            "                     <div class=\"row\">\n" +
            "                        <div class=\"col3\"><img class=\"full-width\" src=\"/static/media/pic_01.ec7223a6.png\" alt=\"John Smith\"></div>\n" +
            "                        <div class=\"preview-info col9 \">\n" +
            "                           <div class=\"info-user-name\">\n" +
            "                              <div class=\"edit-field large\">\n" +
            "                                 <input type=\"text\" class=\"text-field\" name=\"name\" value=\"John Smith\">\n" +
            "                                 <div class=\"actions\"><button class=\"btn-field btn-field-success\"></button><button class=\"btn-field btn-field-cancel icon-close\"></button></div>\n" +
            "                              </div>\n" +
            "                           </div>\n" +
            "                           <div class=\"info-user-address\">\n" +
            "                              <div class=\"edit-field\">\n" +
            "                                 <input type=\"text\" class=\"text-field\" name=\"name\" value=\"Portland, Oregon, USA\">\n" +
            "                                 <div class=\"actions\"><button class=\"btn-field btn-field-success\"></button><button class=\"btn-field btn-field-cancel icon-close\"></button></div>\n" +
            "                              </div>\n" +
            "                           </div>\n" +
            "                           <div class=\"language\">English</div>\n" +
            "                           <div class=\"technology-list\"><span class=\"point-item average\">PHP<i class=\"icon-close\"></i></span><span class=\"point-item low\">RUBY<i class=\"icon-close\"></i></span><span class=\"point-item strong\">ACTIONSCRIPT<i class=\"icon-close\"></i></span></div>\n" +
            "                           <div class=\"add-skills-wrap\"><button>Add skills</button></div>\n" +
            "                           <button class=\"btn btn-black btn-print-page\">PRINT THIS PAGE</button>\n" +
            "                        </div>\n" +
            "                     </div>\n" +
            "                  </header>\n" +
            "                  <div class=\"portfolio-blocks row\">\n" +
            "                     <div class=\"portfolio-block col3\">\n" +
            "                        <h2>Portfolio</h2>\n" +
            "                        <div class=\"portfolio-tech\">PHP, Ruby, Javascript</div>\n" +
            "                        <ul>\n" +
            "                           <li><strong>NavalPlan</strong>, PHP, Ruby</li>\n" +
            "                           <li><strong>MyTime</strong>, Javascript</li>\n" +
            "                           <li><strong>Formidable</strong>, PHP, Ruby</li>\n" +
            "                           <li><strong>MyTime</strong>, Javascript</li>\n" +
            "                           <li><strong>Monsoon</strong>, ActionScript</li>\n" +
            "                        </ul>\n" +
            "                     </div>\n" +
            "                     <div class=\"portfolio-block col3\">\n" +
            "                        <h2>Experience</h2>\n" +
            "                        <ul>\n" +
            "                           <li><strong>PHP</strong>, 6 years</li>\n" +
            "                           <li><strong>Ruby</strong>, 7 years</li>\n" +
            "                           <li><strong>Javascript</strong>, 4 years</li>\n" +
            "                           <li><strong>ActionScript</strong>, 3 years</li>\n" +
            "                        </ul>\n" +
            "                     </div>\n" +
            "                     <div class=\"portfolio-block col3 code\">\n" +
            "                        <h2>Sample code and algorithms</h2>\n" +
            "                        <code>\n" +
            "                           <pre style=\"font-family: Consolas, Menlo, Monaco, &quot;Andale Mono WT&quot;, &quot;Andale Mono&quot;, &quot;Lucida Console&quot;, &quot;Lucida Sans Typewriter&quot;, &quot;DejaVu Sans Mono&quot;, &quot;Bitstream Vera Sans Mono&quot;, &quot;Liberation Mono&quot;, &quot;Nimbus Mono L&quot;, &quot;Courier New&quot;, Courier, monospace; font-size: 14px; line-height: 1.375; direction: ltr; text-align: left; white-space: pre; word-spacing: normal; word-break: normal; tab-size: 4; hyphens: none; background: rgb(250, 248, 245); color: rgb(114, 143, 203); padding: 1em; margin: 0.5em 0px; overflow: auto;\"><code style=\"font-family: Consolas, Menlo, Monaco, &quot;Andale Mono WT&quot;, &quot;Andale Mono&quot;, &quot;Lucida Console&quot;, &quot;Lucida Sans Typewriter&quot;, &quot;DejaVu Sans Mono&quot;, &quot;Bitstream Vera Sans Mono&quot;, &quot;Liberation Mono&quot;, &quot;Nimbus Mono L&quot;, &quot;Courier New&quot;, Courier, monospace; font-size: 14px; line-height: 1.375; direction: ltr; text-align: left; white-space: pre; word-spacing: normal; word-break: normal; tab-size: 4; hyphens: none; background: rgb(250, 248, 245); color: rgb(114, 143, 203);\"><span style=\"color: rgb(182, 173, 154);\">(</span>num<span style=\"color: rgb(182, 173, 154);\">)</span> <span style=\"color: rgb(6, 50, 137);\">=&gt;</span> num <span style=\"color: rgb(6, 50, 137);\">+</span> <span style=\"color: rgb(6, 50, 137);\">1</span></code></pre>\n" +
            "                        </code>\n" +
            "                     </div>"
        }, {
            type: "availability",
            time: "Full-time",
            preferTitle: "Preferred environment",
            content: ["Git", "GitHub", "vim", "emacs", "Jenkins", "Mac OSX"]
        }, {
            type: "testimonial",
            title: "The most amazing …",
            content: "… Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua et dolore magna aliqua et dol ut labore et dolore",
            author: "Martin"
        }, {
            type: "testimonial",
            title: "In clients I look for …",
            content: "… Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt",
            author: "Martin"
        }, {
            type: "empty",
            title: "Note",
            content: "… Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt",
            author: ""
        }, {
            type: "testimonial",
            title: "The most amazing …",
            content: "… Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua et dolore magna aliqua et dol ut labore et dolore",
            author: ""
        }
    ]
};