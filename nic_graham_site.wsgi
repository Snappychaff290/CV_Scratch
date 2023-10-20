import sys
import logging

logging.basicConfig(stream=sys.stderr)
sys.path.insert(0,"/var/www/html/")

from nicholas_graham import app as application
application.secret_key='klsadjfljkasfnlkasdnfklasdjflkasdfj'