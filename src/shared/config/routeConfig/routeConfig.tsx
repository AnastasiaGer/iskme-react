/* eslint-disable no-unused-vars */
import { RouteObject } from 'react-router-dom';
import { NotFoundPage } from 'pages/NotFoundPage';

import { Home } from 'pages/Home';
import { Library } from 'pages/Library';
import { Explore } from 'pages/Explore';
import { SharedContent } from '../../../widgets/SharedContent';
import { SubscribedContent } from '../../../widgets/SubscribedContent';
import { AdvancedSearch } from '../../../pages/AdvancedSearch';
import { AllCollections } from '../../../pages/AllCollections';
import { CollectionDetails } from '../../../pages/CollectionDetails/ui/CollectionDetails';
import { SearchResources } from 'pages/SearchResources';

export enum AppRoutes {
    HOME = 'home',
    EXPLORE = 'explore',
    LIBRARY = 'library',
    SEARCH = 'search',
    ADVANCED = 'advanced',
    BROWSE = 'browse',
    DETAILS = 'details',
    NOT_FOUND = 'not_found'
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: '/imls',
  [AppRoutes.EXPLORE]: '/explore-oer-exchange',
  [AppRoutes.LIBRARY]: '/site-collections',
  [AppRoutes.SEARCH]: '/search',
  [AppRoutes.ADVANCED]: '/advanced-resource-search',
  [AppRoutes.BROWSE]: '/browse',
  [AppRoutes.DETAILS]: '/collection-details/:name/:id/resources',
  [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, RouteObject> = {
  [AppRoutes.HOME]: {
    path: RoutePath.home,
    element: <Home />,
  },
  [AppRoutes.EXPLORE]: {
    path: RoutePath.explore,
    element: <Explore />,
  },
  [AppRoutes.LIBRARY]: {
    path: RoutePath.library,
    element: <Library />,
    children: [
      {
        path: '/site-collections/subscribed-collections',
        element: <SubscribedContent />,
      }, {
        path: '/site-collections/shared-collections',
        element: <SharedContent />,
      },
    ],
  },
  [AppRoutes.SEARCH]: {
    path: RoutePath.search,
    element: <SearchResources />,
  },
  [AppRoutes.ADVANCED]: {
    path: RoutePath.advanced,
    element: <AdvancedSearch />,
  },
  [AppRoutes.BROWSE]: {
    path: RoutePath.browse,
    element: <AllCollections />,
  },
  [AppRoutes.DETAILS]: {
    path: RoutePath.details,
    element: <CollectionDetails />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <NotFoundPage />,
  },
};
