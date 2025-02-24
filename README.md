This is a React storefront app built with Vite for fast development and optimized performance. It features functional components with hooks, global state management, data fetching, and performance optimizations.

Prerequisites
Ensure that you have the following tools installed on your local machine:

Node.js (version 14 or higher) - Install Node.js
npm (Node package manager) - Comes installed with Node.js
Git - Install Git
Cloning the Repository
Follow these steps to clone the repository and set it up on your local machine:

Clone the Repository Open a terminal/command prompt and run the following command:

git clone https://github.com/Erasmus24/mall_street.git
Navigate to the Project Directory Change into the directory of the cloned repository:

cd your-repository-name
Installing Dependencies
After cloning the repository, you need to install the project dependencies. Run the following command in the project directory:

npm install
This will install all the necessary dependencies specified in the package.json file.

Running the Development Server
To run the app locally in development mode:

Start the development server with:

npm run dev
Open your browser and navigate to:

http://localhost:3000
The app should now be running on your local machine.

Design Decisions and Choices
React Hooks
I use React hooks extensively in this application. Hooks like useState, useEffect, useContext, and custom hooks provide a clean and functional way to manage state and side effects in functional components. Hooks offer several benefits:

Simplicity and readability: Functional components with hooks are more concise and easier to understand than class components.
State and lifecycle management: Hooks allow us to manage state, perform side effects (e.g., fetching data), and reuse logic without needing to convert components to classes.
Improved performance: Hooks like useMemo and useCallback help optimize performance by memoizing values and functions to avoid unnecessary re-renders.
State Management: Context API (or Redux)
For state management, I chose to use Context API (or Redux if applicable, depending on the complexity of state needs). Here’s why:

Context API: It’s a simple, built-in solution that provides a way to share state across the entire app without having to pass props manually through every component. It’s perfect for small to medium-sized apps with global state like authentication, theme preferences, or shopping cart data. It’s easy to set up and doesn’t require additional libraries.

Pros: Less boilerplate code, built-in React feature, no need for third-party libraries.
Cons: Not as scalable for very large applications with complex state management needs.
Redux (for more complex state needs): For larger apps, where managing state becomes more difficult with Context API alone, we can opt for Redux, which offers a more structured and powerful way to manage global state. It helps with tracking state changes and handling asynchronous actions with middleware like Redux Thunk or Redux Saga.

Data Fetching: react-query
To handle data fetching, I use react-query. This decision was made for the following reasons:

Declarative data fetching: With react-query, data fetching is automatic and declarative. It makes API calls, handles caching, and updates the UI when data is fetched or an error occurs.
Built-in features: React-query comes with built-in features like caching, pagination, and refetching, making it a powerful and convenient solution for managing server-state.
Error handling and loading states: React-query simplifies handling loading and error states, allowing us to focus on building the user interface rather than managing the various states manually.
Performance Optimizations
Memoization with useMemo and useCallback: To optimize the performance of the app, we use the useMemo hook to memoize expensive calculations and useCallback to memoize functions that are passed down to child components. This helps avoid unnecessary re-renders, which can be costly in large React apps.
Lazy loading with React.lazy: For larger components or routes, we use React.lazy for code-splitting. This loads components only when they are needed, which improves the initial loading time of the app and makes it more performant.
Styling
For styling, I used  styled-components. I chose Styled Components for styling because it allows us to write CSS directly within JavaScript, keeping styles scoped to components and improving maintainability. It provides dynamic styling based on component props and state, supports automatic vendor prefixing, and allows for easy theme management. Additionally, it helps avoid global style conflicts and ensures better performance by optimizing the CSS generated at runtime. This approach aligns well with the modular, component-driven nature of React.
