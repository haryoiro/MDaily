/** @jsx jsx */
import { Box, Flex, Input, css, jsx } from 'theme-ui'
import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import useAutoFocus from '../../../hooks/useAutoFocus'
import { searchIconVariants, inputVariants } from '../../../theme/framarVariants'
import Icon from '../../atoms/Icon'

const SearchStyle = css({
  height: '32px',
  alignItems: "center",
  listStyle: "none",
  "li:not(:first-of-type) a, li:not(:first-of-type) button": {
    "margin-left": "1rem"
  },
})

const SearchIcon = ({styles, ...props}) => (
  <Icon {...props} sx={{
    ...styles,
    svg: { fill: 'text' },
    height: '32px',
    backgroundColor: 'muted',
    borderRadius: '22px 22px 22px 22px',
  }}>
      <path d="M19.4271164,20.4271164 C18.0372495,21.4174803 16.3366522,22 14.5,22 C9.80557939,22 6,18.1944206 6,13.5 C6,8.80557939 9.80557939,5 14.5,5 C19.1944206,5 23,8.80557939 23,13.5 C23,15.8472103 22.0486052,17.9722103 20.5104077,19.5104077 L26.5077736,25.5077736 C26.782828,25.782828 26.7761424,26.2238576 26.5,26.5 C26.2219324,26.7780676 25.7796227,26.7796227 25.5077736,26.5077736 L19.4271164,20.4271164 L19.4271164,20.4271164 Z M14.5,21 C18.6421358,21 22,17.6421358 22,13.5 C22,9.35786417 18.6421358,6 14.5,6 C10.3578642,6 7,9.35786417 7,13.5 C7,17.6421358 10.3578642,21 14.5,21 L14.5,21 Z" />
  </Icon>
)

function MotionSearch({ ...props }) {
  const [active, setActive] = useState(false)
  const [ref, change] = useAutoFocus()

  return (
    <Flex
      px={2}
      alignItems='center'
      sx={SearchStyle}
    >
      <motion.li
        variants={searchIconVariants}
        initial="hidden"
        animate={active ? 'active' : 'show'}
        whileHover={{ scale: 1.1 }}
        whileTap={{
          rotate: [0, 270, 270, 0, 270, 0],
        }}
        onClick={() => {
          setActive(!active)
          change()
        }}
      >
        <SearchIcon />
      </motion.li>
      <motion.li
        variants={inputVariants}
        initial="hidden"
        animate={active ? 'active' : 'show'}
      >
        <Input
          ref={ref}
          placeholder="Search..."
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}
          sx={{
            margin: '0px',
            height: '32px',
            borderRadius: '0px 22px 22px 0px',
          }} />
      </motion.li>
      <Box mx='auto' />
    </Flex>
  )
}

export default MotionSearch