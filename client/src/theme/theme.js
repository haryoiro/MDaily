
const box = {
  card: {
    margin: 3,
    padding: 3,
  },
  item: {
    margin: 2,
    padding: 2,
    marginTop: 0,
    marginBottom: 0,
    paddingTop: 1,
    paddingBottom: 1,
  }
}

const buttons = {
  menu: {
    backgroundColor: 'primary',
    borderRadius: 'borderRadius',
    '&:hover': {
      backgroundColor: 'background',
    }
  }
}

const card = {
  container: {
    ...box.card,
    height: ['220px', '246px', '260px'],
    borderRadius: 4,
    backgroundColor: 'muted',
    fontSize: 4,
    maxWidth: ['240px', '260px', '290px'],
    minWidth: '200px',
  }
}

const input = {
  borderColor: 'muted',
  backgroundColor: 'muted',
  outline: 'none',
  '&:focus': {
    borderColor: 'secondary',
    backgroundColor: 'secondary',
    '&::placeholder': {
      height: '18px',
      color: 'text',
      paddingLeft: '6px',
    }
  },
  '&::placeholder': {
    color: 'muted',
  }
}

export default {
  breakpoints: ['480px', '768px', '1024px'],
  space: [ 0, 4, 8, 16, 32, 64, 128, 256, 512 ],
  fonts: {
    body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace'
  },
  fontSizes: [ 10, 14, 16, 22, 28, 36, 48, 64, 96 ],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 600
  },
  lineHeights: {
    body: 1.5,
    heading: 1.05,
    heading2: 1.2222,
    headihg3: 1.25,
    heading4: 1.2
  },
  colors: {
    text: '#EBDBB2',
    background: '#282828',
    primary: '#3C3836',
    secondary: '#665C54',
    muted: '#32302F',
    bg4: '#7C6F64',
  },
  borderRadius: '6px',
  styles: {
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body'
    },
    h1: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 7
    },
    h2: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading2',
      fontWeight: 'heading',
      fontSize: 6
    },
    h3: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading3',
      fontWeight: 'heading',
      fontSize: 5
    },
    h4: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading4',
      fontWeight: 'heading',
      fontSize: 4
    },
    h5: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading4',
      fontWeight: 'heading',
      fontSize: 4
    },
    h6: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading4',
      fontWeight: 'heading',
      fontSize: 3
    },
    p: {
      color: 'text',
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body'
    },
    a: {
      color: 'primary'
    },
    pre: {
      fontFamily: 'monospace',
      overflowX: 'auto',
      code: {
        color: 'inherit'
      }
    },
    code: {
      fontFamily: 'monospace',
      fontSize: 'inherit'
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0
    },
    th: {
      textAlign: 'left',
      borderBottomStyle: 'solid'
    },
    td: {
      textAlign: 'left',
      borderBottomStyle: 'solid'
    },
    img: {
      maxWidth: '100%'
    },
  },
  box,
  card,
  forms: {
    input,
  },
  buttons,
}

const gruvbox = {
    bg0: '#282828',
    bg0Hard: '#1d2021',
    bg0Soft: '#32302f',
    bg1: '#3c3836',
    bg2: '#504945',
    bg3: '#665c54',
    bg4: '#7c6f64',
    fg0: '#fbf1c7',
    fg1: '#ebdbb2',
    fg2: '#d5c4a1',
    fg3: '#bdae93',
    fg4: '#a89984',
    darkRed: '#cc241d',
    darkGreen: '#98971a',
    darkYellow: '#d79921',
    darkBlue: '#458588',
    darkPurple: '#b16286',
    darkAqua: '#689d6a',
    darkOrange: '#d65d0e',
    darkGray: '#928374',
    lightRed: '#fb4934',
    lightGreen: '#b8bb26',
    lightYellow: '#fabd2f',
    lightBlue: '#83a598',
    lightPurple: '#d3869b',
    lightAqua: '#8ec07c',
    lightOrange: '#f38019',
    lightGray: '#a89984',
  }