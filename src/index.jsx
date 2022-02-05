import * as $ from 'jquery'
import Post from '@models/post'
import React from 'react'
import {render} from 'react-dom'
import './styles/styles.css'
import './styles/less.less'
import './styles/sass.scss'
import json from './assets/json'
import Logo from './assets/logo'
const post = new Post("post1");
import babel from './babel'
console.log(post.toString(), Logo)
console.log(json)
$("pre").html(post.toString())

const unused = 42

const App = () => {
    return <div>
    <h1>webpack</h1>
    <div class="logo"></div>
    <pre></pre>
    </div>
}
render(<App />, document.getElementById("app"))