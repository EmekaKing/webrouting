#Route Automation for Flood Disaster Emergency Response 
>*The To-Do Process*
---
### 1.0 Developing the Flood Risk Map
First of all, the indicators of flood vulnerability and hazard were downloaded from various data sources. These data were used to create the individual indicator maps using different spatial analysis and processes that exist in the QGIS software. It is important to note that since flood vulnerability and hazard are components of flood risk, as stated earlier in the report, they were first obtained before combining them to achieve the final risk map.
##### 1.1 Generation of Flood Hazard Map
To create the vulnerability map, we overlaid the rainfall map (Annual precipitation), Land Use Land Cover Map, Digital Elevation, Slope, Flow direction, Flow accumulation, and Water table. 

###### a)	Annual Precipitation-Rainfall Map
The following steps were utilized; 
i.	After importing the rainfall data as well as other data layers into the QGIS working window via the Layer tab.
![RasterandVector](C:/Users/emeka/Pictures/Images/Layer.PNG)
>*Fig 1.1 Importing the raster and vector data into the QGIS environment*
 
From the rainfall raster data obtained in .tiff format, the Composite band was built using the tools via this directory `Grass >> r.Composite >>  Selection of the 12 bands` that make up 2018 rainfall data and creating the `AnnualRainfall2018.shp`.
ii.	From the AnnualRainfall2018.shp, we then summed the band using the value of precipitation, and then it was reprojected to the WGS 1984 UTM ZONE 31N.
iii.	Then with the Raster pixel to points, we obtained the point value, which was then interpolated using the kriging method `(SAGS >> Raster Creation tool)` to get the surface.
iv.	The final Rainfall map was then obtained by Extraction by Mask over the study area `(Extraction >> Extraction >> Clip by Raster by Mask Layer)`.
![RainfallMap](C:/Users/emeka/Pictures/Images/Layer.PNG)
>*Fig. 1.2 Rainfall Map*

###### b) Land Use Land Cover Map
The following processes were utilized to produce the map.
As stated in the other document, the Land Use Land Cover map was downloaded already prepared. The only primary spatial processing that was done was the clipping of the raster with the study area and the resampling the raster to the size of the chosen spatial unit of analysis of 92.2445.
![LULCMap]()
>*Fig. 1.3 Land Use Land Cover Map*

###### c)	DEM, Slope, Flow Direction and Flow Accumulation Maps
In practice, the slope, flow accumulation, and flow direction map are extracted from the elevation map. To achieve the individual indicator map, first, the Fill nodata tool was used to remove the sink from the DEM downloaded. With this, the Elevation map was obtained. For the slope Map, the Slope tool found under the Analysis toolbar located in the Raster Tab was used. Next, the Flow direction and Accumulation Map were created using the tools found in the directory `Toolbox >> Grass >> Raster >> r.flow and Toolbox >> SAGA >> Simulation >>  Flow accumulation tools respectively`.
![DEMMap]() ![SlopeMap]() ![FDMap]() ![FAMap]()
>*Fig. 1.4 (a) Elevation Map (b) Flow Accumulation Map (c) Flow Direction Map (d) Slope Map*

###### d)	Water Table (Groundwater)
The map of the water table was obtained from the global aqueduct map downloaded by using the `Clip tool`, `Rasterize tool`, as well as the `Resample tool`.
![Watertable]()
>*Fig. 1.5 Watertable Map*

The final flood hazard map, as stated, is based on the seven thematic layers, as described and shown in `Fig. 1.2 – Fig. 1.5`. The study area was reclassified into six separate classes (zones). This was obtained using the Reclassify tool in the QGIS software for each of the seven thematic indicators discussed below. The reclassification method was similar for each layer as they involve the same process. The process utilized for each layer involved:

* Getting the `Reclassify by Table tool` from `Raster` found in the `Toolbox` via the `Processing tab`. When the pop-up appeared, the various indicator map in raster format for the flood vulnerability was inserted and reclassified based on its relationship (direct and inverse) on flood hazard for the study area.
* It is important to note that Slope, the elevation is inversely proportional to flood hazard while flow direction, flow accumulation, rainfall occurrence zones, and water table (groundwater) level is directly proportional to flood hazard. For the reclassification of the Land Use Land Cover (LULC) class, we utilized the characteristics of each land use type with apriori knowledge that building and impervious surfaces are prone to flood hazards compared to open water, which is a composed of the same constituent as a flood.
* The different classified outputs from the individual indicators were all within the value of 1 and 6 as gotten from the research of `Nigusse Adhanom`, 2019 titled *“Flood Hazard and Flood Risk Vulnerability Mapping Using Geo-Spatial and MCDA around Adigrat, Tigray Region, Northern Ethiopia.”* 
* Next, we carried out the Weighted sum raster overlay via `Raster Calculator << Raster Tab` in QGIS using the following syntax: 
    FH𝑍𝑜𝑛𝑒 = 〈 𝑆𝐿𝑤𝑆𝐿𝑠 + E𝐿𝑖𝑤E𝐿𝑖𝑠 + FA𝑤FA𝑠 +  𝐿𝑈𝐿𝐶𝑤𝐿𝑈𝐿𝐶𝑠 + FD𝑤FD𝑠 +  AP𝑤AP𝑠  + W𝑇𝑤W𝑇𝑠〉	...   1
Where FHZone = flood hazard zone, SL = slope, El = Elevation/DEM,  FA = Flow Accumulation, FD = Flow Direction, AP = Annual Precipitation (Rainfall), WT = Water table (groundwater potential), and the subscripts w and s refer to the normalized weight of a factor/indicator (theme) and the standardized weight(individual reclassified output - score) of individual features of the theme, respectively.

![ElevationReclMap]() ![FAReclMap]() ![FDReclMap]() ![LULCReclMap]() ![RainfallReclMap]() ![SlopeReclMap]() ![WaterTableReclMap]()
>*Fig. 1.6(a)-(g) Reclassified Map of the Flood Hazard Indicators*

Finally, to achieve the final output, the output of the weighted sum analysis was reclassified via Reclassify by Table tool into six classes, as can be seen in the map shown below.
![FloodHazardMap]()
Fig 1.7 Flood Hazard Map

##### 1.2       Generation of the Flood Vulnerable Indicators
This includes population density, Land Use Land Cover, building density, and road density. Just as the indicators in the flood hazard map, the following indicators and factors were created using the QGIS software. Below are the processes utilized:

###### a)	Population Density
For the vulnerability to be ascribed to the city, the human component is usually taken into cognisance and hence the reason for the population density factor. This was obtained by the fusion of the administrative data (admin data) of Lagos obtained downloaded from the [humdata](https://data.humdata.org/dataset/nga-administrative-boundaries) and the statistical information about some of the local government areas (LGA) of the Lagos Central District was obtained from [CityPopulation](https://www.citypopulation.de/php/nigeria-metrolagos.php). To achieve the actual population density raster map, the following step was taken, which includes:

*	First, the admin data was imported into the QGIS environment. We extracted the Lagos Central district LGAs from the admin3.shp as a new shapefile consisting of just five LG. Next, a new attribute field (column header) was created by right-clicking on the new shapefile with the environment in edit mode and by turning on the Field Calculator.
*	In the new window, we created three new fields, i.e., *the population field, area_km2 field, and PopDensity field*. In the population field, we manually inputed the population of each LGA as recorded from the website, written earlier into the cell in the attribute table. In the area_km2 field, we computed the polygon area of each of the LGA by selecting the area geom from the field calculator window. The final field, PopDensity, was calculated using the mathematical operator division.
![FieldCalculator]()
>*Fig. 1.8 Field Calculator to create the population density attribute field*

*	Then we obtained the obtained administrative data of the study area (a single feature shapefile) using the Dissolve tools using the name_1 field on the earlier six features.
*	The newly created dissolve shapefile was then imbued with the PopDensity value of the different LGA by using the `Join attributes by Location Tool` in the `Vector general toolbox` using the *Geometry type => within* and *Join type => Take attributes of the first located feature only (one-to-one)*.
* The final map was created by using the `Rasterize tool` in `Vector Conversion Toolbox`. Then we ranked the data based on population density, knowing that the higher the population pressure, the higher the vulnerability of such class of people when a flood occurs.

![PopulationDensityMap]() ![PopulationDensReclMap]()
>*Fig 1.9 (a)Population Density Map and (b) Population Density Reclassified Map*

###### b)	Building Density
The building density was extracted from the LULC map, which had the building land-use type. The steps in obtaining the building density map include:
* First, the LULC map was polygonised by using the `Polygonized tool` found in `Raster Tab >> Conversion with the Name of the Field to create` *=> Descr_* created as an attribute field in the shapefile using the documentation records obtained with the data when downloaded.
* Next, we dissolved the new vector into the first eight classes, as was in the raster form using the Descr_ field. From there, we removed all other LULC types except the building Land Cover. After this, we used the individual LGA shapefile to clip out the Building Land Use to obtain building area per LGA.
* Next, we created fields for building, area_km2 (LGA), and the BuildingDen field of computing the Building Density per LGA size area in the Building shapefile.
* After computing the fields, we used the `Join attribute by location tool` to merge the BuildingDen field in the building shapefile with the individual LGA attribute field. This output was then combined to form a single layer containing the LGA of interest.
* Next, the Merged shapefile was then converted to raster using the `Rasterize tool`.

![BuildingDensityMap]() ![BuildingDensReclMap]()
>*Fig 1.10 (a)Building Density Map (b) Building Density Reclassified Map*

###### c)	Road Density
The road map was obtained from the [turbo](https://turbo-overpass.eu). The Road density map was downloaded in the geoJSON file format. This was then converted into the ESRI shapefile format. The individual LGA clipped the Road network map in the local Government central district. The following steps were utilized to create the road density raster map.
* We created new three new fields in the Individual LGA features which include, the road, area_km2, and the roadDensity fields. These fields were populated and then dissolved into the individual LGA shapefile.
* The new shapefile is then merged with the Merge tool to create a single layer with the six features. Next, this feature was converted into a raster image using the Rasterize tool. 
  
![RoadDensityMap]() ![RoadDensReclMap]()
>*Fig. 1.11 (a)Road Density Map  (b) Road Density Map Reclassified*

###### d)	Land Use Land Cover Map (LULC)
The LULC map that was utilized for the flood hazard map was also used again as it is an important criterion to achieve the final risk map as it shows vulnerability like the above criteria. See [LULC above](#b\)-Land-Use-Land-Cover-Map)

>*NOTE:* All the indicators/factors were resampled to 92.2245493044474 for both the Cell Size X and Y. Also, we made sure all coordinates were checked correctly and projected when needed to the `EPSG:32631  - WGS 84/ UTM Zone 31N` projected system. Finally, the output indicator raster maps, as well as the flood vulnerability map and the flood risk map, were adequately fit to the Lagos Central District administrative boundary using the `clipped raster by mask layer tool`.

##### 1.3	Flood Risk Map
The weighted overlay tool was executed using the Raster Calculator query builder to integrate the rates and weights and to generate a flood risk of the Lagos Central District. Logical operations combined the criterion maps, and criterion values were created based on previous research work of the same theme for each evaluation unit. The execution of the weighted sum is similar in principle as that in equation one above.

The risk map that was obtained was ranked from class 1- 5, with the highest risk being six and the least risk areas being 1. The result was then Polygonized using the Polygonized tool, and then the dissolve tool was applied to merge all the individual risk classification created as a result of the previous process earlier done, i.e., vectorization. From here, we decided to work with flood risk areas, not less than the class 4 risk.

![FloodRiskMap]() 
>*Fig. 1.12 Flood Risk Map of the Lagos Central Area

###### [Back to the top](#route-automation-for-flood-disaster-emergency-response)
----
_______

### 2.0 Creation, Configuration of Database
##### 2.1	About PostgresSQL
PostgreSQL is an object-relational database management system (ORDBMS). PostgreSQL provides PostgreSQL has many advanced features that other enterprise database management systems offer, such as user-defined types, table inheritance, sophisticated locking mechanism, foreign key referential integrity, views, rules, subquery, nested transactions (savepoints), multi-version concurrency control (MVCC), and asynchronous replication. As with all SQL, PostgreSQL consists of six components: (a) the data definition language (DDL), (b) the data manipulation language (DML), (c) the embedded and dynamic SQL, (d) data security, (e) transaction management, and (f) client-server services. For this project, we utilized the DDL, DML, and client-server services. The main reason for its use in this project is that it is the most advanced open-source database system with powerful function and extensibility, which includes pgrouting, PostGIS for spatial database, and the ability to integrate with properly designed network datasets (the Openstreet Map).

PgRouting adds PostGIS to the routing feature. With pgRouting, road network navigation can include complex routing algorithms that meet turning constraints and even time-dependent attributes. PgRouting is an expandable open-source library that offers a variety of tools for the shortest path search as a PostgreSQL and PostGIS extensions.  In this project, we import the data directly from OSM geofabrik into the database, which injects the data of the study area in the correct format with all the right network configuration. Also, we carried out numerous SQL queries with different "Dijkstra" and "A-Star" routing algorithms.

##### 2.2	Creation of Database
To create the database, we connected to the PostgreSQL database server via the pgAdmin tool. By using the pgAdmin application, we interacted with the PostgreSQL database server via an intuitive user interface. The following steps were followed.

* First, launch the pgAdmin application. This application opened on the web browser. The PgAdmin was then used to connect to the server using the proper authentication requirement. Next, we created a new database called testpro.
    ![testpro_database]() 
    >*Fig. 2.1 Database creation in PgAdmin 4

* In this database, we ran specific commands to extend the capabilities of the database to carry out the aim of the project.
    ![Database extension]()
    >*Fig. 2.2 Extending the capabilities of the database*

* Next, we open the Visual Studio Code (VS) Code to integrate and run the osm2po command-line tool to obtain the road network dataset without any difficulty with all the necessary topological characteristics adequately configured.
* The osm2po tool utilized was obtained via the [osm2po](http://osm2po.de/), which makes it very easy to import OpenStreetMap (OSM) data into a Postgres/pgRouting database. It builds the routing network topology automatically and creates tables for feature types and road classes with no network size limitation. The OSM data that is extracted for the osm2po is obtained from [geofabrik](http://download.geofabrik.de/africa/nigeria.html).
* To make the osm2po work properly, the java development kit, as well as the java run environment, was installed.
* The osm2po was configured by editing the database connection in the configuration file appropriately to ensure that the converter parses OSM's XML-Data, makes it a routable data and drops it properly in the right database.
    ![osm2po]()
    >*Fig. 2.3 Configuring the osm2po tool to sync with the testpro db and to obtain the correct road network for the study area.*

* The db.ini file and the load-into-db.sh were configured, and then the load-into-db.sh and that of the preprocess-osm-roads.sh were executed in the Window subsystem for Linux (wsl) terminal as seen in the image below.
    ![CommandLine]()
    >*Fig. 2.4 WSL Terminal command line to import OSM data and build routing network topology*
* The result of this ng_2po_4pgr table was a complete road network dataset of Nigeria with the appropriate configuration acquired, i.e., pgr_nodeNetwork and the pgr_createTopology already configured.
* With this created, we then used the QGIS DB manager to load the floodbarrier, studyARea, and StudyACM features into the testpro database.
    ![DatabaseConn]()
    >*Fig. 2.5 Connection to the database via QGIS*

    ![DBManager]()
    >*Fig. 2.6 Loading the necessary database into Postgres/PostGIS using the DB manager*
* Due to the large size of data from the osm, we took the advice of various materials we sourced to add an index to the source and target column using the code below.
    ``` SQL
        CREATE INDEX source_idx ON ways("source");
        CREATE INDEX target_idx ON ways("target");
    ```
* Next, we used a different SQL command to check the testpro database capabilities by using various available pgRouting algorithm. Most importantly including the clause of barrier into the road network database to achieve the aim of the project
* Since the aim of the project is route automation as regards flood disaster, hence we made our imported road network (ng_2po_4pgr) take cognisance of the floodbarrier by changing values of cost since each of the routing algorithm checks for the least minimum total network weight. This shortest path is usually based on parameters such as distance, time, greenery, etc. 
* As a result, we ran an SQL syntax to update the cost field in the ng_2po_4pgr using the spatial selection || Selection by Location || using ```
    ```SQL
    ST_Intersects.
        ALTER TABLE ng_2po_4pgr
    ADD COLUMN new_cost double precision;

    UPDATE public.ng_2po_4pgr 
    SET new_cost = cost;

    UPDATE public.ng_2po_4pgr 
    SET new_cost = 1e9
    WHERE id IN (
        SELECT n.id
        FROM public.ng_2po_4pgr n
            INNER JOIN public. floodbarrier fb ON 
                ST_Intersects(n.geom_way, fb.geom)
    );
    ```
* Next, we created different SQL to extract all the nodes in the network.
    ```SQL
    CREATE TABLE ng_roads_sources(
        source_id INTEGER NOT NULL,
        geom geometry(Point, 4326)
    );
    INSERT INTO ng_roads_sources
    SELECT source, ST_SetSRID(ST_MakePoint(x1, y1), 4326) AS geom
    FROM ng_2po_4pgr ng, public."studyArea" AS sa
    WHERE ST_Contains(sa.the_geom, ng.geom_way) AND ST_Within(ng.geom_way, sa.the_geom);

    CREATE INDEX ng_roads_sources_geom_idx
    ON ng_roads_sources
    USING GIST (geom);
    ```
* Several other queries were also carried out more; especially, the Dijkstra algorithm was executed using both the new_cost field => cost and the old_cost => ncost (in the ng_2po_4pgr relation). The Dijkstra algorithm takes a beginning node, and an end node generates all possible paths and returns the one(s) with the shortest path (least cost). It doesn’t require other attributes than the source and target ID, id attribute, and cost. It can distinguish between directed and undirected graphs. You can specify if your network has a reverse cost or not.
    ```SQL
    Dijkstra algorithm =	function pgr_dijkstra(text,any array,any array,boolean) :
                            function pgr_dijkstra(text,bigint,any array,boolean) :
    ```
    This was done to validate the shortest path route to ensure it took cognisance of the barrier as applied to the ng_2po_4pgr table. The 
* Other queries were also carried out to explore the capabilities of the pgRouting database as extended.

[Back to the top](#route-automation-for-flood-disaster-emergency-response) | [Go Back](../README.md)
______
-----
### 3.0	Server-Side Script with Python
We used Python Script to make the routing query and send the result back to the web client. The following steps were utilized necessary.

* Retrieving the start and endpoint coordinates.
* Finding the closest edge to start-end point.
* Taking the start or end vertex of this edge (for Dijkstra) of the route and end, respectively.
* Making the Shortest Path database query.
* Transformation of the query result to GeoJSON and creation of the request URL capabilities support using Common Gateway Interface (cgi-bin) technology via the web server software.
* Serving the request back to the web client.

We used the python template and then place this ﬁle in a directory C:\xampp\cgi-bin, which is accessible by cgi-bin technology. A CGI-bin is an in-house folder for communicating with a web browser to provide a network or website feature. In the context of web development, Common Gateway Interface (CGI) provides an interface for the application of web server executables. In many instances, it means that you take an HTTP client and pass it on to an app to return a dynamically created HTML page to a browser.

While almost any program that runs on a web server (in our case node js) can be used as a CGI script. CGI is a method for the use of Web design scripts. The CGI-bin in the project is referenced in the URL and serves as a REST endpoint and Web Service that holds the python web service/API built [api.py](../api.py). The operations and parameters are passed through the URL (unclean URL) to the server. Then, the server performs the operations (processing) and sends the results back to the client. The cgi-bin defines a way for the web server to interact with external content-generating programs. In our case, it defines the abstract parameters, known as meta-variables, which describe a client's request. With the  [api.py](../api.py), it specifies a platform-independent interface between the script and the HTTP server. Hence, CGI script handles the application issues, such as data access and document processing.


* First, a configuration [db.conf](../db.conf) file was created to store the testpro database authentication access value created in the PostgreSQL database management system, as shown below.
>[floodbarriers]
    user = Postgres
    password = iz******
    dbname = testpro
    host = localhost
    port = 5432

* Next, we created the [util.py](../util.py) file that helps create the database link (inherit) and communicates with the database. 
    ```Python
    import sys
    import configparser as cp
    import psycopg2 as pg

    ## DB configurations and stuff
        ```
###### a)	Routing Query and GeoJSON output
To execute the routing query, we utilized the api.py script to respond to the click event by the user which would be generate the latitude and longitude and send a request that will carry out the SQL query, i.e., the shortest path via Dijkstra algorithm as a rout() function in the database and send the response back as a route.geojson as can be interpreted from [api.py](../api.py).
When a program runs through the web server as a CGI program, it most times does not have the same PATH. Any programs that one invoke in the CGI program will need to be specified by a full path, so that the shell can find them when it attempts to execute the CGI program. And this is what the first line does, it tells Apache that this program can be executed by feeding the file to the interpreter found at the location `#!C:/python3/python.exe`.

[Back to the top](#route-automation-for-flood-disaster-emergency-response)
______
-----

### 4.0 Front End Development
To build the front end, the node js framework was first installed to develop the necessary webpage assessor, packages and functionality executed via Javascript and OpenLayer were utilized to put a dynamic map in any web page. The OpenLayer js geospatial library was installed into our system directly with the help of the node package manager (npm) with the following steps discussed below.
a)	First, we made a new directory for the project <barrier> in the wsl terminal file explorer window. Next, we initialized the project using the `npm init` command. After that, we installed the OpenLayer js library necessary to have access to the map and other functionalities for the project as recommended using [npm install ol](https://openlayers.org/en/latest/doc/tutorials/bundle.html). 

b)	We then added the main HTML content to the [index.html](../index.html). In the header, we include all the javascript, API, and CSS needed for the application. In the body tag, we created a container for various functionality or state of the web app while running or accommodating events by the user. The core component of OpenLayers is the map (ol/Map). It is rendered to a target container (e.g., a div element on the web page that contains the map). Also, with the button tag, the route response was achieved.

c)	Adding the Flood risk Barrier dataset: The [flood barrier](data/flood-barriers.js) is also displayed on the web client as a layer which is added on top of the map container via `Layer:[] attribute`. This was achieved by using the OpenLayer.style as well as Openlayer.VectorLayer and the OpenLayer.Map to ensure the layers appears as the map load and is improved by the various functionality attached to the modal window, see [index.js](../index.js).

d)	Select the start and ﬁnal destination: We want to allow the users to draw and move the start and ﬁnal destination points. This is more or less the behavior of google maps and others: the user selects the points via a search box (address search) or by clicking the map. The system queries the server and displays the route on the map. The user can later move the start or ﬁnal point, and the route is updated.

To do this, we used a tool to draw points (we will use the OpenLayers.Geometry control) and a method to move points (OpenLayers.onclick event). The OpenLayers.Layer. The vector layer serves as the place to draw and manipulate these two actions acting on the ends (source-startPoint and the target-endPoint). A second vector layer was used to illustrate the route returned by the web service. The layers were also symbolized using the OpenLayers.style. Other styles (for the html comntainer and event/actions) were added using the [normalize.css](../normalize.css) and [styles.css](../styles.css)

In the initialize function (that’s the class constructor) we set that this control can only draw points `map.on('singleclick', (e) => {switch (clicks % 2)`. The special behavior is implemented in the Geometry function: because we only need the start and ﬁnal points the control deactivates itself when two  points are drawn by counting how many features  has the vector layer.
The two point are added as layers to the OpenLayers.Map object with `addLayer ()` method once the user cicks on the map.

e)	Routing method selection: The basic workﬂow to get a route from the webserver is: transform our points coordinates from EPSG:3857 to EPSG: 4326; call the web service with the correct arguments (method name and two points coordinates); parse the web service response transform GeoJSON to OpenLayers.Feature.Vector; convert all the coordinates from EPSG:4326 to EPSG:3857, and add the result to a vector layer. 

The ﬁrst: our map uses the EPSG:3857 projection (because we use an OSM layer), but the web service expects coordinates in EPSG:4326: we re-projected the data before sending them. This was done by simply using the OpenLayers.Projection. The routing web service in [api.py](../api.py) returns a GeoJSON FeatureCollection object. A FeatureCollection is simply an array of features: one feature for each route segment.
In the [index.js](../index.js), we set all the variable to collect the values, i.e., we needed to call the web service when the two points are drawn to compute the routing method; the format is an array of list where a user input is captured as, `let user = { startPoint: [], endPoint: [] };`. The URL captures the information and sends it to the server (the python script) and the value displayed at the client browser. 

[Back to the top](#route-automation-for-flood-disaster-emergency-response)

[Go Back](../README.md)
