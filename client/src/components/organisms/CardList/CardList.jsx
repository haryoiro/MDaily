import React from 'react'
import Card from '../../molecules/Card/Card'

function CardListWrap({ children }) {
  return (
    <ul>
      {children}
    </ul>
  )
}

function CardList() {
  return (
    <CardListWrap>
      {}
    </CardListWrap>
  )
}

export default CardList
