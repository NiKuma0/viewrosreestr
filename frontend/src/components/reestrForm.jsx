import React from 'react'

import api from '../api'


export default class ReestrForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      value: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  valueCheck(value) {
  }

  handleChange(event) {
    this.setState({value: event.target.value})
  }

  handleSubmit(event) {
    console.log(this.state)
    api.getReestrCoordinates(this.state.value)
    .catch(err => console.log(err))
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className='reestr-form'>
        <label>Кадастровый номер: </label>
        <input
          type={'text'}
          value={this.value}
          onChange={this.handleChange}
          // defaultValue={'24:39:0101001:369'}
        />
        <br/>
        <input type={'submit'} value={'Готово'} />
      </form>
    )
  }
}
