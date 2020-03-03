import sys
import configparser as cp
import psycopg2 as pg

## DB configurations and stuff
CONFIG_FILE = 'db.conf'
SECTION_NAME = 'floodbarriers'

def die(error_msg):
    """A simple die function"""
    print(error_msg)
    sys.exit(1)

def get_pgconnection_string(filename, section):
    """Get the PostgreSQL connection string in db.conf"""
    config = cp.ConfigParser()
    config.read(filename)
    if section not in config:
        die('Ain\'t got no postgres section in configuration file')
    # Database parameters
    try: 
        params = config[section]
        user = params['user']
        password = params['password']
        host = params['host']
        port = params['port']
        dbname = params['dbname']
    except:
        die('Got no love from config file. Please check parameters name')
    str = "dbname='%s' user='%s' host='%s' port='%s' password='%s'" % (dbname, user, host, port, password)
    return str

def get_connection(filename=CONFIG_FILE, section=SECTION_NAME):
    """Get connection to database"""
    try:
        conn_str = get_pgconnection_string(filename, section)
        conn = pg.connect(conn_str)
    except:
        die('Fail connecting to database')
    return conn

