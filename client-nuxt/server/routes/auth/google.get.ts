import qs from "querystring";

export default defineOAuthGoogleEventHandler({
    async onSuccess(event, { user, tokens }) {
      const response = await fetch(`http://huddlehub.io/api/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jwt: tokens?.id_token, // Send the Google JWT to verify
          provider: "google"
        }),
      });  

      const authServiceResponse = await response.json();

      // Get the cookie from response headers
       const cookie = qs.decode(response.headers.get("set-cookie") as string, "; ", "=");
      const [cookieName, cookieValue] = Object.entries(cookie)[0] as [string, string];
        // Set the JWT token in a secure HTTP-only cookie
        setCookie(event, cookieName, cookieValue, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 60 * 60 * 24 * 7, // 7 days
          path: '/'
        })

      await setUserSession(event, {user: authServiceResponse})
      return sendRedirect(event, '/')
    },
    // Optional, will return a json error and 401 status code by default
    onError(event, error) {
      console.error('Google OAuth error:', error)
      return sendRedirect(event, '/')
    },
  })



