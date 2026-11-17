import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = /*html*/`
<h1>Hola</h1>
`

setupCounter(document.querySelector('#counter'))
