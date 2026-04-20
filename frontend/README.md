# Comandos para levantar por primera vez la App
```
npm i sass
npm install react-router-dom
```

### levantar react
```
npm run dev
```
### matar procesos de node
```
killall -9 node
```

## Introducción

Esta guía ha sido formulada con mucho cariño con el propósito de normalizar el código fuente realizado para el proyecto y clientes en Experiencia It, Se siguen convenciones estándares de HTML, CSS y JS pero se optimizan y normalizan varias reglas implícitas, dejando lugar al uso de criterio de cada integrante del equipo de desarrollo web.


## Branches y flujo de trabajo

Clónate el repositorio principal a tu máquina local usando el comando git clone <URL-del-repositorio>.
Crea una nueva rama para trabajar en tu tarea utilizando el comando git branch nombre-de-tu-rama.
Cambia a tu rama recién creada usando el comando git checkout nombre-de-tu-rama.
Realiza tus cambios en archivos, agrega y realiza commits como se explicó anteriormente.
Cuando hayas terminado con tu tarea y desees incorporar tus cambios a la rama principal, cambia a la rama principal usando el comando git checkout main (o el nombre de la rama principal).
Fusiona tu rama con la rama principal usando el comando git merge nombre-de-tu-rama.
Si hay conflictos enla fusión, Git te notificará para que puedas resolverlos manualmente. Una vez resueltos, realiza el commit de fusión.
Siguiendo este flujo de trabajo, puedes colaborar de manera efectiva con otros desarrolladores en un proyecto, manteniendo un historial claro de cambios y evitando conflictos.

### branchs list:

    production
    development
    rama-dev

## Estructura de proyecto

```
nombre-proyecto/
|** src
| |** assets
| | | **fonts
| | | **images
| |** scss
| | |** style.scss
| | |** globalStyles.scss
| | |** inc
| | |** mixins.scss
| | |** normalize.scss
| | |** colors.scss
| | |** variables.scss
| | |** components.scss
| |** constants
| |** context
| |** components
| | |** pure
| | | |** header.jsx
| | | |** footer.jsx
| | containers
| | |** templatename.jsx
| |** pages
| | |** home
| | | |** home.jsx
| | | |** styles.jsx
|
|** package.json
|** .gitignore
```

### Sintaxis

Utiliza 2 espacios (soft tab) / 1 tab (hard tab) para indentar. Se configura fácilmente, por ejemplo, en Sublime Text.
El doctype por defecto será HTML5: doctype html
Usa doble comilla " (double quote) para abrir y cerrar atributos, aunque el estándar no lo requiera.
Prefiere atributos simples en los que su valor sea el mismo del atributo, por ejemplo:

// Evita:

```
    <input required="required" />
```

// Prefiere:

```
    <input required />
```

### Comentarios

// NOMBRE SECCION

## Nomenclatura de clases y ID's

Para nombres compuestos utiliza camelCase "openModal", no guión bajo \_ (underscore). Nunca comiences con un dígito.
Crea nombre de clases que sean descriptivas al contexto y/o función que cumple el elemento más que en su apariencia:
// Bien
.modal {}
.titulo {}
// Evita
.grande {}
.rojo {}

## JavaScript

Utilizar componentes de tipo funcion , en lugar de usar componentes de tipo clases:

```
const myFunction = () => {
// code here...
}
```

### ¿Por qué usar funciones por encima de clases?

El frontend está experimentando una fuerte influencia de los lenguajes de programación funcionales, y esto nos lleva a integrar practicas del paradigma funcional en nuestro día a día.
Ayuda a unificar criterios, donde todos los componentes tienen la misma estructura.
Nos ahorra entender un concepto que está en camino al desuso en Javascript (Clases), aligerando la curva de aprendizaje
Hacer testing de un componente funcional suele ser más sencillo.
Suelen requerir menos lineas de código haciendolo más facil de entender.