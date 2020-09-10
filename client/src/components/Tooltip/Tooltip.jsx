/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import styled from '@emotion/styled'
import { motion, AnimatePresence } from 'framer-motion'
import { ToggleLayer } from 'react-laag'

const TooltipBox = styled(motion.div)`
  ${({ theme }) => `
    background:  ${theme.bg2};
    border: solid 2px ${theme.bg1};
    color: ${theme.fg1};
    font-size: 12px;
    padding: 3px 12px;
    border-radius: 3px;
    transform-origin: center center;
    z-index: 999;
  `}
`
const TooltipText = styled.span`
z-index: 11;
cursor: pointer;
`

// eslint-disable-next-line react/prop-types
function Tooltip({ children, text }) {
  // const [show, hoverProps] = useHover({ delayEnter: 300, delayLeave: 200 })

  return (
    <ToggleLayer
      fixed
      placement={{ anchor: 'BOTTOM_CENTER', autoAdjust: true, triggerOffset: 4 }}
      closeOnOutsideClick="true"
      renderLayer={({ isOpen, layerProps, layerSide }) => (
        <AnimatePresence>
          {isOpen && (
            <TooltipBox
              {...layerProps}
              // provide config for animated styles
              initial={{
                opacity: 0,
                scale: 0.8,
                y: layerSide === 'bottom' ? -8 : 8,
              }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{
                opacity: 0,
                scale: 0.8,
                y: layerSide === 'bottom' ? -8 : 8,
              }}
              transition={{
                type: 'spring',
                damping: 30,
                stiffness: 500,
              }}
            >
              <div>{text}</div>
            </TooltipBox>
          )}
        </AnimatePresence>
      )}
    >
      {({ toggle, triggerRef }) => (
        <TooltipText ref={triggerRef} onClick={toggle}>
          {children}
        </TooltipText>
      )}
    </ToggleLayer>
  )
}

export default Tooltip
