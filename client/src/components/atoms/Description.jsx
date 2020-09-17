/** @jsx jsx */
import { jsx } from 'theme-ui';

function Description({ sx, children, ...props }) {
  return (
      <div
        {...props}
        sx={{
          ...sx,
          fontFamily: 'body',
          fontWeight: 'body',
          lineHeight: 'body',
          color: 'secondary',
          fontSize: 1,
        }}
      >
      {children}
      </div>
  )

}

export default Description
