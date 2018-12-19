import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware ,compose} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';   //处理异步的中间件
import { AppContainer } from 'react-hot-loader';
import reducer from './reducer';
import Page from './Page';
// import registerServiceWorker from './registerServiceWorker';

// redux 注入操作
const store = createStore(reducer,compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():f => f   //开发者使用调试工具redux-devtools
));

const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <Component store ={store} />
            </Provider>
        </AppContainer>,
        document.getElementById('root')
    );
};
render(Page);

// Webpack Hot Module Replacement API
if (module.hot) {
    // 隐藏You cannot change <Router routes>; it will be ignored 错误提示
    // react-hot-loader 使用在react-router 3.x上引起的提示，react-router 4.x不存在
    // 详情可参照https://github.com/gaearon/react-hot-loader/issues/298
    const orgError = console.error; // eslint-disable-line no-console
    console.error = (...args) => { // eslint-disable-line no-console
        if (args && args.length === 1 && typeof args[0] === 'string' && args[0].indexOf('You cannot change <Router routes>;') > -1) {
            // React route changed
        } else {
            // Log the error as normally
            orgError.apply(console, args);
        }
    };
    module.hot.accept('./Page', () => {
        render(Page);
    })
}
// registerServiceWorker();