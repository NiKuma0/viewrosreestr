import React from 'react';
import { render } from 'react-dom';

import Map from './components/ReestrMap';
import Form from './components/reestrForm';
import api from './api'

import './style.css';
import './components/components.css'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      map: {
        coordinates: [
          [
            55.33131506353899,
            89.80059530838025
          ],
          [
            55.33125997891148,
            89.80054953023337
          ],
          [
            55.331097729200074,
            89.80119922777946
          ],
          [
            55.331147806342386,
            89.8012432452284
          ]
        ],
        center: [
          55.331205144588296,
          89.80089369115868
        ]
      }
    };

    this.changeMapCoordinates = this.changeMapCoordinates.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  changeMapCoordinates(data) {
    this.setState({ map: { coordinates: data.coordinates, center: data.center } });
  }

  handleChange(event) {
    this.setState({value: event.target.value})
  }

  handleSubmit(event) {
    api.getReestrCoordinates(this.state.value)
    .then()
    .then(this.changeMapCoordinates)
    .catch(err => {console.log(err); alert(err)})
  }

  render() {
    return (
      <div className='app'>
        <div className='reestr-form'>
          <label>Кадастровый номер: </label>
          <input
            type={'text'}
            value={this.value}
            onChange={this.handleChange}
            defaultValue={'24:39:0101001:369'}
          />
          <br/>
          <input type={'button'} value={'Готово'} onClick={this.handleSubmit} />
        </div>
        <Map center={this.state.map.center} coordinates={this.state.map.coordinates} />
      </div>
    )
  }
}

render(<App/>, document.getElementById('root'))
