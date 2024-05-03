import React, { useEffect, useState } from 'react'

const Home = (props) => {
 
  return (
    <div>
        {props.name ? "Hey "+ props.name : "No estas conectado"}
    </div>
  )
}

export default Home