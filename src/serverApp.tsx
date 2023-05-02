import { RenderToPipeableStreamOptions, renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Location } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './redux/store';
import App from './App';

export const render = (
  url: string | Partial<Location>,
  opts: RenderToPipeableStreamOptions | undefined
) => {
  return renderToPipeableStream(
    <Provider store={store}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </Provider>,
    opts
  );
};
