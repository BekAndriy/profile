import React, { Component } from 'react';

/**
 * @param strong - small|medium|large - control background color
 * default medium
 * @param index - str|int
 * @param itemName* - string
 * @param onRemove* - callback removes point onRemove(itemName, index)
 * */
export default class PointItem extends Component {

    constructor() {
        super();

        this.handleRemovePoint = this.handleRemovePoint.bind(this);
    }

    handleRemovePoint() {
        this.props.onRemove(this.props.value, this.props.index);
    }

    render() {
        let stylePoint = this.props.strong ? this.props.strong : "average";

        return (
            <span className={`point-item ${stylePoint}`} key={this.props.index}>
                {this.props.value}
                <i className="icon-close" onClick={ this.handleRemovePoint }/>
            </span>
        )
    }
}