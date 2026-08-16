import paramiko

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('145.223.17.106', port=65002, username='u278286324', password='Saverra@123')

print("Syncing demo.saverrarealty.com setup to saverrarealty.com...")

commands = [
    "mkdir -p /home/u278286324/domains/saverrarealty.com/hbuilds/current/nodejs/tmp",
    "mkdir -p /home/u278286324/domains/saverrarealty.com/hbuilds/config",
    "cp -rf /home/u278286324/domains/demo.saverrarealty.com/hbuilds/config/* /home/u278286324/domains/saverrarealty.com/hbuilds/config/",
    "cp -rf /home/u278286324/domains/demo.saverrarealty.com/hbuilds/current/* /home/u278286324/domains/saverrarealty.com/hbuilds/current/",
    "cp -rf /home/u278286324/domains/saverrarealty.com/public_html/.output/* /home/u278286324/domains/saverrarealty.com/hbuilds/current/nodejs/",
    "cp -rf /home/u278286324/domains/saverrarealty.com/public_html/.output/public/* /home/u278286324/domains/saverrarealty.com/public_html/",
    "rm -f /home/u278286324/domains/saverrarealty.com/public_html/index.html"
]

for cmd in commands:
    stdin, stdout, stderr = client.exec_command(cmd)

htaccess_content = """PassengerAppRoot /home/u278286324/domains/saverrarealty.com/hbuilds/current/nodejs
PassengerAppType node
PassengerNodejs /opt/alt/alt-nodejs22/root/bin/node
PassengerStartupFile server/index.mjs
PassengerBaseURI /
PassengerRestartDir /home/u278286324/domains/saverrarealty.com/hbuilds/current/nodejs/tmp
SetEnv NODE_OPTIONS "--require /home/u278286324/domains/saverrarealty.com/hbuilds/config/preload-timestamp.js"
SetEnv LSNODE_CONSOLE_LOG console.log

SetEnv DB_HOST 127.0.0.1
SetEnv DB_NAME u278286324_saverra
SetEnv DB_USER u278286324_user
SetEnv DB_PASSWORD Saverra@123
SetEnv VITE_API_URL https://saverrarealty.com

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Legacy PHP Redirects
  RewriteRule ^f-residences\\.php$ /projects/f-residences [R=301,L]
  RewriteRule ^about\\.php$ /about [R=301,L]
  RewriteRule ^contact\\.php$ /contact [R=301,L]
  RewriteRule ^services\\.php$ /services [R=301,L]
  RewriteRule ^careers\\.php$ /careers [R=301,L]
  RewriteRule ^social-gallery\\.php$ /social-wall [R=301,L]
  RewriteRule ^other-projects\\.php$ /projects [R=301,L]
  RewriteRule ^.*\\.php$ /projects [R=302,L]
</IfModule>
"""

client.exec_command(f"cat << 'EOF' > /home/u278286324/domains/saverrarealty.com/public_html/.htaccess\n{htaccess_content}\nEOF")
client.exec_command("touch /home/u278286324/domains/saverrarealty.com/hbuilds/current/nodejs/tmp/restart.txt")
print("Sync complete and Passenger restarted!")

client.close()
