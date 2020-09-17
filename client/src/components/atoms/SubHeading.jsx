/** @jsx jsx */
import { jsx } from 'theme-ui';

function SubHeadingText({ styles, children, ...props }) {
  return (
  <h2
    {...props}
    sx={{
      ...styles,
      margin: 0,
      padding: 0,
      fontFamily: 'body',
      fontWeight: 'bold',
      fontSize: [3, 4],
      lineHeight: ['heading4','heading2'],
    }}
  >
    {children}
  </h2>
  )
}

export default SubHeadingText