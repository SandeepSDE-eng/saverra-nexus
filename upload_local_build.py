import paramiko
import os

def upload_dir(sftp, local_dir, remote_dir):
    os.makedirs(local_dir, exist_ok=True)
    for root, dirs, files in os.walk(local_dir):
        rel_path = os.path.relpath(root, local_dir)
        target_remote_dir = remote_dir if rel_path == "." else os.path.join(remote_dir, rel_path).replace("\\", "/")
        
        try:
            sftp.mkdir(target_remote_dir)
        except IOError:
            pass # directory already exists
            
        for file in files:
            local_file = os.path.join(root, file)
            remote_file = os.path.join(target_remote_dir, file).replace("\\", "/")
            print(f"Uploading {file} -> {remote_file}")
            sftp.put(local_file, remote_file)

def main():
    print("Connecting via SFTP to Hostinger...")
    transport = paramiko.Transport(('145.223.17.106', 65002))
    transport.connect(username='u278286324', password='Saverra@123')
    sftp = paramiko.SFTPClient.from_transport(transport)
    print("SFTP Connected!")

    local_output = r"c:\SandeYadav\saverra-nexus\.output"
    remote_public_html = "/home/u278286324/domains/saverrarealty.com/public_html"
    remote_hbuilds_nodejs = "/home/u278286324/domains/saverrarealty.com/hbuilds/current/nodejs"

    print("\n--- 1. Uploading locally built .output to Hostinger public_html ---")
    upload_dir(sftp, local_output, os.path.join(remote_public_html, ".output").replace("\\", "/"))

    print("\n--- 2. Uploading static assets directly to Hostinger public_html ---")
    upload_dir(sftp, os.path.join(local_output, "public"), remote_public_html)

    print("\n--- 3. Uploading build outputs to Hostinger Phusion Passenger hbuilds ---")
    upload_dir(sftp, local_output, remote_hbuilds_nodejs)

    print("\n--- 4. Restarting Phusion Passenger application ---")
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect('145.223.17.106', port=65002, username='u278286324', password='Saverra@123')
    
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

    client.exec_command(f"mkdir -p {remote_hbuilds_nodejs}/tmp")
    client.exec_command(f"echo '{htaccess_content}' > {remote_public_html}/.htaccess")
    client.exec_command(f"touch {remote_hbuilds_nodejs}/tmp/restart.txt")
    print("Deployment and restart complete!")

    sftp.close()
    transport.close()
    client.close()

if __name__ == "__main__":
    main()
