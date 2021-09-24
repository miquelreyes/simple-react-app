import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./views/App";
import reportWebVitals from "./reportWebVitals";
import { applyMiddleware, createStore, compose } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/sagas";
import holidaysReducers from "./redux/reducers/holidaysReducers";
import "antd/dist/antd.css";
import styled from "styled-components";

const StyledApp = styled(App)`
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;

	> * {
		margin: 0.5rem;
	}
`;

const composedEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
	holidaysReducers,
	composedEnhancer(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
	<Provider store={store}>
		<React.StrictMode>
			<StyledApp className="App" />
		</React.StrictMode>
	</Provider>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
