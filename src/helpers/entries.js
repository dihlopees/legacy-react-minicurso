import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';

window.renderReactComponent = window.renderReactComponent || {};

/**
 * Define os providers a serem utilizados pelos componentes.
 *
 * Aqui podem ser declarados providers como o Redux, React Router, Style Theme, etc.
 */
const Providers = ({ children }) => {
  return <Suspense fallback="Carregando ...">{children}</Suspense>;
};

/**
 * Cria a função que irá renderizar o componente.
 *
 * Tal função é injetada no objeto window, para que possa ser acessada de qualquer local na aplicação legada.
 *
 * Exemplo:
 *
 * ```html
 * <div id="element-root"></div>
 *
 * <script>
 *   const elementRoot = document.getElementById('element-root');
 *
 *   window.renderReactComponent.NomeDoComponente(props, elementRoot);
 * </script>
 * ```
 *
 * Caso o elementRoot não seja informado, o componente será renderizado no elemento pai do script que chamou a função.
 *
 * Exemplo:
 *
 * ```html
 * <div id="element-root">
 *   <script>
 *     window.renderReactComponent.NomeDoComponente(props);
 *   </script>
 * </div>
 * ```
 *
 * Caso esteja rodando em modo de desenvolvimento, o componente será renderizado no elemento com id 'root'.
 */
export const createEntry = ({ name, component: Component }) => {
  if (window.renderReactComponent[name]) {
    throw new Error('Already exists component with name ' + name);
  }

  window.renderReactComponent[name] = (props, elementRoot) => {
    const root = ReactDOM.createRoot(
      elementRoot || document.currentScript.parentNode
    );
    root.render(
      <Providers>
        <Component {...props} />
      </Providers>
    );
  };

  if (process.env.NODE_ENV === 'development') {
    window.renderReactComponent[name]({}, document.getElementById('root'));
  }
};
