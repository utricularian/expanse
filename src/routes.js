import Home from './Home';
import Posts from './Posts';
import Todos from './Todos';
import NotFound from './NotFound';

import loadData from './helpers/loadData';

const Routes = [
  {
    path: '/',
    exact: true,
    component: Home,
    props: { name: "Alligator" }
  },
  {
    path: '/posts',
    component: Posts,
    loadData: () => loadData('posts')
  },
  {
    path: '/todos',
    component: Todos,
    loadData: () => loadData('todos')
  },
  {
    path: '/*',
    exact: false,
    component: NotFound
  }
];

export default Routes;
