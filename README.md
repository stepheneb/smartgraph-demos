# SmartGraph Technology Experiments

Live versions of the demos in this repository are hosted here
[http://smartgraph-demos.dev.concord.org](http://smartgraph-demos.dev.concord.org).

Experiments in lightweight smartgraphs by the people working on the
[SmartGraphs](http://smartgraphs.concord.org/) project at the [Concord Consortium](http://www.concord.org).

The source code for the SproutCore demos is located here:
[http://github.com/rklancer/Smartgraphs](http://github.com/rklancer/Smartgraphs).

To run this locally on a Mac,

1. Install CouchDB
2. Turn on web sharing. Uncomment the vhosts line in `/private/etc/apache2/httpd.conf`. Restart apache.
3. Add the following line to `etc.hosts`:

    127.0.0.1 demos.local
    
4. Edit `/private/etc/apache2/extra/httpd-vhosts.conf` to include the following (replacing "(directory you
cloned smartgraph-demos into)" as appropriate):

    <VirtualHost *:80>
      ServerAdmin webmaster@localhost
      DocumentRoot "(directory you cloned smartgraph-demos into)"
      ServerName demos.local
      <Directory "(directory you cloned smartgraph-demos into)">
      	Options -Indexes FollowSymLinks
      	AllowOverride AuthConfig FileInfo
      	Order allow,deny
        Allow from all
      </Directory>

      ProxyRequests Off
      KeepAlive Off

      <Proxy *>
         Order deny,allow
         Allow from 127.0.0.1
         Deny from all     
      </Proxy>
   
       ProxyPass /db/ http://127.0.0.1:5984/ nocanon
       ProxyPassReverse /db/ http://127.0.0.1:5984/
   
    </VirtualHost>
