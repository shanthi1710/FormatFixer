This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
 ```

## Approaches to Making Steps Persistent

Introducing persistence into a project requires an approach that guarantees the state of each step is stored in such a way that it can be accessed and retrieved later, no matter if the page is closed or refreshed. Here are the steps:

1. Use Local Storage or Session Storage:

Local Storage: If you would like to keep the data even when the browser is closed and the reopening feature is activated use the local storage. In this scenario, you will be able to design a user interface that displays the state of each step in the browser's memory, which can further be retrieved later.

Session Storage: If the persistence is needed for the browser session only then the session storage is the best option to be used in.

2. Backend Persistence (Database):

For better persistence, particularly if the user might need to access the information from different devices or want to save the steps across multiple sessions, you should save the steps to a database. Each step’s data can be sent to a backend API that stores it in a database.

3. State Management with Redux or Context API:

If the code is written with Redux or Context API as the main data-carrying and data managing tool, one can introduce the feature of storing the steps in the global state and use the middleware like redux-persist to automatically save the state and bring it back to the local storage or session store.

4. Form Auto-Save Mechanism:

Develop a self-motivated saving mechanism where each step is automatically saved at intervals you set or the user makes changes. This method can be utilized separately or in combination with any of the other methods for persistence.

5. Handling Invalid URLs and Data Validation:

Ensure that validation state is stored when talking about highlighting invalid URLs and other data validation steps, so the user's current state is not lost.

## Scaling Strategies for Handling Large Files

Scaling can be done in several ways. 

A few ways are mentioned below 

1)	Direct prop passing:

 passing the JSON data directly from parent to child component using props. They are needed when data need to be used by the direct children component.

2)	Context API:

 When we need to read big JSON data in multiple components across different webpage parts that belong to React, React's Context API provides globally available data.

3)	Server-Side Data Fetching: 

 With data fetched or generated on the server in the form of large JSON, getServerSideProps or getStaticProps make sure to pass that data to the component as props.

4)	State Management Libraries (Redux, Zustand, etc.) 

 If you have an application that has a shared or manipulated JSON object being passed to and from components in the application, then a state management library works awesome. The state is being stored in a central area where the components can call to either access or update the state.

5)	URL Parameters or Query Strings:

 If the JSON response isn’t too big and needs to be relayed across pages, serialize it and pass it as query parameters on the URL.
