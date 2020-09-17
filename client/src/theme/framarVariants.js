export const searchIconVariants = {
  hidden: {
    paddingLeft: '2px',
    borderRadius: '22px',
    x: '10px',
    visibility: 'hidden',
      transition: {
      delayChildren: 0.1
    }
  },
  show: {
    borderRadius: '22px',
    visibility: 'visible',
    x: '10px',
    transition: {
      delayChildren: 0.5
    }
  },
  active: {
    borderRadius: '22px',
    x: '0px',
    transition: {
      delayChildren: 0.5
    }
  }
}
export const inputVariants = {
  hidden: {
    opacity: 0,
    width: '0px',
    visibility: 'hidden',
  },
  show: {
    opacity: 0,
    width: '0px',
    x: '-10px',
    visibility: 'visible',
    transition: {
      delayChildren: 0.5
    }
  },
  active: {
    opacity: 1,
    width: 'auto',
    x: '0px',
  }
}