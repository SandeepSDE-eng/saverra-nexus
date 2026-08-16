import paramiko

def deploy():
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    print("Connecting to Hostinger server...")
    client.connect('145.223.17.106', port=65002, username='u278286324', password='Saverra@123')
    print("Connected!")

    htaccess_content = """# Phusion Passenger Node.js Configuration
PassengerAppRoot /home/u278286324/domains/saverrarealty.com/hbuilds/current/nodejs
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

  # Handle Legacy PHP redirects to clean routes
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

    commands = [
        "mkdir -p /home/u278286324/domains/saverrarealty.com/hbuilds/current/nodejs/tmp",
        "mkdir -p /home/u278286324/domains/saverrarealty.com/hbuilds/config",
        "cp -rf /home/u278286324/domains/saverrarealty.com/public_html/.output/* /home/u278286324/domains/saverrarealty.com/hbuilds/current/nodejs/",
        f"echo '{htaccess_content}' > /home/u278286324/domains/saverrarealty.com/public_html/.htaccess",
        "touch /home/u278286324/domains/saverrarealty.com/hbuilds/current/nodejs/tmp/restart.txt"
    ]

    for cmd in commands:
        stdin, stdout, stderr = client.exec_command(cmd)
        err = stderr.read().decode()
        if err and "warning" not in err.lower():
            print(f"Command output ({cmd}):", err)

    print("Deploy script executed successfully!")
    client.close()

if __name__ == "__main__":
    deploy()
