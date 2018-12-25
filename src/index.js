import React    from 'react'
import ReactDOM from 'react-dom'

import './scss/main'

function Application() {
  return(
    <div>The Crud</div>
  )
}

function render(Component) {
  ReactDOM.render(
    <Component />,
    document.getElementById('mount-point')
  )
}

if (document.readyState !== 'loading') {
  render(Application)
} else {
  document.addEventListener('DOMContentLoaded', render.bind(null, Application))
}
