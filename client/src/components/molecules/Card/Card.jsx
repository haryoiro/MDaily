/** @jsx jsx */
import { jsx, Image, Box, Flex } from 'theme-ui'
import { Infomation, SubHeading, Description }from '../../atoms'
import CardHeader from './CardHeader'


function ImageOrText({ src, desc }) {
  return src
    ? (<Image
      className="card-image"
      src={src}
      sx={{ width: 'inherit' }}
    />)
    : (<Description>
      { desc }
      </Description>)
}

function Card({ styles, title, info, desc, src, ...props }) {
  return (
    <Box sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }} className="card">
      <CardHeader>
        <SubHeading>{title}</SubHeading>
        <Infomation>{info}</Infomation>
        <ImageOrText src={src} desc={desc} />
      </CardHeader>
    </Box>
  )
}

export default Card
