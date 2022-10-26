You need to create micro service called as auth-service. This service must contains the following API methods.

     1. Method name is /register => In this service user can able to register with following parameters => username, full name, emailId and password.

     2. Method name is /login => In this service user will pass the credentials, we need to generate the jwt token. If user is registered with us.

     3. Method name is /profile => in this service user will pass the jwt token, if token is valid we need to return the user information (full name , email, username)

Note: Use MongoDB as data layer

You need to push the code in your GitHub public profile.
