/** @jsx jsx */
import { jsx, MenuButton, Box} from 'theme-ui';

function Burger() {
  return (
    <Box sx={{
      variable: "forms.button",
    }}>
    <MenuButton aria-label="toggle menu" />
    </Box>
  )
}

export default Burger
