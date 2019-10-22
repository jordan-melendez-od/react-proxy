## React Micro App Proxy
This module will help proxy your frontend api requests to a different environments. Proxy between SQS, SQM, and Production environments by easily changing the proxy url.

Keep in mind, this is meant to be the ground work to get a proxy working. You may have to modify the server file to get it working with your routes.

### How to use

```
git clone http://url.com

npm install
```

In the root path there is a cookie.txt file. If your routes depend on the same cookies, copy the cookie from the browser. Below is a link for a chrome extension that will copy the tab's cookie in one string.

Once the server is started you should see a welcome message on localhost:5000 (or whichever port you designate in the server.js file).

After configuring the proxy url in your frontend to your server port (defaults to 5000), all subsequent calls should be proxied to the environment you choose.