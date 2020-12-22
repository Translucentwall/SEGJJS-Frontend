import Home from '../views/Home'
import Search from '../views/SearchPage'
import Rank from '../views/Rank'
import Paper from '../views/Paper'
import Entity from "../views/Entity";
import Graph from "../views/Graph";
import PeerReview from "../views/PeerReview";

export let routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '*',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/review',
    name: 'PeerReview',
    component: PeerReview
  },
  {
    path: '/search/:mode/:content',
    name: 'Search',
    component: Search
  },
  {
    path: '/rank',
    name: 'Rank',
    component: Rank
  },
  {
    path: '/paper/:id',
    name: 'Paper',
    component: Paper
  },
  {
    path:'/entity/:type/:id',
    name:'Entity',
    component: Entity
  },
  {
    path: '/graph/:type/:id',
    name: 'Graph',
    component: Graph
  }
  ];
