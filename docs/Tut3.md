## Server-Side Script with Python
We used Python Script to make the routing query and send the result back to the web client. The following steps were utilized necessary.

* Retrieving the start and endpoint coordinates.
* Finding the closest edge to start-end point.
* Taking the start or end vertex of this edge (for Dijkstra) of the route and end, respectively.
* Making the Shortest Path database query.
* Transformation of the query result to GeoJSON and creation of the request URL capabilities support using Common Gateway Interface (cgi-bin) technology via the web server software.
* Serving the request back to the web client.

We used the python template and then place this ﬁle in a directory C:\xampp\cgi-bin, which is accessible by cgi-bin technology. A CGI-bin is an in-house folder for communicating with a web browser to provide a network or website feature. In the context of web development, Common Gateway Interface (CGI) provides an interface for the application of web server executables. In many instances, it means that you take an HTTP client and pass it on to an app to return a dynamically created HTML page to a browser.

While almost any program that runs on a web server (in our case node js) can be used as a CGI script. CGI is a method for the use of Web design scripts. The CGI-bin in the project is referenced in the URL and serves as a REST endpoint and Web Service that holds the python web service/API built [api.py](cgi-bin/api.py). The operations and parameters are passed through the URL (unclean URL) to the server. Then, the server performs the operations (processing) and sends the results back to the client. The cgi-bin defines a way for the web server to interact with external content-generating programs. In our case, it defines the abstract parameters, known as meta-variables, which describe a client's request. With the  [api.py](cgi-bin/api.py), it specifies a platform-independent interface between the script and the HTTP server. Hence, CGI script handles the application issues, such as data access and document processing.


* First, a configuration [db.conf](cgi-bin/db.conf) file was created to store the testpro database authentication access value created in the PostgreSQL database management system, as shown below.
>[floodbarriers]
    user = Postgres
    password = iz******
    dbname = testpro
    host = localhost
    port = 5432

* Next, we created the [util.py](cgi-bin/util.py) file that helps create the database link (inherit) and communicates with the database. 
    ```Python
    import sys
    import configparser as cp
    import psycopg2 as pg

    ## DB configurations and stuff
        ```
* Routing Query and GeoJSON output: To execute the routing query, we utilized the api.py script to respond to the click event by the user which would be generate the latitude and longitude and send a request that will carry out the SQL query, i.e., the shortest path via Dijkstra algorithm as a rout() function in the database and send the response back as a route.geojson as can be interpreted from [api.py](cgi-bin/api.py).
When a program runs through the web server as a CGI program, it most times does not have the same PATH. Any programs that one invoke in the CGI program will need to be specified by a full path, so that the shell can find them when it attempts to execute the CGI program. And this is what the first line does, it tells Apache that this program can be executed by feeding the file to the interpreter found at the location `#!C:/python3/python.exe`.

[Back to the top](#server-side-script-with-python)

*[Go Back](Tutorial.md)*
______
-----