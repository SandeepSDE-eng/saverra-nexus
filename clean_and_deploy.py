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
            pass
            
        for file in files:
            local_file = os.path.join(root, file)
            remote_file = os.path.join(target_remote_dir, file).replace("\\", "/")
            sftp.put(local_file, remote_file)

def main():
    print("Connecting to Hostinger via SSH & SFTP...")
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect('145.223.17.106', port=65002, username='u278286324', password='Saverra@123')

    transport = paramiko.Transport(('145.223.17.106', 65002))
    transport.connect(username='u278286324', password='Saverra@123')
    sftp = paramiko.SFTPClient.from_transport(transport)
    print("Connected!")

    remote_nodejs = "/home/u278286324/domains/saverrarealty.com/hbuilds/current/nodejs"
    remote_public_html = "/home/u278286324/domains/saverrarealty.com/public_html"

    print("Cleaning stale server build files...")
    client.exec_command(f"rm -rf {remote_nodejs}/*")
    client.exec_command(f"rm -rf {remote_public_html}/assets")
    client.exec_command(f"rm -f {remote_public_html}/index.html")

    print("Uploading clean .output build...")
    local_output = r"c:\SandeYadav\saverra-nexus\.output"
    upload_dir(sftp, local_output, remote_nodejs)
    upload_dir(sftp, os.path.join(local_output, "public"), remote_public_html)

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

    client.exec_command(f"mkdir -p {remote_nodejs}/tmp")
    client.exec_command(f"cat << 'EOF' > {remote_public_html}/.htaccess\n{htaccess_content}\nEOF")
    client.exec_command(f"touch {remote_nodejs}/tmp/restart.txt")

    print("Clean deployment & restart completed successfully!")
    sftp.close()
    transport.close()
    client.close()

if __name__ == "__main__":
    main()
