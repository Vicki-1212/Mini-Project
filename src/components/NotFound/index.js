import './index.css'

const NotFound = () => {
  return (
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/dtnwl3ron/image/upload/v1723470616/azjetqihtszpjniemaus.png"
        alt="Not Found"
        className="notFound-image"
      />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-paragraph">
        We are sorry, the page you requested could not be found
      </p>
    </div>
  )
}

export default NotFound
