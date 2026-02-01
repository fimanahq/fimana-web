export default defineNuxtRouteMiddleware((to) => {
  const authToken = useAuthToken()

  const isPublicRoute
    = to.path === '/'
      || to.path.startsWith('/login')
      || to.path.startsWith('/signup')

  const isAuthRoute
    = to.path === '/'
      || to.path.startsWith('/login')
      || to.path.startsWith('/signup')

  // If there's no auth token, redirect to the login page unless already on a public route
  if (!authToken.isAccessTokenValid()) {
    if (!isPublicRoute) {
      return navigateTo('/login')
    }
    return
  }

  // If the user is already logged in and tries to access public/auth pages, redirect to dashboard
  if (authToken.isAccessTokenValid() && isAuthRoute) {
    return navigateTo('/dashboard')
  }

  // Uncomment the following code if you want to handle the change-password route
  // If the user needs to change their password and is not on the change-password page, redirect to change-password
  // const { changePassword } = useAppConfig().meta
  // if (changePassword && !to.path.startsWith('/change-password')) {
  //   return navigateTo('/change-password')
  // }
})
