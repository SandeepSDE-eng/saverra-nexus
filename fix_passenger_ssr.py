import paramiko

def fix():
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    print("Connecting to Hostinger...")
    client.connect('145.223.17.106', port=65002, username='u278286324', password='Saverra@123')
    print("Connected!")

    # 1. Remove static index.html from public_html so Passenger SSR handles all requests
    commands = [
        "rm -f /home/u278286324/domains/saverrarealty.com/public_html/index.html",
        "rm -rf /home/u278286324/domains/saverrarealty.com/public_html/assets",
        "mkdir -p /home/u278286324/domains/saverrarealty.com/hbuilds/current/nodejs/tmp",
        "cp -rf /home/u278286324/domains/saverrarealty.com/public_html/.output/* /home/u278286324/domains/saverrarealty.com/hbuilds/current/nodejs/"
    ]

    for cmd in commands:
        stdin, stdout, stderr = client.exec_command(cmd)
        print(f"Executed: {cmd}")

    htaccess_content = """PassengerAppRoot /home/u278286324/domains/saverrarealty.com/hbuilds/current/nodejs
PassengerAppType node
PassengerNodejs /opt/alt/alt-nodejs22/root/bin/node
PassengerStartupFile server/index.mjs
PassengerBaseURI /
PassengerRestartDir /home/u278286324/domains/saverrarealty.com/hbuilds/current/nodejs/tmp
SetEnv NODE_OPTIONS "--require /home/u278286324/domains/saverrarealty.com/hbuilds/config/preload-timestamp.js"
SetEnv LSNODE_CONSOLE_LOG console.log

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

    stdin, stdout, stderr = client.exec_command(f"cat << 'EOF' > /home/u278286324/domains/saverrarealty.com/public_html/.htaccess\n{htaccess_content}\nEOF")
    print(stdout.read().decode())
    print(stderr.read().decode())

    stdin, stdout, stderr = client.exec_command("touch /home/u278286324/domains/saverrarealty.com/hbuilds/current/nodejs/tmp/restart.txt")
    print("Passenger application restarted!")

    client.close()

if __name__ == "__main__":
    fix()
