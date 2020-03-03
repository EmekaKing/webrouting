#!C:/python3/python.exe
import json
import sys
import cgi
import cgitb
import psycopg2 as pg
import psycopg2.extras as pg_extras
import dbutils as db

def assign_param(k, params):
    if k in params.keys():
        if params[k].value == 'null':
            return None
        return params[k].value
    return None

def get_json(result, indent = 4):
    return json.dumps(result, indent = indent)

def get_done(result):
    print("Content-type: application/json\r\n\r\n")
    print(result)

def route(conn, long0, lat0, long1, lat1):
    rout= f'''WITH tmp as(		
	        SELECT k.*
                FROM (SELECT di.seq, di.node, di.edge, di.cost, di.agg_cost, ng.the_geom
                FROM pgr_dijkstra(
                'SELECT id, source, target, cost FROM ng_2po_4pgr',
                (SELECT source_id 
            	FROM ng_roads_sources 
            	ORDER BY geom <-> (SELECT ST_SetSRID(ST_MakePoint({long0}, {lat0}), 4326))
            	LIMIT 1), (SELECT source_id 
        		FROM ng_roads_sources 
        		ORDER BY geom <-> (SELECT ST_SetSRID(ST_MakePoint({long1}, {lat1}), 4326))
        		LIMIT 1), false) di
                INNER JOIN ng_2po_4pgr ng ON di.edge = ng.id) k)
                    SELECT public.ST_AsGeoJSON(ST_Transform(ST_Union(the_geom),3857)) as geom
                FROM tmp
                '''
    cursor= conn.cursor(cursor_factory=pg_extras.RealDictCursor)
    cursor.execute(rout)
    results= cursor.fetchall()
    return results[0]['geom']
    
if __name__ == '__main__':
    conn = db.get_connection()
    params = cgi.FieldStorage()
    op = assign_param('op', params)
    if op == 'route':
        long0 =  assign_param('long0', params)
        lat0 =  assign_param('lat0', params)
        long1 =  assign_param('long1', params)
        lat1 =  assign_param('lat1', params)
        results=route(conn, long0, lat0, long1, lat1)
    else:
        results = {'message': 'Unknown service'}
        get_done(json.dumps(results))
    get_done(results)
