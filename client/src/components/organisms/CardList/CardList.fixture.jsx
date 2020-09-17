import React from 'react'
import Card from './Card'
import Prov from '../../../theme/provider'

export default () => (
  <Prov>
    <Card
      title='Title'
      info="1 days ago"
      desc="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi odio fuga, recusandae laudantium consequatur labore quaerat nihil explicabo eum deserunt consectetur, nostrum maxime sit. Iusto officiis quibusdam rem perferendis accusamus!Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi odio fuga, recusandae laudantium consequatur labore quaerat nihil explicabo eum deserunt consectetur, nostrum maxime sit. Iusto officiis quibusdam rem perferendis accusamus!"
    />
    <Card
      title='Image'
      info="1 days ago"
      desc="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi odio fuga, recusandae laudantium consequatur labore quaerat nihil explicabo eum deserunt consectetur, nostrum maxime sit. Iusto officiis quibusdam rem perferendis accusamus!"
      src='https://www.andreasreiterer.at/wp-content/uploads/2017/11/react-logo-825x510.jpg'
    />
  </Prov>
)