import React from "react";
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux';
import axios from 'axios';

// вставить валидацию 
// Counter.propTypes = {
//     value: PropTypes.number.isRequired,
//     onIncreaseClick: PropTypes.func.isRequired
// }

const API_KEY = '37662c76ffc19e5cd1b95f37d77155fc';

function Option(props) {
    return <div><a href="#">{props.value}</a></div>;
}

export class Form extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            input: '',
            found: []
        };
    }

    handleChange(e) {
        let foundOptions = [];
        const value = e.target.value.toLowerCase();
        const self = this;
        if (value !== '') {
            axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=ru-RU&sort_by=popularity.desc&page=1`)
                .then((response) => {
                    response.data.results.forEach(function (item) {
                        if (item.title.toLowerCase().search(value.toLowerCase()) !== -1) {
                            const element = <Option value={item.title} />;
                            foundOptions.push(element);
                        }
                        self.setState({
                            found: foundOptions,
                            input: value
                        });
                    });
                })
                .catch((error) => {
                    console.log('Ошибка: ' + error.message);
                });
        } else {
            this.setState({
                input: value,
                found: []
            });
        }
    }

    handleClick() {
        console.log(this.props.request);
    }

    render() {
        return (
            <div>
                <div>
                    <input value={this.state.input} onChange={(e) => this.handleChange(e)} />
                    <button onClick={this.props.onIncreaseClick}>Click</button>
                </div>
                <div>
                    {this.state.found}
                </div>
            </div>
        );
    }
}


// почему то undefined - разобраться с механикой работы
// function mapStateToProps(state) {
//     return {
//         value: state.count
//     }
// }

// // Action


// // Map Redux actions to component props
// function mapDispatchToProps(dispatch) {
//     return {
//         onIncreaseClick: () => dispatch(increaseAction)
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Counter);
