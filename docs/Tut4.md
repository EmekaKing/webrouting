## Front End Development
To build the front end, the node js framework was first installed to develop the necessary webpage assessor, packages and functionality executed via Javascript and OpenLayer were utilized to put a dynamic map in any web page. The OpenLayer js geospatial library was installed into our system directly with the help of the node package manager (npm) with the following steps discussed below.

a)	First, we made a new directory for the project <barrier> in the wsl terminal file explorer window. Next, we initialized the project using the `npm init` command. After that, we installed the OpenLayer js library necessary to have access to the map and other functionalities for the project as recommended using [npm install ol](https://openlayers.org/en/latest/doc/tutorials/bundle.html). 

b)	We then added the main HTML content to the [index.html](../index.html). In the header, we include all the javascript, API, and CSS needed for the application. In the body tag, we created a container for various functionality or state of the web app while running or accommodating events by the user. The core component of OpenLayers is the map (ol/Map). It is rendered to a target container (e.g., a div element on the web page that contains the map). Also, with the button tag, the route response was achieved.

c)	Adding the Flood risk Barrier dataset: The [flood barrier](../data/flood-barriers.js) is also displayed on the web client as a layer which is added on top of the map container via `Layer:[] attribute`. This was achieved by using the OpenLayer.style as well as Openlayer.VectorLayer and the OpenLayer.Map to ensure the layers appears as the map load and is improved by the various functionality attached to the modal window, see [index.js](../index.js).

d)	Select the start and ﬁnal destination: We want to allow the users to draw and move the start and ﬁnal destination points. This is more or less the behavior of google maps and others: the user selects the points via a search box (address search) or by clicking the map. The system queries the server and displays the route on the map. The user can later move the start or ﬁnal point, and the route is updated.

To do this, we used a tool to draw points (we will use the OpenLayers.Geometry control) and a method to move points (OpenLayers.onclick event). The OpenLayers.Layer. The vector layer serves as the place to draw and manipulate these two actions acting on the ends (source-startPoint and the target-endPoint). A second vector layer was used to illustrate the route returned by the web service. The layers were also symbolized using the OpenLayers.style. Other styles (for the html comntainer and event/actions) were added using the [normalize.css](../normalize.css) and [styles.css](../styles.css)

In the initialize function (that’s the class constructor) we set that this control can only draw points `map.on('singleclick', (e) => {switch (clicks % 2)`. The special behavior is implemented in the Geometry function: because we only need the start and ﬁnal points the control deactivates itself when two  points are drawn by counting how many features  has the vector layer.
The two point are added as layers to the OpenLayers.Map object with `addLayer ()` method once the user cicks on the map.

e)	Routing method selection: The basic workﬂow to get a route from the webserver is: transform our points coordinates from EPSG:3857 to EPSG: 4326; call the web service with the correct arguments (method name and two points coordinates); parse the web service response transform GeoJSON to OpenLayers.Feature.Vector; convert all the coordinates from EPSG:4326 to EPSG:3857, and add the result to a vector layer. 

The ﬁrst: our map uses the EPSG:3857 projection (because we use an OSM layer), but the web service expects coordinates in EPSG:4326: we re-projected the data before sending them. This was done by simply using the OpenLayers.Projection. The routing web service in [api.py](cgi-bin/api.py) returns a GeoJSON FeatureCollection object. A FeatureCollection is simply an array of features: one feature for each route segment.
In the [index.js](../index.js), we set all the variable to collect the values, i.e., we needed to call the web service when the two points are drawn to compute the routing method; the format is an array of list where a user input is captured as, `let user = { startPoint: [], endPoint: [] };`. The URL captures the information and sends it to the server (the python script) and the value displayed at the client browser. 

![Webroutingmap](Images/final_web_prototype.png)
>*Fig 4.1 Example of the route between two selected points avoiding the flood risk areas.*

[Back to the top](#front-end-development)

[Go Back](Tutorial.md)