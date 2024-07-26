import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

import paths from '../../constants/paths'
const listLinks = [
  {
    id: 1,
    label: 'Pedidos',
    link: paths.Order,
    icon: ShoppingBagIcon
  },
  {
    id: 2,
    label: 'Listar Produtos',
    link: paths.Products,
    icon: ShoppingCartIcon
  },
  {
    id: 3,
    label: 'Adicionar Produtos',
    link: paths.NewProduct,
    icon: LibraryAddIcon
  },
  {
    id: 4,
    label: 'Criar Categoria',
    link: paths.NewCategory,
    icon: LibraryAddIcon
  }
]

export default listLinks
