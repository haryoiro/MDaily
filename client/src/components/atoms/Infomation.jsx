/** @jsx jsx */
import { jsx } from 'theme-ui';

function DescriptionText({ styles, children, ...props }) {
  return (
    <p
      {...props}
      sx={{
        ...styles,
        margin: 0,
        padding: 0,
        fontFamily: 'body',
        fontWeight: 'body',
        lineHeight: ['body','heading4'],
        color: 'secondary',
        fontSize: 1,
      }}
    >
    {children}
  </p>
  )
}

export default DescriptionText
