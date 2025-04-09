# Setting Up The Lense Shop with XAMPP/WAMP

This guide walks you through setting up The Lense Shop for offline development using either XAMPP or WAMP server.

## XAMPP Setup (Cross-Platform)

### 1. Install XAMPP

1. Download XAMPP from [apachefriends.org](https://www.apachefriends.org/index.html)
2. Run the installer and follow the installation wizard
3. Select components to install (at minimum Apache, MySQL, PHP, and phpMyAdmin)
4. Complete the installation and launch the XAMPP Control Panel

### 2. Configure Apache

1. In the XAMPP Control Panel, start the Apache service
2. Click on the "Config" button for Apache
3. Select "httpd.conf" to edit the configuration
4. Find the `DocumentRoot` directive and change it to point to your project folder:
   ```
   DocumentRoot "C:/path/to/the-lense-shop"
   <Directory "C:/path/to/the-lense-shop">
   ```
5. Save the file and restart Apache

### 3. Install PostgreSQL Separately

XAMPP comes with MySQL, but for our project, we need PostgreSQL:

1. Download PostgreSQL from [postgresql.org](https://www.postgresql.org/download/)
2. Follow installation steps from the [database guide](database-guide.md)
3. Create the project database and import the data

### 4. Run the Application

1. Open the XAMPP Control Panel
2. Start the Apache service
3. Open a terminal/command prompt and navigate to your project directory
4. Run the application:
   ```bash
   npm start
   ```
5. Access the application at `http://localhost:5000`

## WAMP Setup (Windows only)

### 1. Install WAMP

1. Download WAMP from [wampserver.com](https://www.wampserver.com/en/download-wampserver-64bits/)
2. Run the installer and follow the installation wizard
3. Complete the installation and launch WampServer
4. Verify the WAMP icon in your system tray turns green (indicating all services are running)

### 2. Configure Apache

1. Left-click on the WAMP icon in the system tray
2. Navigate to "Apache" → "httpd.conf"
3. Find the `DocumentRoot` directive and change it to point to your project folder:
   ```
   DocumentRoot "C:/path/to/the-lense-shop"
   <Directory "C:/path/to/the-lense-shop">
   ```
4. Save the file and restart all services via the WAMP menu

### 3. Install PostgreSQL Separately

Like XAMPP, WAMP comes with MySQL, but we need PostgreSQL:

1. Download PostgreSQL from [postgresql.org](https://www.postgresql.org/download/windows/)
2. Follow installation steps from the [database guide](database-guide.md)
3. Create the project database and import the data

### 4. Run the Application

1. Ensure WAMP is running (green icon)
2. Open a command prompt and navigate to your project directory
3. Run the application:
   ```bash
   npm start
   ```
4. Access the application at `http://localhost:5000`

## Using Node.js with XAMPP/WAMP

Since our application uses Node.js and PostgreSQL, we're using XAMPP/WAMP primarily for the Apache server and PHP. Here's how to integrate everything:

### Configure Port Settings

If you encounter port conflicts (Apache and Node.js both want to use port 80):

1. Change Apache's port in XAMPP/WAMP:
   - XAMPP: Edit `httpd.conf` and change `Listen 80` to `Listen 8080`
   - WAMP: Use the WAMP menu → Apache → httpd.conf and make the same change
   
2. Configure your application to run on port 5000 by setting in your `.env` file:
   ```
   PORT=5000
   ```

### Proxy Requests (Optional Advanced Setup)

You can set up Apache to proxy requests to your Node.js application:

1. Enable required Apache modules:
   ```
   LoadModule proxy_module modules/mod_proxy.so
   LoadModule proxy_http_module modules/mod_proxy_http.so
   ```

2. Add to your virtual host configuration:
   ```
   ProxyRequests Off
   ProxyPreserveHost On
   ProxyVia Full
   <Proxy *>
      Require all granted
   </Proxy>
   
   ProxyPass / http://localhost:5000/
   ProxyPassReverse / http://localhost:5000/
   ```

3. Restart Apache

## Development Workflow

With this setup:

1. Apache server (from XAMPP/WAMP) can serve any PHP/static content
2. Node.js runs your Express application on port 5000
3. PostgreSQL database contains your application data

For development:
1. Start XAMPP/WAMP services
2. Start your Node.js application with `npm run dev`
3. Make your code changes - the application will reload automatically

## Troubleshooting

### Port Conflicts

If you see errors like "port already in use":

1. Check what's using the port:
   ```bash
   # Windows
   netstat -ano | findstr :5000
   
   # macOS/Linux
   lsof -i :5000
   ```
   
2. Either close the conflicting application or change your application's port

### Apache Not Serving Files

If Apache can't see your files:

1. Check file permissions
2. Verify the DocumentRoot path is correct
3. Make sure Apache is actually running

### PostgreSQL Connection Issues

1. Check if PostgreSQL is running
2. Verify your connection string in the `.env` file
3. Test the connection with a PostgreSQL client like pgAdmin