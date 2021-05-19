import couchdb


class Keys:
    def __init__(self, ckey, csec, atoken, asec):
        self.ckey = ckey
        self.csec = csec
        self.atoken = atoken
        self.asec = asec


dbName = "tweets"
couch = couchdb.Server('http://admin:group45@localhost:5984')

auth = {
    'harvesterserver-1': Keys(
        "5j9AREhFGUlhTIgEhum5twtdv",
        "cnydzUGUnE6s4stOBxgKZXRn9yr63hlw6H1ZgSPpDyJvBu0WvC",
        "1382639314555707399-3iz2KLqvs1BVIgJYrgGgiybtOhxtui",
        "rfaLbjgenSEOozHF8Q7ntcAfBgYPR9BSwuSSgyN06gjNO"
    ),
    'harvesterserver-2': Keys(
        "d9hL3Zt9yTZszuQYzMC05NrAh",
        "eopL4XLJB6v16zNSXBzwcfUKy6dAafAMNOc5v1ILOFfWluduis",
        "1243359804690558977-DcA67kXXBFx6Bdbys5YEyIvjMAbvpS",
        "Oxbn0cn57utarMLdmMY3bv5LHibwdtTRxKeIelUHtqrgd"
    ),
    'harvesterserver-3': Keys(
        "6HnE7UFtziydux0ocaYqeQgMg",
        "QX1G2viedkPutuU35QFOhtKXsMsJvuqDzkEyIbYG9XP9U554Ft",
        "1391310857569640448-0y9s1snwBfeJ2jCPS2JF1lEeAWCXak",
        "aOv2Lw29Hw0ltu5aHffKi86itB3lxj9zxdYqubrhWMExJ",
    )
}

SYDNEY_GC = "-33.880901,151.206103,100km"
ADELAIDE_GC = "-34.928181,138.599931,100km"
MELBOURNE_GC = "-37.810003,144.962594,100km"
PERTH_GC = "-31.952712,115.860480,100km"
BRISBANE_GC = "-27.467103,153.014206,100km"
SYDNEY_BB = [150.2004, -34.2001, 151.5986, -33.1989]
ADELAIDE_BB = [138.400761, -35.350029, 139.04999, -34.550264]
MELBOURNE_BB = [144.7497, -38.4996, 145.4995, -37.5003]
PERTH_BB = [115.6001, -32.7997, 116.3997, -31.4501]
BRISBANE_BB = [152.2015, -28.3995, 153.6, -26.6005]
