import {Component} from 'react'

import {format} from 'date-fns'

import {v4 as uuidv4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    appointmentList: [],
    titleInput: '',
    dateInput: '',
    isStarPressed: false,
  }

  appointSubmit = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const formatedDate = format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
    const newAppointment = {
      id: uuidv4(),
      titleInput,
      formatedDate,
      isStarred: false,
    }
    if (titleInput.length > 0 && dateInput.length > 0) {
      this.setState(prevState => ({
        appointmentList: [...prevState.appointmentList, newAppointment],
        titleInput: '',
        dateInput: '',
      }))
    }
  }

  nameGiven = event => {
    this.setState({
      titleInput: event.target.value,
    })
  }

  dateGiven = event => {
    this.setState({
      dateInput: event.target.value,
    })
  }

  updateIsLike = likedId => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachApp => {
        if (likedId === eachApp.id) {
          return {...eachApp, isStarred: !eachApp.isStarred}
        }
        return eachApp
      }),
    }))
  }

  selectStarred = () => {
    this.setState(prevState => ({
      isStarPressed: !prevState.isStarPressed,
    }))
  }

  render() {
    let displayList
    const {appointmentList, titleInput, dateInput, isStarPressed} = this.state
    displayList = appointmentList
    if (isStarPressed === true) {
      displayList = appointmentList.filter(each => {
        if (each.isStarred === true) {
          return each
        }
        return ''
      })
    }
    return (
      <div className="app-container">
        <div className="card-container">
          <div className="appointment-container">
            <div className="app-image-container">
              <form className="form-container">
                <h1 className="form-description">Add Appointment</h1>
                <label htmlFor="text-in" className="title">
                  TITLE
                </label>
                <input
                  className="text-input"
                  type="text"
                  placeholder="Title"
                  id="text-in"
                  onChange={this.nameGiven}
                  value={titleInput}
                />
                <label htmlFor="date-in" className="title">
                  DATE
                </label>
                <input
                  className="date-input"
                  type="date"
                  id="date-in"
                  onChange={this.dateGiven}
                  value={dateInput}
                />
                <button
                  className="add-button"
                  onClick={this.appointSubmit}
                  type="submit"
                >
                  Add
                </button>
              </form>
              <img
                className="app-image"
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
              />
            </div>
            <hr className="line" />
            <div className="nav-appoint">
              <h1 className="content-header">Appointments</h1>
              <button
                type="button"
                className="star-show-button"
                onClick={this.selectStarred}
              >
                Starred
              </button>
            </div>
            <ul className="unordered-list">
              {displayList.map(eachAppointment => (
                <AppointmentItem
                  appoint={eachAppointment}
                  key={eachAppointment.id}
                  updateIsLike={this.updateIsLike}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
