import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CSpinner } from '@coreui/react';
import routes from './routes';

function App() {
  
  return (
    <Suspense
      fallback={
        <div className="pt-3 text-center">
          <CSpinner color="primary" variant="grow" />
        </div>
      }
    >
      <Routes>
        {routes.map((route, idx) => {
          const Element = route.element;
          const Component = route.component || null;

          return (
            <Route
              key={idx}
              path={route.path}
              element={<Element component={Component} />}
            /> 
          );
        })}
      </Routes>
    </Suspense>
  );
}

export default App;
