import React, { Component } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import { duotoneLight } from 'react-syntax-highlighter/styles/prism';

export default class BlocksInfo extends Component {

    handleGetBlock() {
        let content  = '';

        switch(this.props.data.type) {
            case 'portfolio':
                content = (<div  className={`portfolio-block block-${ this.props.data.type } col3`}>
                    <h2>Portfolio</h2>
                    <div className="portfolio-tech">{ this.props.data.technology.join(', ') }</div>
                    <ul>
                        {
                            this.props.data.projects && this.props.data.projects.length && this.props.data.projects.map((el, ind) =>
                                <li key={ind}>
                                    <strong>{ el.name }</strong>, { el.use.join(', ') }
                                </li>
                            )
                        }
                    </ul>
                </div>);
                break;

            case 'experience':
                content = (
                    <div  className={`portfolio-block block-${ this.props.data.type } col3`}>
                        <h2>Experience</h2>
                        <ul>
                            {
                                this.props.data.technology && this.props.data.technology.length && this.props.data.technology.map((el, ind) =>
                                    <li key={ind}>
                                        <strong>{ el.name }</strong>, { el.time }
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                );
                break;

            case 'code':
                content = (
                    <div  className={`portfolio-block block-${ this.props.data.type } col3 code`}>
                        <h2>Sample code and algorithms</h2>
                        <code>
                            <SyntaxHighlighter language={this.props.data.language} style={duotoneLight}>{ this.props.data.code }</SyntaxHighlighter>
                        </code>
                    </div>
                );
                break;

            case 'availability':
                content = (
                    <div  className={`portfolio-block block-${ this.props.data.type } col3`}>
                        <h2 className="availability">Availability</h2>
                        <div className="time">{ this.props.data.time }</div>
                        <h2 className="environment-title">{ this.props.data.preferTitle }</h2>
                        <div className="environment-content">{ this.props.data.content.join(', ') }</div>
                    </div>
                );
                break;
            case 'testimonial':
                content = (
                    <div  className={`portfolio-block block-${ this.props.data.type } col3`}>
                        <h2>{ this.props.data.title }</h2>
                        <p className="text"><i>{ this.props.data.content }</i></p>
                        {
                            this.props.data.author && (<span className="author">{ this.props.data.author }</span>)
                        }
                    </div>
                );
                break;

            case 'empty':
                content = (<div  className={`portfolio-block block-${ this.props.data.type } col3`}>&nbsp;</div>);
                break;

            default:
                content = '';
        }
        return content;
    }

    render() {
        return (
            this.handleGetBlock()
        );
    }
}