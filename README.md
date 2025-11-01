# App Heroes

```diff
+ Importante: Una vez finalizado este curso, debes hacer el de reactQuery y el de tanstackQuery que es totalmente gratis con Fernando Herrera en su canal de YouTube
- Recomendado

```

> ⚠️ **Advertencia:** Pasos a seguir para hacer el curso de reactQuery y tanstackQuery

Una vez realizado este curso hacer el de reactQuery y el de tanstackQuery que es totalmente gratis con Fernando Herrera en su canal de YouTube

## Instalación de shadcn ui

Con esto le daremos mejor experiencia de usuario a nuestra app, podemos visitar su documentación oficial [shadcn-ui](https://shadcn.github.io/shadcn-ui/).
Importante seguir todos los pasos de instalación con vite.

Instalación de tailwindcss con vite

```bash
npm install tailwindcss @tailwindcss/vite
```

Como siguiente paso es poner la siguiente importación en el src/index.css

```css
@import '@tailwindcss';

```

✅ Checklist para que Tailwind 4 + Shadcn UI funcione con Vite

1️⃣ vite.config.ts
Debe tener tanto el plugin de React como el de Tailwind y el de alias (vite-tsconfig-paths):

✅ Checklist para que Tailwind 4 + Shadcn UI funcione con Vite

1️⃣ vite.config.ts
Debe tener tanto el plugin de React como el de Tailwind y el de alias (vite-tsconfig-paths):

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
})
```

## Instalación de Alias Globales TypeScript con Vite de dos maneras

### 1. Configuración para que nuestros elementos puedan ser encontrados a nivel global

en el tsconfig.json debemos agregar la siguiente configuración para configurar nuestros alias

```json
"compilerOptions": {
  "baseUrl": ".",
  "paths": {
    "@/*": ["./src/*"]
  }
}
```

Seguido de la configuración del tsconfig.app.json debemos agregar la siguientes lineas

```json
"compilerOptions": {
  "baseUrl": ".",
  "paths": {
    "@/*": ["./src/*"]    
  }
}

También debemos hacer algunas modificaciones en le vite.config.ts

antes instalamos el tipado de node para que funcione la importación de tailwindcss  

```bash
npm install @types/node
```

```ts
import path from 'path'
import tailwindcss from 'tailwindcss/vite'

export default defineConfig({
  plugins: [react(),tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
  },
})
```

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],  
})


------------------------------------------------------------------------

### 2. Configuración de Alias Globales de optimizada para TypeScript con Vite

Para que los componentes puedan importarse usando `@/`, agregamos en
`tsconfig.json`:

``` json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

Con esto TypeScript reconocerá `@/` como alias de la carpeta `src`.

### Simplificando la configuración de Vite

En lugar de configurar manualmente los alias en `vite.config.ts` con
`path.resolve` e instalar `@types/node`, podemos usar el plugin
[`vite-tsconfig-paths`](https://github.com/aleclarson/vite-tsconfig-paths).

Instalación:

``` bash
npm install vite-tsconfig-paths
```

Configuramos `vite.config.ts` así:

``` ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths' //ADD

export default defineConfig({
  plugins: [react(), tsconfigPaths()],//ADD
})
```

por ultimo pero no menos importante agregar la siguiente linea  en el archivo tsconfig.app.json

```json
{
  "extends": "./tsconfig.json", // 👈 importante para heredar paths y baseUrl
  "compilerOptions": {
    // Opciones específicas para la app si las necesitas
  },
  "include": ["src"],           // 👈 TypeScript analizará solo la carpeta src
  "exclude": ["node_modules", "dist"]
}

```

✅ Con esto: - No necesitamos configurar `path.resolve` manualmente. -
No necesitamos instalar `@types/node`. - Los alias definidos en
`tsconfig.json` funcionan automáticamente en Vite.

---

## Instalación de shadcn-ui

Para ello ejecutamos la siguiente linea de comandos

```bash
npx shadcn@latest init
```

Seleccionan el tema de su preferencia y luego ejecutamos la siguiente linea de comandos si queremos a;adir uno o varios componentes

```bash
npx shadcn@latest add (nombre del componente)
```

Si queremos ver toda la lista de componentes disponibles ejecutamos

```bash
npx shadcn@latest add
```

--- Segundo tema importante  

## 3 HERRAMIENTAS CLAVES CON IA PARA LA CREACIÓN DE INTERFACES DE USUARIO

### v0 by Vercel

### Lovable

### bolt.new

La mayoría trabajan con tailwindcss y shadcn-ui para crear interfaces de usuario

## Instalación de React Router

Vamos a la documentación oficial de React Router Dom [https://reactrouter.com/en/main](https://reactrouter.com/en/main) y recordemos que vamos a trabajar en modo Data

```bash
npm i react-router
```

En este proyecto lo vamos a estructurar por funcionalidades de la app, por eso cada uno de los directorios va tener cada uno sus propios componentes
sus propias paginas, sus hooks y sus estilos, etc

Las Rutas principales las vamos a crear dentro de un directorio principal llamado `routes`, muchas veces estará dentro de la raíz del archivo

Para poder implementarlo debemos usar el RouterProvider el cual recibe una property llamada router, com buena practica podemos crear un componente nombrado
con el nombre de la app que estamos creando y no usar el main directamente.

## Lazy load - carga perezosa

El lazy loading es una técnica que permite cargar los componentes de manera perezosa, es decir, solo se cargan cuando se necesita, lo cual puede mejorar el desempeño de la app.

La idea de lazy loading en que la carga de componentes sea bajo demanda y solo se carguen cuando se necesiten.

> Recomendable aplicarlo en las paginas que no se vean en el inicio de la app

### Tendemos problemas con las imágenes

El error JSX element class does not support attributes because it does not have a 'props' property.ts(2607) se debe a que estas imágenes son utilizadas con
nest.js y no con react, por eso borramos el Image y usamos img en su lugar. también se debe eliminar el fill que contiene Image

## Usaremos el navigation  Menu de shadcn-ui

Es bueno cuando estemos usando alguna herramienta de desarrollo como shadcn o bolt.new, mirar en su documentación si existe componentes que
podamos usar para ahorrar tiempo y poder desarrollar el proyecto de manera eficiente, en este caso usaremos el navigation Menu de shadcn-ui para el nav
de la app.

Para instalar este componente usaremos la siguiente linea de comandos

```bash
npm i @radix-ui/react-navigation-menu
```

## Instalación de los Breadcrumb de shadcn-ui

Para instalar este componente usaremos la siguiente linea de comandos

```bash
npm i @radix-ui/react-breadcrumbs
```

## Funcionalidad, cache y optimizaciones

usaremos la url para pasar información entre componentes y evitar cargar la información de nuevo y el uso de useState para optimizar la app

> Estamos usando una estructura separada por módulos para separar las funciones y el componente principal

## Heroes APP

### Levantar desarrollo

1. clonar el repositorio
2. Editar el archivo `.env` con las variables de entorno
basado en el archivo `.env.template`
3. Ejecutar el comando `npm install`
4. Ejecutar el comando `npm run dev`

Trabajaremos con Axios, para hacer las llamadas a la API, para ello debemos instalar Axios, o fetch en su lugar

```bash
npm i axios
```

> Es muy tradicional usar un useEffect para hacer las llamadas a la API o petición http, pero no es recomendado por que siempre que el elemento se monte el componente va a hacer la petición a la API. Soluciones a esto si se esta trabajando con nest.js qu este se haga a traves del servidor, pero en nuestro caso estamos desde el lado del cliente y existe una herramienta llamada tanstack Query antes conocida como react query que nos permite hacer las llamadas de manera perezosa y optimizada.

Tanstack query es un gestor de estado asíncrono el cual funciona muy bien con TS/JS y React, Solid, Svelte, Vue, y Angular. Fernando tiene un curso gratuito de tanstack query en su canal de YouTube para entrar mas a detalle.

Vamos a la documentación oficial de tanstack query [https://tanstack.com/query/v4](https://tanstack.com/query/v4)

Continuamos con su instalación

```bash
npm i @tanstack/react-query
```

Recomendado para tener un buen código usando tanstack query es instalar el plugin para el uso de ESLint

```bash
npm i @tanstack/eslint-plugin-query
```

importante ir a la parte de implementación, aplicado a nuestro componente principal `HeroesApp.tsx`

import { RouterProvider } from "react-router"
import { appRouter } from "./router/app.router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

```JSX
export const HeroesApp = () => {
  return (
    <>
    <QueryClientProvider client={queryClient}>  
      <RouterProvider router={appRouter}/>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    </>
  )
}
```

Para tener diagnósticos de nuestras peticiones instalaremos las Devtools de tanstack query, las cual es una instalación de producción

```bash
npm i @tanstack/react-query-devtools
```

Una de la propiedades para que los queries consuman los datos alojados en la cache por un tiempo determinado es `staleTime`

Hacemos un mapeo de la data que nos devuelve la API, para

## Mostrando la data de heroes

Mostraremos la información en las tarjetas y también tendremos navegación manual con el useNavigate de react router, este nos presenta varias firmas
una es el to y la otra el delta la cual esta basada en la navegación de un historial.

Lo común es ver un template literal con la información de la ruda donde queremos navegar, recordemos que en nuestro router no tenemos ningún
comportamiento dinámico por lo que el to puede ser un string o un template literal.

Para los casos de que no exista la ruta usaremos ene le router el path * que significa cualquier cosa y mostrar un 404, lo otro es usar el componente
de Navigate de react router para navegar a la ruta principal.

> Recomendación para el uso de bot de búsqueda  ellos prefieren nombres en lugar de ids, para este caso en particular usaremos `slug` que significa el
cual actúa como un identificador único; pero es url friendly.

Debemos crear esa ruta dinámica con el slug de la heroes

> Ya emos mencionado muchas veces que manejar el estado de lo posible mediante queryParameters cuando tenemos navegación dinámica es una buena práctica. para preservare el estado de la
información y poder compartirla con alguien mas de manera sencilla. Este es un problema del uso del useState

La información del estado se puede perder solo con navegar dentro de la misma pagina. Se podría decir que se puede usar localStorage para preservar el estado
pero eso no solucionaría el poder compartir la información con alguien mas de manera sencilla, he implicaría mas lógica adicional.

Se debe considerar que los queryParameters son opcionales por eso se considera la posibilidad de que venga nulo. Estos siempre son un string

## Paginar Datos

Debo tener cuidado al parar los queryParameters de que no sean NaN ya que nos va a traer un error, debo hacer la validación de los queryParameters, se podria
hacer en la action o en en home

Cuando mi función que esta dentro de tanstack query recibe argumentos, estos argumentos deben ser parte del queryKey

## Paginación el los filtros

Debemos enviar el los query params una variable llamada villain para poder hacer la paginación de los villanos

## Context API - Búsquedas de favoritos

En esta sección, trabajaremos en la implementación de la búsqueda avanzada de héroes y en un sistema global para gestionar los héroes favoritos.

El objetivo es seguir el patrón de delegar la mayor cantidad de lógica a estados fuera de `useState` y `useEffect` para optimizar el rendimiento y, finalmente, preservar el estado al compartir el enlace de la aplicación.

Tras esta sección, se proporcionarán tareas adicionales para practicar y consolidar los conocimientos adquiridos. Posteriormente, se llevarán a cabo pruebas automáticas.

Paso a seguir si se descargaron el repositorio

### Levantar desarrollo del proyecto

1. clonar el repositorio
2. Editar el archivo `.env` con las variables de entorno basado en el archivo `.env.template`
3. Ejecutar el comando `npm install`
4. Ejecutar el comando `npm run dev`

## Para tener un estado global

Para tener un data global lo mejor es tener un contexto o un gestor de estado global. para este caso crearemos un contexto llamado HeroesContext en el
directorio de lo heroes
> un higher order component es un componente que recibe un componente como argumento y lo envuelve para agregar funcionalidad extra a ese componente. en otras
palabras recibe un children

Recordemos que ese provider envuelve el componente principal, que en este caso es HeroesApp para tener el contexto disponible en toda la app. Recordar
guardar esos favorito en le local localStorage para que se persistente al recargar la app

## uso de useRef

Cambia con cada render pero su cambio no produce re-renders.

Instalamos de shadcn el slider de shadcn-ui

```bash
npm i @radix-ui/react-slider
```

Con el slider podemos seleccionar rangos o un solo valor

## Realizar pruebas unitarias

Para realizar pruebas unitarias en Vite, utilizaremos **Vitest**, una alternativa moderna y más rápida que Jest, totalmente compatible con su API.

### Instalar dependencias Testing

1. [Vitest](https://vitest.dev/guide/)

    ```bash
    npm install --save-dev vitest jsdom
    ```

2. React [Testing Library](https://testing-library.com/docs/react-testing-library/intro)

    ```bash
    npm install --save-dev @testing-library/react @testing-library/dom
    ```

    - Todo en un sólo comando:

    ```bash
    npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
    ```

3. Crear estos scripts en el `package.json`

    ```json
    "scripts": {
      "test": "vitest",
      "test:ui": "vitest --ui",
      "coverage": "vitest run --coverage"
    }
    ```

4. Configurar `vite.config.ts`

    ```ts
    import { defineConfig } from 'vitest/config'
    import react from '@vitejs/plugin-react-swc'

    export default defineConfig({
      plugins: [react()],
      test: {
        environment: 'jsdom',
        globals: true,
      },
    })
    ```

5. Agregar tipos en `tsconfig.json`

    ```json
    {
      "compilerOptions": {
        "types": ["vitest/globals", "@testing-library/jest-dom"]
      }
    }
    ```

6. Ejemplo básico de prueba

    ```tsx
    import { render, screen } from "@testing-library/react"
    import { describe, it, expect } from "vitest"
    import Hello from "./Hello"

    describe("Hello Component", () => {
      it("debe mostrar el texto correctamente", () => {
        render(<Hello name="Mundo" />)
        expect(screen.getByText("Hola Mundo")).toBeInTheDocument()
      })
    })
    ```

---

## Pruebas unitarias con Vitest

### Variables de entorno

Podemos tener un archivo de test con nuestras variables de entorno env.test para poder hacer pruebas unitarias con las variables de entorno esto seria desde el cliente.
desde el servidor estas variables se pasan por la terminal de la consola. En el backend para Windows es `set PORT=3001 && npm run start:dev` a diferencia de
en Linux `PORT=3001 npm run start:dev`

Para ejecutar las pruebas con las variables de entorno desde el lado del servidor usaremos el comando  `npm run test:unit`

> Muy importante controlar muy bien el servidor de desarrollo para poder hacer pruebas unitarias con las variables de entorno

### Test = getHeroAction

Para los test empezamos con la ruta critica desde lo mas fácil a lo mas complejo

### La implementación de playwright de <https://playwright.dev/docs/intro>

Seguir el link para ver la implementación de playwright, esta librería nos facilita la automatización de pruebas de end-to-end.
para evitar el uso de mock o de un servidor de desarrollo.

### Pruebas en getHeroesByPageAction

Usaremos axios-mock-adapter para hacer las pruebas unitarias de la acción getHeroesByPageAction pero como dependencia de desarollo, no
dirigimos a la pagina de npmjs.com, sino a la pagina de github.com

```bash
npm install axios-mock-adapter --save-dev
```

### pruebas de useHeroSummary

Tendremos problemas con queryClient, debemos preparar el test para que el test encuentre el queryClient, usando un provider como un wrapper para el test

crearemos un mock falso con vi.mocked, para poder hacer pruebas unitarias con vitest

### test FavoriteHero Context

El contexto es muy importante para nuestra aplicación porque es el encargado de manejar los estados de los favoritos que se guardan en el localStorage.
La dificulta es que recibe un hijo y esto lo convierte en un higher order component sumándole algunas dependencias con el localStorage.

Se nos presentara error a la hora de querer renderizar el componente, debemos crear un componte que dependa del contexto para poder renderizar

El localStorage para la parte de los test ya podemos hacer referencia a un objeto storage para poder hacer pruebas unitarias, este es una implementación propia para node

> Recordar que la diferencia entre el return y el resolve es que el return es para funciones tradicionales y el resolve es para funciones que retornan promesas

### Test CustomPagination

En este caso probamos los componentes por su URL y enviar queries Parameter para poder hacer pruebas unitarias con vitest implementado el MemoryRouter de React Router
