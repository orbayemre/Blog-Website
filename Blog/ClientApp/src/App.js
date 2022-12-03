import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import {Provider} from "react-redux";
import store from "./Stores";

export default function App(){
    return (
        <Provider store={store}>
            <Routes>
              {AppRoutes.map((route, index) => {
                const { element, ...rest } = route;
                return <Route key={index} {...rest} element={element} />;
              })}
            </Routes>
        </Provider>
    );
}
