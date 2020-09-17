/** @jsx jsx */
import { jsx, Box, Flex } from 'theme-ui'

function CardHeader({ styles, children, ...props }) {
  return (
    <Flex>
      <Box
        sx={{
          variant: 'card.container',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          }}>
        <div className="card-header" sx={{ mb: '0.5rem' }}>
          {children[0]}
          {children[1]}
        </div>
        <Box className="card-description" xs={{ mb: '-20px' }}>
          {children[2]}
        </Box>
      </Box>
    </Flex>
  )
}

export default CardHeader