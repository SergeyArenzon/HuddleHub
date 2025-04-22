# Authentication and Layouts in HuddleHub

This application implements a conditional layout system based on user authentication status. It provides different layouts for authenticated and non-authenticated users.

## How it Works

### Authentication System

The authentication system is implemented using a composable pattern in Vue.js:

- **`useAuth` Composable**: Located in `app/composables/useAuth.ts`, this composable provides reactive state for authentication status and user data.
- **Authentication Persistence**: Uses localStorage to persist authentication state between page reloads.
- **Auth Plugin**: Initializes authentication state on app startup via `plugins/auth.ts`.

### Layout System

The layout system consists of:

1. **Default Layout** (`app/layouts/default.vue`): A minimal layout for non-authenticated users.
2. **Authenticated Layout** (`app/layouts/authenticated.vue`): A more complex layout for authenticated users, including the sidebar and other authenticated-only components.

### Key Components

- **`app.vue`**: The main application component that conditionally renders the appropriate layout based on authentication status.
- **Global Auth Middleware** (`middleware/auth.global.ts`): Handles route protection, redirecting unauthenticated users to the signin page.
- **AppSidebar Component**: The main navigation component for authenticated users, with user profile and logout functionality.

## How to Use

### Authentication

The `useAuth` composable provides the following functions:

```js
const { isAuthenticated, user, login, logout, initAuth } = useAuth()
```

- **isAuthenticated**: Reactive boolean indicating if the user is logged in
- **user**: Reactive object containing user data
- **login()**: Function to log in the user
- **logout()**: Function to log out the user
- **initAuth()**: Initialize authentication state (called by auth plugin)

### Adding New Pages

When adding new pages to the application:

1. **For public pages**: Add the route path to the `publicRoutes` array in `middleware/auth.global.ts`
2. **For authenticated pages**: No additional configuration needed, they're protected by default

### Customizing Layouts

- **Authenticated Layout**: Edit `app/layouts/authenticated.vue` to change the layout for authenticated users
- **Default Layout**: Edit `app/layouts/default.vue` to change the layout for non-authenticated users

## Example Usage

```vue
<script setup>
// Get authentication status
const { isAuthenticated, user, logout } = useAuth()

// Example of a protected action
const performProtectedAction = () => {
  if (!isAuthenticated.value) {
    // Handle unauthenticated state
    return
  }
  
  // Perform action for authenticated users
}
</script>

<template>
  <div>
    <!-- Content visible to all users -->
    <h1>Welcome to HuddleHub</h1>
    
    <!-- Content only visible to authenticated users -->
    <div v-if="isAuthenticated">
      <p>Hello, {{ user.first_name }}!</p>
      <button @click="logout">Sign Out</button>
    </div>
    
    <!-- Content only visible to non-authenticated users -->
    <div v-else>
      <NuxtLink to="/signin">Sign In</NuxtLink>
    </div>
  </div>
</template>
``` 