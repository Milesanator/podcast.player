import React from 'react'

const Error = ({ message }) => {
  if (!message)
    return

  let errorMessage = 'Unknown error'

  switch(message) {
    case 'Not Found':
      errorMessage = 'No episode could be found.'
      break;
    default:
      errorMessage = 'An error has occured. '
      break;
  }
  return (
    <div className="Error"> 
      {errorMessage}
    </div>
  )
}

export default Error