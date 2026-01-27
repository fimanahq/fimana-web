export default defineNuxtRouteMiddleware((to) => {
  const authToken = useAuthToken()

  const isPublicRoute
    = to.path === '/'
      || to.path.startsWith('/login')

  // If there's no auth token, redirect to the login page unless already on the login page
  if (!authToken.isAccessTokenValid()) {
    if (!isPublicRoute) {
      return navigateTo('/login')
    }
    return
  }

  // If the user is already logged in and tries to access the login page, redirect to home
  if (authToken.isAccessTokenValid() && to.path.startsWith('/login')) {
    return navigateTo('/dashboard')
  }

  // Uncomment the following code if you want to handle the change-password route
  // If the user needs to change their password and is not on the change-password page, redirect to change-password
  // const { changePassword } = useAppConfig().meta
  // if (changePassword && !to.path.startsWith('/change-password')) {
  //   return navigateTo('/change-password')
  // }
})
