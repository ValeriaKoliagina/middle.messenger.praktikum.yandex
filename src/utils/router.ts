import Block from '../components/block/block';
import redirections from '../constants/redirections';
import AuthApi from '../api/authApi';
import { IRouteOptions, IPage } from './interfaces';
import { GlobalStore } from './store';

const PUBLIC_ROUTES = [
  '/not_found',
  '/oops',
  '/',
  '/signup',
];
class Route {
  _pathname: string;
  _blockClass: IPage;
  _block: Block | null;
  _props: IRouteOptions;

  constructor(pathname: string, view: IPage, props: IRouteOptions) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string): void {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave(): void {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string): boolean {
    return pathname === this._pathname;
  }

  render(): void {
    this._block = new this._blockClass(this._props.rootQuery);
    this._block.show();
  }
}

export class Router {
  routes: Route[];
  history: History;
  _currentRoute: Route | null;
  _rootQuery: string;
  static __instance: Router;

  constructor(rootQuery = 'app') {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(pathname: string, block: IPage) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });
    this.routes.push(route);

    return this;
  }

  start() {
    window.onpopstate = (event: PopStateEvent) => {
      this._onRoute((<Window>event?.currentTarget)?.location?.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  async _onRoute(pathname: string) {
    if (!PUBLIC_ROUTES.includes(pathname)) {
      try {
        await new AuthApi().getUserInfo();
      } catch (err) {
        return this.go(redirections.LOGOUT);
      }
    }

    const route = this.getRoute(pathname);
    if (!route) {
      return this.go('/not_found');
    }

    (new GlobalStore()).unsubscribeAll();

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back() {
    window.history.back();
  }

  forward() {
    window.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find(route => route.match(pathname));
  }
}

export default Router;
