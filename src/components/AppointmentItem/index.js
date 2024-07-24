import './index.css'

const AppointmentItem = props => {
  const {appoint, updateIsLike} = props
  const {titleInput, formatedDate, isStarred, id} = appoint
  const clickedStar = () => {
    updateIsLike(id)
  }
  const imgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  return (
    <li className="list-container">
      <div className="listed-app-container">
        <div className="listed-app-nav">
          <p className="list-header">{titleInput}</p>
          <button
            data-testid="star"
            className="star-image-button"
            type="button"
            onClick={clickedStar}
          >
            <img src={imgUrl} alt="star" className="star-image" />
          </button>
        </div>
        <p className="list-time-para">{formatedDate}</p>
      </div>
    </li>
  )
}

export default AppointmentItem
