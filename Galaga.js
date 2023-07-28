import React, {useEffect} from 'react'

var file = require('./index.html');
class Galaga extends React.Component() {
render(){
    return (
      <iframe title='galaga' src={file}></iframe>
    )
}
}

export default Galaga;
